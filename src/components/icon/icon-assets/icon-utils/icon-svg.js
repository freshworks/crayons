class CreateSVGElement{
   constructor(_icon){
      //window.iconRegistry = new IconRegistry();
      this.icon = _icon;
      //console.log('icon param CreateSVGElement', _icon);
      //console.log('Icon Registry > CreateSVGElement',window.iconRegistry);
   }

   createSVGElement() {
        const div = document.createElement('DIV');
        div.innerHTML = this.icon;
        return (
            div.querySelector('svg') ||
            document.createElementNS('http://www.w3.org/2000/svg', 'path')
        );
   }
}
export default CreateSVGElement;