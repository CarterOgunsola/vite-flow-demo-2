import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import semver from "semver";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");
const SRC_DIST_DIR = path.join(ROOT_DIR, "src", "dist");
const PROD_DIR = path.join(ROOT_DIR, "prod");
const VERSIONS_DIR = path.join(PROD_DIR, "versions");
const LATEST_DIR = path.join(PROD_DIR, "latest");
const VERSIONS_FILE = path.join(VERSIONS_DIR, "versions.json");

// Helper function to log directory contents
async function logDirectoryContents(dir, label) {
  console.log(`\nContents of ${label}:`);
  try {
    const files = await fs.readdir(dir);
    console.log(files);
  } catch (error) {
    console.log(`Unable to read directory: ${error.message}`);
  }
}

async function getNextVersion(increment = "patch") {
  const pkg = JSON.parse(
    await fs.readFile(path.join(ROOT_DIR, "package.json"))
  );
  const currentVersion = pkg.version;
  return semver.inc(currentVersion, increment);
}

async function updatePackageVersion(version) {
  const pkgPath = path.join(ROOT_DIR, "package.json");
  const pkg = JSON.parse(await fs.readFile(pkgPath));
  pkg.version = version;
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
}

async function saveVersionInfo(version) {
  await fs.ensureDir(VERSIONS_DIR);
  let versions = {};
  if (await fs.pathExists(VERSIONS_FILE)) {
    versions = JSON.parse(await fs.readFile(VERSIONS_FILE));
  }
  versions[version] = {
    date: new Date().toISOString(),
    timestamp: Date.now(),
  };
  await fs.writeFile(VERSIONS_FILE, JSON.stringify(versions, null, 2));
}

async function copyBuildFiles(sourceDir, targetDir) {
  console.log(`\nCopying files from ${sourceDir} to ${targetDir}`);

  try {
    await logDirectoryContents(sourceDir, "source directory");

    await fs.ensureDir(targetDir);

    await fs.copy(sourceDir, targetDir, {
      overwrite: true,
      errorOnExist: false,
      filter: (src) => {
        const relativePath = path.relative(sourceDir, src);
        console.log(`Processing: ${relativePath}`);
        return !src.includes("node_modules");
      },
    });

    await logDirectoryContents(targetDir, "target directory after copy");
  } catch (error) {
    console.error(`Error during copy operation: ${error}`);
    throw error;
  }
}

async function build() {
  try {
    const increment = process.argv[2] || "patch";
    if (!["major", "minor", "patch"].includes(increment)) {
      throw new Error("Invalid increment type. Use: major, minor, or patch");
    }

    // Get next version
    const nextVersion = await getNextVersion(increment);
    console.log(`Building version ${nextVersion}...`);

    // Update package.json version
    await updatePackageVersion(nextVersion);

    // Run Vite build using local installation
    const viteBinPath = path.join(ROOT_DIR, "node_modules", ".bin", "vite");
    execSync(`"${viteBinPath}" build`, {
      stdio: "inherit",
      cwd: ROOT_DIR,
      shell: true,
    });

    console.log("\nVite build completed. Checking output:");
    await logDirectoryContents(SRC_DIST_DIR, "Vite dist directory");

    // Ensure prod directories exist
    await fs.ensureDir(PROD_DIR);
    await fs.ensureDir(VERSIONS_DIR);
    await fs.ensureDir(LATEST_DIR);

    // Create version directory
    const versionDir = path.join(VERSIONS_DIR, `v${nextVersion}`);

    // Remove existing directories if they exist
    await fs.remove(versionDir);
    await fs.emptyDir(LATEST_DIR);

    // Copy files to version and latest directories
    await copyBuildFiles(SRC_DIST_DIR, versionDir);
    await copyBuildFiles(SRC_DIST_DIR, LATEST_DIR);

    // Save version information
    await saveVersionInfo(nextVersion);

    console.log(`\n✨ Build v${nextVersion} completed successfully!`);
    console.log(`📦 Files saved to:`);
    console.log(`   - /prod/latest/`);
    console.log(`   - /prod/versions/v${nextVersion}/`);

    // Final verification
    console.log("\nFinal directory contents verification:");
    await logDirectoryContents(versionDir, `version directory v${nextVersion}`);
    await logDirectoryContents(LATEST_DIR, "latest directory");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
