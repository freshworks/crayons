import IconLibRegistry from './icon-registry';
import { parse } from 'svg-parser';
import { toHtml } from 'hast-util-to-html';
//declare const window: any;
const iconCache = {};
const requestCache = {};
const env_crayons_icon_path = `${process.env.HOST_URL}/${process.env.CRAYONS_ICONS_ASSET_PATH}`;

export async function fetchIcon(icon, lib) {

  const env_system_icon_path = (lib=="system")?`${process.env.HOST_URL}/${IconLibRegistry.getIconLib(lib)}`:'';
  (lib=="crayons" && !IconLibRegistry.getIconLib(lib))? IconLibRegistry.registerIconLib([{lib:lib,path:process.env.CRAYONS_ICONS_ASSET_PATH}]):false;

  console.log('name',icon,'library',lib,'lib_path',IconLibRegistry.getIconLib(lib));
  const icon_key = `${lib}-${icon}`;
  if(lib == "crayons" || lib=="system")
  {
    if (iconCache[icon_key]) {
      return iconCache[icon_key];
    }
   
    const fetch_asset_path = (lib=="crayons")
      ? `${env_crayons_icon_path}/${icon}.svg`
      : `${env_system_icon_path}/${icon}.svg`;

    if (!requestCache[icon_key]) {
      requestCache[icon_key] = fetch(fetch_asset_path)
        .then((resp) => resp.text())
        .then((text) => {
          return text;
        })
        .catch(() => {
          return '';
        });
    }

    iconCache[icon_key] = await requestCache[icon_key];
   
  }
  else{
    const lib_path =  IconLibRegistry.getIconLib(lib);
    if (iconCache[icon_key]) {
      return iconCache[icon_key];
    }
    const fetch_asset_path = `${lib_path}/${icon}.svg`;
    if (!requestCache[icon_key]) {
      requestCache[icon_key] = fetch(fetch_asset_path)
        .then((resp) => resp.text())
        .then((text) => {
          return text;
        })
        .catch(() => {
          return '';
        });
    }

    iconCache[icon_key] = await requestCache[icon_key];
    
  }
  if (typeof window !== 'undefined'){
    window.IconCache = iconCache;
  }

  /* 
  Code PenPoint :- Hypertext Abstract Syntax Tree format.

  Hast is a specification for representing HTML (and embedded SVG or MathML) as an abstract syntax tree. It implements the unist spec. */

  if(IconLibRegistry.getIconLib(icon_key)){
    const mutateProps = JSON.parse(IconLibRegistry.getIconLib(icon_key));
    const svgDoc = parse(iconCache[icon_key]);
    if(mutateProps.svg!== null){
      const data = mutateProps.svg.props;
      Object.keys(data).forEach(function(key) {
        svgDoc.children[0].properties[key]=data[key];
      });
    }
    if(mutateProps.g!== null){
      const data = mutateProps.g.props;
      Object.keys(data).forEach(function(key) {
        svgDoc.children[0].children[0].properties[key]=data[key];
      });
    }
    if(mutateProps.paths!==null){
      (mutateProps.paths).forEach((path,index) => {
        const data = path.props;
        Object.keys(data).forEach(function(key) {
          svgDoc.children[0].children[0].children[index].properties[key]=data[key];
        });
      });
    }
    iconCache[icon_key] = toHtml(svgDoc);
  } 
  
  return iconCache[icon_key];
}
