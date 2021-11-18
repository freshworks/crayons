const fs = require('fs').promises;
const path = require('path');
const lodash = require('lodash');
const buildReactIconCmp = async () => {
    const iconAssetLibPath = '../icons';
    //const iconLibReactSVGCmpPath = './react-svg-cmp';
    const getIcons = async (svgFile) => {
        try {
            console.log('svgFile',svgFile);
            {
                const svgName = path.parse(svgFile).name;
                const svgFilePath = path.join(iconAssetLibPath, svgFile);
                console.log('svgFilePath',svgFilePath);
                //const svgContent = await fs.readFile(svgFilePath);
               
                let svg_name = svgName.indexOf('-')>-1 ? svgName.split('-').join('_') : svgName;
                return `import CrayonsIcon${lodash.upperFirst(lodash.camelCase(svgName))} from '${iconAssetLibPath}/${svg_name}.svg';export function FwIcon${lodash.upperFirst(lodash.camelCase(svgName))}(props){ return <CrayonsIcon${lodash.upperFirst(lodash.camelCase(svgName))} color={props.color} width={props.width} height={props.height} />};`
            }
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    };

    try {
        const allSvgFiles = await fs.readdir(path.join(iconAssetLibPath, ''));
        let indexData = "";
        for (const svgFile of allSvgFiles) {
            indexData = indexData + "\n" + await getIcons(svgFile);
        }   
        indexData = `import React from 'react';` + indexData;
        await fs.writeFile(path.join('./','index.js'),indexData); 
        console.log(`Succesfully written ./caryons-icon-lib/react-svg-cmp/index.js`);

    } catch (ex) {
        console.error(`Exception occured while building :`,ex);
    }
};

exports.default = buildReactIconCmp;
