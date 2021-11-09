<template>
  <div class="card-gallery">
    <div v-for="icon in icons" class="card" @click="copyToClipboard(icon)">
      <fw-icon :name="icon" size="18" color="black"></fw-icon>
      <span class="name">{{icon}}</span>
      <span :ref="icon" class="copied">Copied</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'icon-gallery',
  data() {
    return {
      icons: [],
    }
  },
  methods: {
    getIconList() {
      const context = require.context('@components/icon/icon-assets/icons/', true, /\.svg$/);
      return context.keys().map(key => key.substring(2, key.length - 4));
    },
    async copyToClipboard(text) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$refs[text][0].style.display='block';
      setTimeout(() => this.$refs[text][0].style.display='none', 2000);
    },
  },
  mounted() {
    this.icons = this.getIconList();
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
