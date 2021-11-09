import IconRegistry from './icon-registry';

class PrepareIconSet {
    constructor(){
        this.iconRegistry = new IconRegistry(); 
    }
    addIcons(icons){
        console.log('icons PrepareIconSet',icons);
        this.iconRegistry.registerIcons(icons);
        if (typeof window !== "undefined") {
            window.IconRegistry = this.iconRegistry;
            //window.sessionStorage.setItem('icon-registry',this.iconRegistry);
        }
    }

}

const IconSet= new PrepareIconSet();

export default IconSet;