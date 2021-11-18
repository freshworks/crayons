<template>
  <div class="card-gallery">
     <div class="card" @click="copyToClipboard('Header')">
      <fw-icon :name="icons.Header" size="20" ></fw-icon>
      <span class="name">Header</span>
      <span id='Header' class="copied">Header</span>
    </div>
     <div class="card" @click="copyToClipboard('add_contact')">
      <fw-icon :name="icons.add_contact" size="20" ></fw-icon>
      <span class="name">add_contact</span>
      <span id='add_contact' class="copied">add_contact</span>
    </div>    
  </div>
</template>

<script>
import { Header, add_contact} from '../../../packages/crayons-icon-lib';
export default {
  name: 'icon-ts-exports',
  data() {
    return {
      icons: {Header:Header,add_contact:add_contact},
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
