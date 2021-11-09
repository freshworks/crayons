import { applyPolyfills, defineCustomElements } from '@freshworks/crayons-icons/loader';
export default function Icon({ icon, color, width, height, ...props }) {
 const FwIcon = ( typeof icon === "function" )? icon(color, width, height) : icon ;
 
 return FwIcon;
}
applyPolyfills().then(() => {
  defineCustomElements(window);
});
