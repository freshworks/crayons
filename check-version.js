const semver = require('semver');
const { execSync } = require('child_process');
const { engines } = require('./package.json');

const nodeVersion = engines.node;
const npmVersion = engines.npm;
const userNpmVersion = execSync('npm -v');

if (!semver.satisfies(process.version, nodeVersion)) {
  console.error(
    `Required node version ${nodeVersion} not satisfied with current version ${process.version}.`
  );
  process.exit(1);
}

if (
  !semver.satisfies(
    (userNpmVersion && userNpmVersion.toString()) || '',
    npmVersion
  )
) {
  console.error(
    `Required npm version ${npmVersion} not satisfied with current version ${userNpmVersion}.`
  );
  process.exit(1);
}
