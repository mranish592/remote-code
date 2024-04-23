const fs = require('fs').promises;
const { exec } = require('child_process');
const ServerConfig = require('../config');

async function executeJavascript(code, codeFileName) {
  let output = '';

  try {
    // Create directory
    await fs.mkdir(ServerConfig.CODE_FILES_PATH, { recursive: true });
    console.log('Directory created successfully');

    // Write to a file
    await fs.writeFile(`${ServerConfig.CODE_FILES_PATH}/${codeFileName}.js`, code, 'utf8');
    console.log('File write successful');

    // Replace 'script.sh' with the path to your Bash script
    const scriptPath = 'scripts/run-javascript.sh';

    // Call the Bash script
    const { stdout, stderr } = await execAsync(`bash ${scriptPath} ${codeFileName}.js ${codeFileName}.txt`);

    if (stderr) {
      console.error('stderr:', stderr);
      removeCodeAndOutputfile(codeFileName);
      return "Error while executing: " + stderr;
    }

    console.log('stdout:', stdout);

    const outputPath = `${ServerConfig.CODE_FILES_PATH}/${codeFileName}.txt`;
    const fileContents = await fs.readFile(outputPath, 'utf8');
    console.log('File contents:', fileContents);
    output = fileContents;
    removeCodeAndOutputfile(codeFileName);
    return output
  } catch (error) {
    console.error('Error:', error.message);
    removeCodeAndOutputfile(codeFileName);
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

async function removeCodeAndOutputfile(codeFileName) {
    const codeFilePath  = `${ServerConfig.CODE_FILES_PATH}/${codeFileName}.js`
    const outputFilePath  = `${ServerConfig.CODE_FILES_PATH}/${codeFileName}.txt`
    try {
      await fs.unlink(codeFilePath);
      await fs.unlink(outputFilePath);
      console.log(`${codeFilePath} and ${outputFilePath} deleted successfully`);
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  }

module.exports =  executeJavascript