<template>
  <div class="card-gallery">
     <div class="card" @click="copyToClipboard('pie-chart')">
      <fw-icon name="pie-chart" size="20" library="feather" ></fw-icon>
      <span class="name">pie-chart</span>
      <span id='pie-chart' class="copied">Feather Icons</span>
    </div>
     <div class="card" @click="copyToClipboard('calendar')">
      <fw-icon name="calendar" size="20" library="system" ></fw-icon>
      <span class="name">calendar</span>
      <span id='calendar' class="copied">System Library</span>
    </div>    
  </div>
</template>

<script>
import IconLibRegistry from '../../../packages/crayons-core/src/components/icon/icon-assets/icon-utils/icon-registry';
export default {
  name: 'icon-external-gallery',
  data() {
    return {
      icons: [],
    }
  },
  methods: {

    async copyToClipboard(text) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      document.getElementById(text).style.display='block';
      setTimeout(() => document.getElementById(text).style.display='none', 2000);
    },
  },
  mounted() {
    IconLibRegistry.registerIconLib([{lib:'feather', path: 'https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons'}]);
    IconLibRegistry.registerIconLib([{lib:'heroicons', path: 'https://cdn.jsdelivr.net/npm/heroicons@0.4.2/outline'}]);
    IconLibRegistry.registerIconLib([{lib:'system', path: 'custom-icons'}]);
    const svgDocEle = '{"svg":{"props":{"viewBox":"0 0 617 85"}},"g":null, "paths":[{"props":{"fill":"green"}}]}';
    try{
       IconLibRegistry.mutateSVG('crayons', 'crayons_logo', svgDocEle);
    }catch(ex){
      //console.error(ex);
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
  box-shadow:
    0 1px 3px 2px rgba(217, 217, 217, 0.3),
    0 0 0 0 rgba(236, 236, 236, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.card:hover {
  cursor: pointer;
  box-shadow:
    0 3px 5px 4px rgba(217, 217, 217, 0.3),
    0 0 0 0 rgba(236, 236, 236, 0.5);
}

.name {
  margin-top: 10px;
  width: 70px;
  text-align: center;
  font-size: 11px;
  word-break: normal;
}

.copied {
  display: none;
  font-size: 11px;
  color: #fff;
  border-radius: 3px;
  padding: 2px 4px;
  background: #000;
}
</style>
