<template>
  <footer class="footer-container">
    <div class="footer-copyrights">
    <div class="l-page">
    <div class="copyrights-nav">
        <template v-for="items in footerCopyrights['menu-items']">
          <template v-for="(item,index) in items['menu-list']">
            <a :href="item.href" :key="index"> {{item.label}} </a>
            <span v-if="index !== items['menu-list'].length - 1" :key="item.text">-</span>
          </template>
        </template>
    </div>
    <div class="footer-copyrights-text">
        <span>{{ footerCopyrights['copyrights-text'] }}</span>
    </div>
    </div>
  </div>
  </footer>
</template>

<script>
export default {
  name: 'appFooter',
  data() {
    return {
      footerCopyrights: {
        'copyrights-text': 'Copyright © Freshworks Inc. All Rights Reserved',
        'menu-items': [{
          'menu-list': [{
            label: 'Terms of Service',
            href: 'https://www.freshworks.com/terms/',
            'new-tab': false,
          },
          {
            label: 'Privacy Notice',
            href: 'https://www.freshworks.com/privacy/',
            'new-tab': false,
          },
          {
            label: 'Takedown Policy',
            href: 'https://www.freshworks.com/take-down/',
            'new-tab': false,
          },
          {
            label: 'GDPR',
            href: 'https://www.freshworks.com/gdpr/',
            'new-tab': false,
          },
          {
            label: 'Security',
            href: 'https://www.freshworks.com/security/',
            'new-tab': false,
          },
          {
            label: 'Unsubscribe',
            href: 'https://www.freshworks.com/privacy/gdpr/unsubscribe/',
            'new-tab': false,
          }],
        }],
      },
    };
  },
};
</script>

<style scoped lang="scss">
.footer-container {
  margin-top: 5%;
  bottom: 0;
  top: 0;
  .footer-copyrights {
        background-color: #f1f1f1;
        border: solid 1px #e6e6e6;
        color: #666;
        padding: 15px 0;
        text-align: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
  .l-page {
  .copyrights-nav, .footer-copyrights-text {
    a, span {
    margin: 0 3px;
    font-size: .75rem;
    line-height: 1.61;
    color: #697379;
    text-decoration: none;
    }
  }
 }
 }
}
</style>
