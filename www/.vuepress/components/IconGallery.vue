<template>
  <div class="card-gallery" style="height:600px;overflow-y:scroll;">
    <div v-for="icon in icons" :key="icon.refIcon" class="card" @click="copyToClipboard(icon.name, icon.importByName, icon.refIcon, icon.refText)">
      <div :ref="icon.refIcon">
        <fw-icon :data-svg="icon.src" size = "16" alt="Crayons-Icon"  :label = "icon.name"></fw-icon>
      </div>
      <span :ref="icon.refIcon" class="name">{{ icon.name }}</span>
      <span :ref="icon.refText" class="copied">{{ copyText }}</span>
    </div>
  </div>
</template>

<script>
import * as Icons from '@freshworks/crayons-icon';
export default {
  name: 'icon-gallery',
  data() {
    return {
      icons: [],
      copyText:'',
    };
  },
  methods: {
    getIconList() {
      const context = require.context('@freshworks/crayons-icon/icons/', true, /\.svg$/);
      return context.keys().map((key) => {
        let svgName= key.substring(2, key.length - 4);
        const svg_name =
          svgName.indexOf('-') > -1
            ? svgName.split('-').join('_')
            : (svgName == 'new' || svgName == 'delete')
            ? svgName.concat('_icon')
            : svgName;
          return {name:svgName, src:Icons[svg_name], importByName: svg_name, refIcon: `iconId-${svgName}`, refText: `ref-${svgName}`};
      });
    },
    async copyToClipboard(text,import_as,refIcon, refText) {
      const el = document.createElement('textarea');
      el.value = `import { ${import_as} } from '@freshworks/crayons-icon';`;
      this.copyText = el.value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$refs[refText][0].style.display = 'block';
      this.$refs[refIcon][0].style.display = "none";
      this.$refs[refIcon][1].style.display = "none";
      setTimeout(() => {
        this.$refs[refText][0].style.display = 'none'; 
        this.$refs[refIcon][0].style.display = "block"; 
        this.$refs[refIcon][1].style.display = "block";
      }, 2000);
    },
  },
  mounted() {
    this.icons = this.getIconList();
  },
};
</script>

<style scoped>
.card-gallery {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.card {
  width: 98px;
  height: 98px;
  margin: 10px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 3px 3px rgb(217 217 217 / 35%), 0 0 0 0 rgb(236 236 236 / 50%);
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

.copied {
  display: none;
  font-size: 11px;
  color: #fff;
  border-radius: 3px;
  padding: 2px 4px;
  background: #000;
}
</style>
