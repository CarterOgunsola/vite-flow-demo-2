import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, "..");
const PROD_DIR = path.join(ROOT_DIR, "prod");
const SRC_DIST_DIR = path.join(ROOT_DIR, "src", "dist");
const PACKAGE_JSON = path.join(ROOT_DIR, "package.json");

async function clean() {
  try {
    // Remove prod directory
    console.log("Cleaning prod directory...");
    await fs.remove(PROD_DIR);
    await fs.ensureDir(PROD_DIR);

    // Remove src/dist directory
    console.log("Cleaning src/dist directory...");
    await fs.remove(SRC_DIST_DIR);
    await fs.ensureDir(SRC_DIST_DIR);

    // Reset package.json version
    console.log("Resetting package.json version...");
    const pkg = JSON.parse(await fs.readFile(PACKAGE_JSON));
    pkg.version = "0.0.1";
    await fs.writeFile(PACKAGE_JSON, JSON.stringify(pkg, null, 2));

    console.log("✨ Clean completed successfully!");
    console.log("- Removed all files in /prod");
    console.log("- Removed all files in /src/dist");
    console.log("- Reset version to 0.0.1");
  } catch (error) {
    console.error("Clean failed:", error);
    process.exit(1);
  }
}

clean();
