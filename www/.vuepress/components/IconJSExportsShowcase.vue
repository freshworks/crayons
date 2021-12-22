<template>
  <div class="card-gallery">
     <div class="card" >
      <fw-icon :data-svg="icons['header']" size="20"  label="crayons icon header" lazy></fw-icon>
      <span class="name">crayons-icon|header</span>
    </div>
     <div class="card" >
      <fw-icon :data-svg="icons['add-contact']" size="20"  label="crayons icon add-contact" lazy></fw-icon>
      <span class="name">crayons-icon|add-contact</span>
    </div>   
    <div class="card" >
      <fw-icon :data-svg="icons['circle']" size="20"  label="svg circle" lazy></fw-icon>
      <span class="name">custom|circle-svg</span>
    </div>    
  </div>
</template>

<script>
import { header, add_contact} from '@freshworks/crayons-icon';
const circle = `<svg viewBox='0 0 100 100'><ellipse cx='50' cy='50' rx='50' ry='50'></ellipse></svg>`; 
export default {
  name: 'icon-ts-exports',
  data() {
    return {
      icons: {'header':header,'add-contact':add_contact, 'circle':circle},
    }
  }
}
</script>

<style scoped>
.card-gallery {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.card {
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 2px rgba(217, 217, 217, 0.3),
    0 0 0 0 rgba(236, 236, 236, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.card:hover,
.card:focus {
  cursor: pointer;
  box-shadow: 0 3px 5px 4px rgba(217, 217, 217, 0.3),
    0 0 0 0 rgba(236, 236, 236, 0.5);
}

.name {
  margin-top: 10px;
  width: 70px;
  text-align: center;
  font-size: 11px;
  word-break: normal;
}
</style>
