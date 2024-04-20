const fs = require('fs').promises;
const { exec } = require('child_process');
const ServerConfig = require('../config');

async function executeJavascript(code) {
  let output = '';

  try {
    // Create directory
    await fs.mkdir(ServerConfig.CODE_FILES_PATH, { recursive: true });
    console.log('Directory created successfully');

    // Write to a file
    await fs.writeFile(`${ServerConfig.CODE_FILES_PATH}/example.js`, code, 'utf8');
    console.log('File write successful');

    // Replace 'script.sh' with the path to your Bash script
    const scriptPath = 'scripts/run-javascript.sh';

    // Call the Bash script
    const { stdout, stderr } = await execAsync(`bash ${scriptPath} example.js`);

    if (stderr) {
      console.error('stderr:', stderr);
      return;
    }

    console.log('stdout:', stdout);

    const outputPath = `${ServerConfig.CODE_FILES_PATH}/output.txt`;
    const fileContents = await fs.readFile(outputPath, 'utf8');
    console.log('File contents:', fileContents);
    output = fileContents;
    return output
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }

}

function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

module.exports =  executeJavascript