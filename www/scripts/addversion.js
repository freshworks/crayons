const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');
const agent = new https.Agent({
  keepAlive: true,
});

function get(fetchUrl) {
  console.log('fetchUrl ', fetchUrl);
  const { hostname } = url.parse(fetchUrl);
  const options = {
    agent: agent,
    hostname: hostname,
    path: fetchUrl,
    headers: {
      Accept: 'application/json',
    },
  };

  return new Promise((accept, reject) => {
    https.get(options, accept).on('error', reject);
  });
}

function bufferStream(stream) {
  return new Promise((accept, reject) => {
    const chunks = [];
    stream
      .on('error', reject)
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => accept(Buffer.concat(chunks)));
  });
}

(async () => {
  try {
    const rootPath = path.resolve(__dirname, '..', '..');
    const file = fs
      .readFileSync(
        path.join(rootPath, 'packages/crayons-core', 'package.json')
      )
      .toString();

    const value = JSON.parse(file);

    const key = value.version;

    const versions = fs.readFileSync('version.json').toString();

    const versionsArr = JSON.parse(versions);

    const isVersionAlreadyPresent = versionsArr.find((f) => f.key === key);

    if (isVersionAlreadyPresent) {
      console.log(`${key} version already present`);
      return;
    }

    let integrityObj = {};

    const esmRes = get(
      `https://unpkg.com/@freshworks/crayons@${key}/dist/crayons/crayons.esm.js?meta`
    );
    const es5Res = get(
      `https://unpkg.com/@freshworks/crayons@${key}/dist/crayons/crayons.js?meta`
    );

    const cssRes = get(
      `https://unpkg.com/@freshworks/crayons@${key}/css/crayons-min.css?meta`
    );

    const [esmStr, es5Str, cssStr] = await Promise.all([
      esmRes,
      es5Res,
      cssRes,
    ]);

    const [esmObj, es5Obj, cssObj] = await Promise.all([
      Promise.resolve(
        await bufferStream(esmStr).then((f) => {
          try {
            return JSON.parse(f.toString());
          } catch (e) {
            return null;
          }
        })
      ),
      Promise.resolve(
        await bufferStream(es5Str).then((f) => {
          try {
            return JSON.parse(f.toString());
          } catch (e) {
            return null;
          }
        })
      ),
      Promise.resolve(
        await bufferStream(cssStr).then((f) => {
          try {
            return JSON.parse(f.toString());
          } catch (e) {
            return null;
          }
        })
      ),
    ]);

    if (esmObj && es5Obj) {
      integrityObj = {
        key,
        ['esm']: esmObj.integrity,
        ['es5']: es5Obj.integrity,
      };

      if (cssObj) integrityObj['css'] = cssObj.integrity;

      console.log('wrote for key ', key);

      versionsArr.push(integrityObj);

      fs.writeFileSync(
        path.join(__dirname, 'version.json'),
        JSON.stringify(versionsArr)
      );
    }
  } catch (err) {
    console.log('error in updating version details to version.json ', err);
  }
})();
