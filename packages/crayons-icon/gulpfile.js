const fs = require('fs').promises;
const path = require('path');

const generateIconsExportData = async () => {
  const iconAssetLibPath = './icons';
  const iconLibPath = './';

  const getIconsSVGData = async (svgFile) => {
    try {
      //console.log('svgFile', svgFile);
      {
        const svgName = path.parse(svgFile).name;
        const svgFilePath = path.join(iconAssetLibPath, svgFile);
        //console.log('svgFilePath', svgFilePath);
        const svgContent = await fs.readFile(svgFilePath);

        const svg_name =
          svgName.indexOf('-') > -1
            ? svgName.split('-').join('_')
            : svgName == 'new' || svgName == 'delete'
            ? svgName.concat('_icon')
            : svgName;

        const svg_string = svgContent.toString().split('"').join("'");
        const svg_export_data = `export const ${svg_name} = "${svg_string}";`;
        //console.log('svg_export_data', svg_export_data);
        return svg_export_data;
      }
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  };
  try {
    let indexData = '';
    const allSvgFiles = await fs.readdir(path.join(iconAssetLibPath, ''));
    for (const svgFile of allSvgFiles) {
      indexData = indexData + '\n' + (await getIconsSVGData(svgFile));
    }
    fs.writeFile(path.join(iconLibPath, 'dist', 'index.js'), indexData);
    console.log(`Succesfully written @freshworks/crayons-icon/dist/index.js`);
  } catch (ex) {
    console.error(`Exception occured while building : ${JSON.stringify(ex)}`);
  }
};

exports.default = generateIconsExportData;
