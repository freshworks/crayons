const fs = require('fs');
const { exec } = require('child_process');

if (fs.existsSync('./__tests__/__snapshots__')) {
  exec(
    'cd ./__tests__/__snapshots__ && (ls | wc -l)',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      if (parseInt(stdout.trimStart()) === 121) {
        console.log('Total snapshots :', parseInt(stdout.trimStart()));
        process.exit(0);
      } else {
        console.error(
          `Error: Build Failed."crayons-visual-regression/__tests__/__snapshots__" folder contains only ${stdout.trimStart()} snapshots out of 125 snapshots. Kindly pull/rebase from repo.`
        );
        process.exit(1);
      }
    }
  );
} else {
  console.error(
    `Error: Build Failed."crayons-visual-regression/__tests__/__snapshots__" folder not found. Kindly pull/rebase from repo.`
  );
  process.exit(1);
}
