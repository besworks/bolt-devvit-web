import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, 'package.json');

async function promptForSubreddit() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    console.log('\n🔧 Setup Required: Subreddit Configuration\n');
    console.log('You need to specify a subreddit name for testing your Devvit app.');
    console.log('This should be a subreddit with less than 200 members,');
    console.log('where your account has moderator permissions.\n');
    
    rl.question('Enter your subreddit name (without r/): ', (answer) => {
      rl.close();
      
      if (!answer || answer.trim() === '') {
        reject(new Error('No subreddit name provided'));
        return;
      }
      
      const subredditName = answer.trim().toLowerCase();
      
      // Basic validation for subreddit name format
      if (!/^[a-zA-Z0-9_]+$/.test(subredditName)) {
        reject(new Error('Invalid subreddit name. Use only letters, numbers, and underscores.'));
        return;
      }
      
      resolve(subredditName);
    });
  });
}

async function updatePackageJson(subredditName) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Update the dev script with the actual subreddit name
    packageJson.scripts.dev = packageJson.scripts.dev.replace(
      'YOUR_SUBREDDIT_NAME_GOES_HERE', 
      subredditName
    );
    
    // Write the updated package.json back to disk
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log(`\n✅ Successfully updated package.json with subreddit: ${subredditName}`);
    console.log('You can now run `npm run dev` to start testing your app!\n');
    
  } catch (error) {
    throw new Error(`Failed to update package.json: ${error.message}`);
  }
}

async function main() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const devScript = packageJson.scripts.dev;
    
    if (devScript.includes('YOUR_SUBREDDIT_NAME_GOES_HERE')) {
      try {
        const subredditName = await promptForSubreddit();
        await updatePackageJson(subredditName);
      } catch (error) {
        console.error('\n❌ Setup cancelled or failed:', error.message);
        console.error('\nTo complete setup later, you can either:');
        console.error('1. Run `npm run test` again to use this interactive setup');
        console.error('2. Manually edit package.json and replace YOUR_SUBREDDIT_NAME_GOES_HERE with your subreddit name\n');
        process.exit(1);
      }
    } else {
      console.log('✅ Subreddit name validation passed');
    }
    
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error.message);
  process.exit(1);
});