const fs = require('fs');
const { exec } = require('child_process');

if (fs.existsSync('./jest-screenshot-report')) {
  exec(
    'cd ./jest-screenshot-report/reports && (find . -mindepth 1 -type d | wc -l)',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.error(
        `Error: Commit/Push Failed. Visual Regressions found in Crayons Components. | Number of Visual Regressions : ${stdout.trimStart()}. Please fix errors and run 'jest -u' to update the snapshots with present one.`
      );
    }
  );
} else process.exit(0);
