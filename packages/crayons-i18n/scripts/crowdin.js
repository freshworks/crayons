const axios = require('axios').default;
const AdmZip = require('adm-zip');
const shell = require('shelljs');

const CROWDIN_PROJECT_ID = process.env.CROWDIN_PROJECT_ID;
const CROWDIN_TOKEN = process.env.CROWDIN_TOKEN;

if (!CROWDIN_PROJECT_ID || !CROWDIN_TOKEN) {
  throw new Error('Missing CROWDIN_PROJECT_ID or CROWDIN_TOKEN');
}

const BASE_URL = `https://api.crowdin.com/api/v2/projects/${CROWDIN_PROJECT_ID}/translations/builds`;

let checkBuilStatusInterval;
const HEADERS = { Authorization: `Bearer ${CROWDIN_TOKEN}` };

const checkBuildStatus = (buildId) => {
  console.log('Checking Build Status...');
  return axios
    .get(`${BASE_URL}/${buildId}`, {
      headers: HEADERS,
    })
    .then((response) => {
      if (response.data?.data) {
        const status = response.data.data.status;
        console.log('Status:: ', status);
        if (status === 'inProgress') {
          return status;
        } else if (status === 'finished') {
          clearInterval(checkBuilStatusInterval);
          getDownloadURL(buildId);
        }
        return status;
      }
    })
    .catch((err) => {
      console.log(`Error occured while checking build status: ${err}`);
    });
};

const buildTranslations = () => {
  console.log('Building Translations...');
  return axios
    .post(
      BASE_URL,
      {},
      {
        headers: HEADERS,
      }
    )
    .then((response) => {
      if (response.data && response.data.data) {
        let buildId = response.data.data.id;
        console.log(buildId);
        // The build process usually takes more than a minute due to large number of keys. So, we are only proceeding
        // to the next step if this build finishes. Until then, we check the status every 10 seconds
        checkBuilStatusInterval = setInterval(checkBuildStatus, 10000, buildId);
      }
    })
    .catch((err) => {
      console.log(`Error occured while building translations: ${err}`);
    });
};

const getDownloadURL = (buildId) => {
  console.log('Fetching zip download url...');
  let zipURL = '';
  axios
    .get(`${BASE_URL}/${buildId}/download`, {
      headers: HEADERS,
    })
    .then((response) => {
      if (response?.data) {
        zipURL = response.data.data.url;
        downloadTranslations(zipURL);
      }
    })
    .catch((err) => {
      console.log(`Error occured while getting download url: ${err}`);
    });
};

const downloadTranslations = (zipURL) => {
  console.log('Downloading Translations...');
  axios
    .get(zipURL, { responseType: 'arraybuffer' })
    .then((res) => {
      console.log('zip download status ', res.status);
      var zipFile = new AdmZip(res.data);

      //Cleanup existing directories
      shell.exec('rm -rf ./tmp');
      zipFile.extractAllTo('./tmp');

      //recursive traversal through tmp
      shell.exec('find ./tmp -type f -name "*.json" -exec cp -r {} ./i18n \\;');

      // Cleanup tmp directory
      shell.exec('rm -rf ./tmp');
    })
    .catch((err) => {
      console.log(`Error occured while downloading translations: ${err}`);
    });
};

buildTranslations();
