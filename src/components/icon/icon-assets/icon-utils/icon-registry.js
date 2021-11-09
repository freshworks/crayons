class IconRegistry {

    constructor(){
     this.registry = new Map();
    }
  
    registerIcons(icons){
      console.log('icons in registry',icons);
      icons.forEach((icon) => {
        //console.log('icon in registry',icon);
        this.registry.set(icon.name, icon.data)});
    }
    
    getIcon(iconName){
        if (!this.registry.has(iconName)) {
            console.warn(`We could not find the crayons Icon with the name ${iconName}, did you add it to the Icon registry?`);
        }
        return this.registry.get(iconName);
     }
  }
  export default IconRegistry ;