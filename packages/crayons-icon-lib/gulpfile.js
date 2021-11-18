const fs = require('fs').promises;
const path = require('path');

const generateIconsExportData = async () => {
    const iconAssetLibPath = './icons';
    const iconLibPath = './';
   
    const getIconsSVGData = async (svgFile) => {
        try {
            console.log('svgFile',svgFile);
            {
                const svgName = path.parse(svgFile).name;
                const svgFilePath = path.join(iconAssetLibPath, svgFile);
                console.log('svgFilePath',svgFilePath);
                const svgContent = await fs.readFile(svgFilePath);
               
                svg_name = svgName.indexOf('-')>-1 ? svgName.split('-').join('_') : svgName;
                await fs.writeFile(path.join(iconAssetLibPath, svg_name+'.svg'),svgContent);

                const svg_string = (svgContent.toString()).split('"').join("'");
                const svg_export_data = `export const ${svg_name} = "${svg_string}";`;
                console.log('svg_export_data',svg_export_data);
                return svg_export_data;
            }
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    };
    try {
        let indexData = "";
        const allSvgFiles = await fs.readdir(path.join(iconAssetLibPath,''));
        for (const svgFile of allSvgFiles) {
            indexData = indexData + "\n" + await getIconsSVGData(svgFile);
            console.log(`Succesfully written ${iconAssetLibPath}/${svg_name}.svg`);
        }  
        fs.writeFile(path.join(iconLibPath,'index.js'),indexData);   
    } catch (ex) {
        console.error(`Exception occured while building : ${JSON.stringify(ex)}`);
    }
};

exports.default = generateIconsExportData;