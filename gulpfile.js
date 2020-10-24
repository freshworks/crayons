const fs = require('fs').promises;
const path = require('path');

const buildIconsJson = async () => {
    const iconComponentPath = './src/components/icon';
    const iconAssetsPath = '/icon-assets/icons';
    const iconsJsonFile = 'icons.json';

    const iconsJson = {};
    const getIconsJson = async () => {
        try {
            const allSvgFiles = await fs.readdir(path.join(iconComponentPath, iconAssetsPath));
            for (const svgFile of allSvgFiles) {
                const svgFilePath = path.join(iconComponentPath, iconAssetsPath, svgFile);
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
        fs.writeFile(path.join(iconComponentPath, iconsJsonFile), JSON.stringify(iconsJson));
        console.log(`Succesfully written ${iconsJsonFile}`);
    } catch (ex) {
        console.error(`Exception occured while building ${iconsJsonFile}: ${JSON.stringify(ex)}`);
    }
};

exports.default = buildIconsJson;
