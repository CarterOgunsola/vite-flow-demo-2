import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const PROD_DIR = path.join(ROOT_DIR, 'prod');
const VERSIONS_DIR = path.join(PROD_DIR, 'versions');
const LATEST_DIR = path.join(PROD_DIR, 'latest');

async function rollback(version) {
  try {
    if (!version) {
      throw new Error('Please specify a version to rollback to');
    }

    const versionDir = path.join(VERSIONS_DIR, `v${version}`);
    
    if (!await fs.pathExists(versionDir)) {
      throw new Error(`Version ${version} not found`);
    }

    // Clear latest directory
    await fs.emptyDir(LATEST_DIR);

    // Copy version files to latest
    await fs.copy(versionDir, LATEST_DIR);

    console.log(`✨ Successfully rolled back to v${version}`);
    console.log(`📦 Files updated in /prod/latest/`);
    
    // Log the contents of the latest directory after rollback
    const files = await fs.readdir(LATEST_DIR);
    console.log('\nRolled back files:');
    console.log(files);

  } catch (error) {
    console.error('Rollback failed:', error);
    process.exit(1);
  }
}

const version = process.argv[2];
rollback(version);