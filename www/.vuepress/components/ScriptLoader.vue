<template></template>
<script>
import { versions, currentVersion } from '../constants';
const scriptMap = {
  v2: 'https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.js',
  // v3: 'https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.js',
  [currentVersion]: `/${currentVersion}/crayons/build/crayons.js`,
};
export default {
  mounted() {
    let version = location?.pathname?.split('/')?.[1];
    let script;
    if (!versions.includes(version)) {
      version = currentVersion;
    }
    if (!window?.document?.querySelector(`#crayonsscript${version}`)) {
      window?.document
        ?.querySelector(
          `script[id^="crayonsscript"]:not(#crayonsscript${version})`
        )
        ?.remove();
      script = window?.document?.createElement('script');
      script.setAttribute(
        'src',
        scriptMap[version] || scriptMap[currentVersion]
      );
      script.id = `crayonsscript${version}`;
      window?.document?.head.appendChild(script);
    }
  },
};
</script>
