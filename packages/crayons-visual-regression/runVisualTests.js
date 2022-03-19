const fs = require('fs');
const { exec } = require('child_process');

if (fs.existsSync('./.ui-test-flag')) {
  exec(
    'npm run checkIfTestsSnapshotsExists && npm run test-all',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      process.exit(0);
    }
  );
} else process.exit(1);
