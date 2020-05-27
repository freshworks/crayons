<template>
  <div class="landing-container" @scroll="handleScroll">
    <div class="landing-header">
      <div class="fw-logo">
        <img src="../public/assets/logo-fworks-black.svg" alt="freshworks">
      </div>
    </div>

    <div class="crayons-logo">
      <img src="../public/assets/crayons.png">
    </div>

    <div class="crayons-description"> 
      A refreshed design library for the Freshworks Developers.
    </div>
    
    <div class="link-cards-container">
      <DetailCard v-for="welcomeLink in welcomeLinks"
        :key="welcomeLink.name"
        :card-link="welcomeLink.link"
        :card-name="welcomeLink.name"
        :card-title="welcomeLink.title"
        :card-description="welcomeLink.description"
      />
    </div>
    <div class="footer">
      FOOTERR
    </div>
  </div>
</template>

<script>
export default {
  name: 'landingPage',
  data() {
    return {
     welcomeLinks: [
       {
         name: 'get-started',
         title: 'Get Started',
         description: 'Craft great apps with an open-source and framework-agnostic component library.',
         link: '/components'
       },
       {
         name: 'sample-app-repo',
         title: 'Sample App Repository',
         description: 'Accelerate development by using the sample apps in the repository.',
         link: 'https://github.com/freshdesk/marketplace-sample-apps'
       },
       {
         name: 'build-for-crayons',
         title: 'Build For Crayons',
         description: 'Browse through the contributor guidelines to raise an issue or build new components.',
         link: 'https://github.com/freshdesk/crayons'
       },
     ],
     limitPosition: 500,
     scrolled: false,
     lastPosition: 0,
    };
  },
  methods: {
  handleScroll() {
    debugger;
  },
},
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    console.log(document.querySelector('.navbar'));
  },
}
</script>

<style lang="scss">
  .theme-container {
    background: #ebf1fc;
    min-height: 100%;
    overflow-y: scroll;
  }
  .home {
    padding: 0; 
    max-width: 1000px;
  }
  .navbar {
    height: 2.6rem;
    background: #ebf1fc;
    border-color: #000;
    opacity: 0.1;
    will-change: transform;
    transition: transform 200ms linear;
    &.pinned {
      transform: translateY(0%);
    }
    &.unpinned {
      transform: translateY(-100%);
    }
  }
  .landing-container {
    .landing-header {
      display: flex;
      justify-content: space-between;
      .fw-logo {
        margin-top: 5%;
        // position: fixed;
        img {
          width: 90%;
          height: 90%;
        }
      }
    }
    .crayons-logo {
      margin-top: 10%;
      text-align: center;
      img {
        width: 40%;
        height: 40%;
      }
    }

    .crayons-description {
      color: #666666;
      font-size: 17px;
      font-weight: 400;
      line-height: 28px;
      margin-top: 15px;
      text-align: center;
    }

    .link-cards-container {
      margin-top: 7%;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 350px 350px 350px;
      grid-column-gap: 20px;
    }

    .footer {
      width: 100%;
      height: 100px;
    }
  }
</style>
