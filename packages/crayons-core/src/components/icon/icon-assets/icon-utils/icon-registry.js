class IconRegistry {

  constructor(){
    if (typeof window !== 'undefined'){
      this.iconLibRegistry = window.sessionStorage;
    }
  }

  mutateSVG(lib, svgName, svgDoc){
    try{
      JSON.parse(svgDoc);
      this.iconLibRegistry.setItem(`${lib}-${svgName}`, svgDoc);
    }
    catch(ex){
      const svgDocEle = '{"svg":{"props":{"viewBox":"0 0 615 84"}},"g":{"props":{"fill":"black"}}, "paths":[{"props":{"fill":"brown"}},{"props":null},....,{"props":null}]}'
      console.error(`Not a valid SVG JSON . Match the syntax like this : ${svgDocEle}. This is an example. In case of no props pass null against 'svg','g' or 'paths'.e.g. "g":null `);
      throw ex;
    }
  }

  registerIconLib(items) {
    items.forEach((item) => {
      this.iconLibRegistry.setItem(item.lib, item.path);
    });
  }

  getIconLib(libName) {
    if (!this.iconLibRegistry.getItem(libName)) {
      (libName.indexOf('-')==0)?console.warn(
        `We could not find the crayons Icon-Lib with the name ${libName}, did you add it to the Icon registry?`
      ):'';
      return undefined;
    }
    return this.iconLibRegistry.getItem(libName);
  }
}

const IconLibRegistry = new IconRegistry();

export default IconLibRegistry;
