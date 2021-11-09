const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const lodash = require('lodash');
const buildIconsJson = async () => {
    const iconComponentPath = './src/components/icon';
    const iconAssetsDir = '/icon-assets/icon-svg-json';
    const iconAssetsPath = '/icon-assets/icons';
    const iconAssetsPathReact = '/icons';
    const iconSVGJsonDir = './icon-svg-json';
   
    const getIconsJson = async (svgFile) => {
        try {
            //const allSvgFiles = await fs.readdir(path.join(iconComponentPath, iconAssetsPath));
            //for (const svgFile of allSvgFiles) 
            console.log('svgFile',svgFile);
            {
                const iconsJson = {};
                const svgName = path.parse(svgFile).name;
                const svgFilePath = path.join(iconComponentPath, iconAssetsPath, svgFile);
                console.log('svgFilePath',svgFilePath);
                const svgContent = await fs.readFile(svgFilePath);
               
                /* const svg_string = svgContent.toString();
                if(svg_string.indexOf('animation')>-1 || svg_string.indexOf('</g>')>-1){
                  iconsJson[svgName] = {"viewbox": '0 0 0 0' ,"path": svg_string};
                }else{
                  const $ = cheerio.load( svgContent.toString(), { xmlMode: true });
                  const svgOnlyPath = $('path').attr('d');
                  const svgOnlyViewBox = $('svg').attr('viewBox');
                  console.log('viewbox',$('svg').attr('viewBox'));
                  iconsJson[svgName] = {"viewbox": svgOnlyViewBox ,"path": svgOnlyPath};
                }
                 */
                const svg_name = svgName.indexOf('-')>-1 ? svgName.split('-').join('_') : svgName;
                //console.log('iconsJson',JSON.stringify(iconsJson),'svgName', lodash.camelCase(svgName),svg_);
                fs.writeFile(path.join('./react','/icons', svg_name+'.svg'),svgContent);
                return `import CrayonsIcon${lodash.upperFirst(lodash.camelCase(svgName))} from '.${iconAssetsPathReact}/${svg_name}.svg';export function FwIcon${lodash.upperFirst(lodash.camelCase(svgName))}(props){ return <CrayonsIcon${lodash.upperFirst(lodash.camelCase(svgName))} color={props.color} width={props.width} height={props.height} />}; export function ${svg_name}(_color, _width, _height){ return <CrayonsIcon${lodash.upperFirst(lodash.camelCase(svgName))} color={_color} width={_width} height={_height}/>};`
            }
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    };

    try {
        const allSvgFiles = await fs.readdir(path.join(iconComponentPath, iconAssetsPath));
        let indexData = "";
        for (const svgFile of allSvgFiles) {
            indexData = indexData + "\n" + await getIconsJson(svgFile);
            console.log(`Succesfully written ${svgFile}`);
        }   
        indexData = `import React from 'react';import FwIcon from './Icon'; export default FwIcon;` + indexData;
        fs.writeFile(path.join('./react','index.js'),indexData); 
    } catch (ex) {
        console.error(`Exception occured while building : ${JSON.stringify(ex)}`);
    }
};

exports.default = buildIconsJson;
