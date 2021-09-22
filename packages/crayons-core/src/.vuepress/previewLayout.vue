<template>
  <div class="container">
    <div class="preview-container">
      <slot name="preview"></slot>
      <div class="seeCode" @click="toggle">{{showCode ? 'Hide Code' : 'Show Code'}}</div>
    </div>
    <div class="code" v-if="showCode">
      <slot name="editor" ></slot>
      <div class="copy" ref="copyBtn" @click="copyToClipboard">Copy</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCode: false
    };
  },
  methods: {
    toggle() {
      this.showCode =!this.showCode;
    },
    async copyToClipboard() {
      const code =  this.$slots['editor'].reduce((code, node) => code + node.data.model.value, '');
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$refs['copyBtn'].innerText = 'Copied!';
      await setTimeout(() => this.reset(), 2000);
    },
    reset() {
      this.$refs['copyBtn'].innerText = 'Copy';
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 20px 0;
  position: relative;

  .preview-container {
    position: relative;
    padding: 20px 30px 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(207, 215, 223);
  }

  .code {
    position: relative;
    margin-top: -14px;
    transition: all 0.25s ease;
  }

  .seeCode {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: rgb(18, 52, 77);
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    margin-left: -1px;
    border-width: 1px 0 0 1px;
    border-style: solid none none solid;
    padding: 4px 10px;
    background: rgb(255, 255, 255);
    border-top: 1px solid rgb(207, 215, 223);
    border-left: 1px solid rgb(207, 215, 223);
    border-radius: 4px 0 4px 0;
  }
}

.copy {
  position: absolute;
  bottom: 4px;
  right: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;
  margin-left: -1px;
  border: none;
  padding: 4px 10px;
  background: transparent;
  border-radius: 4px;

  &:hover {
    background: #8e44ad;
  }
}

</style>
