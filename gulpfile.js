const fs = require('fs').promises;
const path = require('path');

const buildIconsJson = async () => {
    const iconComponentDir = './src/components/icon';
    const iconsJson = {};
    const getIconsJson = async () => {
        try {
            const allSvgFiles = await fs.readdir(path.join(iconComponentDir, '/icon-assets/icons/'));
            for (const svgFile of allSvgFiles) {
                const svgFilePath = path.join(iconComponentDir, '/icon-assets/icons/', svgFile);
                const svgContent = await fs.readFile(svgFilePath);
                
                const svgName = path.parse(svgFile).name;
                iconsJson[svgName] = svgContent.toString();
            }
            return iconsJson;
        } catch (ex) {
            throw ex;
        }
    };

    try {
        const iconsJson = await getIconsJson();
        fs.writeFile(path.join(iconComponentDir, '/icons.json'), JSON.stringify(iconsJson));
        console.log('Succesfully written icons.json');
    } catch (ex) {
        console.error(`Exception occured while building svg json: ${JSON.stringify(ex)}`);
    }
};

buildIconsJson();

exports.default = buildIconsJson;
