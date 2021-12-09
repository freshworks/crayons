<template>
  <div class="card-gallery">
     <div class="card" >
      <fw-icon name="pie-chart" size="20" library="feather" x-root-margin = "80px" ></fw-icon>
      <span class="name">lib| feather</span>
    </div>
    <div class="card" >
      <fw-icon name="cloud" size="20" library="heroicons" x-root-margin = "80px" ></fw-icon>
      <span class="name">lib| hero</span>
    </div>
     <div class="card" >
      <fw-icon name="calendar" size="20" library="custom" x-root-margin = "80px" ></fw-icon>
      <span class="name">lib| custom</span>
    </div>  
     <div class="card" >
      <fw-icon name="feather" size="20" src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons" x-root-margin = "80px" ></fw-icon>
      <span class="name">lib| src: url</span>
    </div>    
  </div>
</template>

<script>
import { registerfwIconLibrary } from '@freshworks/crayons';

export default {
  name: 'icon-external-gallery',
  data() {
    return {
        icons: [],
    }
  },
  mounted() {
      registerfwIconLibrary({
        'feather': 'https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons',
        'heroicons': 'https://cdn.jsdelivr.net/npm/heroicons@0.4.2/outline',
        'custom': 'assets/icons'
      });
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
