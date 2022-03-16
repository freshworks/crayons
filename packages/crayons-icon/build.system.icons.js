/*
 * Generate svg-data for crayons-system icons. These are icons which are used by crayons web components internally.
 * Its a non-prod util file just to help developers to save time in case they modify some internal icons/add new.
 */
const fs = require('fs').promises;
const path = require('path');

const generateIconsExportData = async () => {
  const src_icon_dir = './dist/icons';
  const out_dir = './dist';

  const getIconsSVGData = async (svgFile) => {
    try {
      const svgName = path.parse(svgFile).name;
      const svgFilePath = path.join(src_icon_dir, svgFile);
      const svgContent = await fs.readFile(svgFilePath);

      const svg_string = svgContent.toString().split('"').join("'");

      const svg_export_data = `'${svgName}' : "${svg_string}",`;
      return svg_export_data;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  };
  try {
    const system_icons = [
      'check',
      'chevron-down',
      'chevron-up',
      'cross',
      'cross-big',
      'error',
      'image',
      'info',
      'success',
      'warning',
      'settings',
      'search',
      'drag',
      'more-horizontal',
    ];

    let indexData = 'const crayons_system_icons = {';
    const allSvgFiles = await fs.readdir(path.join(src_icon_dir, ''));
    for (const svgFile of allSvgFiles) {
      const svgName = path.parse(svgFile).name;
      if (system_icons.includes(svgName))
        indexData = indexData + (await getIconsSVGData(svgFile)) + '\n';
    }
    fs.mkdir(out_dir, { recursive: true }).catch(console.error);
    indexData = indexData + '};';
    fs.writeFile(path.join(out_dir, 'index-system.js'), indexData);
    console.log(
      `Succesfully written @freshworks/crayons-icon/dist/index-system.js`
    );
  } catch (ex) {
    console.error(`Exception occured while building : ${ex}`);
  }
};

generateIconsExportData();
