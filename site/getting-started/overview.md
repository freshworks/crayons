<div id="home-page-container">
  <landing-page></landing-page>
</div>

<script>

  const urlMap = {
    docs: '/components/introduction',
    sampleApps: 'https://github.com/freshworks/marketplace-sample-apps/tree/master/Freshworks-Samples/App-Development-Features/crayons',
    crayons: 'https://github.com/freshworks/crayons',
    freshworks: 'https://www.freshworks.com',
  };
  
  const DetailCard =  {
    computed:{
      linkTarget() {
        if (this.cardName === 'get-started') {
          return null;
        }
        return '_blank';
      },
    },
    props: ["cardName","cardTitle","cardDescription","cardLink", "cardImage"],
    template: `<a :href="cardLink" class="link-card" :target="linkTarget">
      <div class="card-container">
        <div class="img-container">
          <img :src="'../assets/images/' + cardImage" 
          :alt="cardName"/> 
        </div>
        <div class="card-title">
          {{ cardTitle }}
        </div>
        <div class="card-description">
          {{ cardDescription }}
        </div>
        <div class="learn-more">
          <span class="learn-more-text">Learn More &#8594;</span>
        </div>
      </div>
    </a>`
  }

  const app = Vue.createApp({
  });

  app.component("landing-page", {
    components: {
      'detail-card': DetailCard
    },
    data() {
      return {
        welcomeLinks: [
          {
            name: 'get-started',
            title: 'Get Started',
            image: 'get-started.png',
            description:
              'Craft great apps with an open-source and framework-agnostic component library.',
            link: urlMap.docs,
          },
          {
            name: 'sample-app-repo',
            image: 'sample-app-repo.png',
            title: 'Sample App Repository',
            description:
              'Accelerate development by using the sample apps in the repository.',
            link: urlMap.sampleApps,
          },
          {
            name: 'build-for-crayons',
            image: 'build-for-crayons.png',
            title: 'Build For Crayons',
            description:
              'Browse through the contributor guidelines to raise an issue or build new components.',
            link: urlMap.crayons,
          },
        ],
        freshworksUrl: urlMap.freshworks,
        repoUrl: urlMap.crayons,
      }
    },
    template: `<div class="landing-container">
      <div class="landing-header">
        <div class="fw-logo">
          <a :href="freshworksUrl" target="_blank">
            <img src="../assets/images/logo-fworks-black.svg" alt="freshworks" />
          </a>
        </div>
      </div>

      <div class="crayons-logo">
        <img src="../assets/images/crayons-logo.svg" alt="Crayons Logo" />
      </div>

      <div class="crayons-description">
        A refreshed design library for Freshworks Developers.
      </div>

      <div class="link-cards-container">
        <detail-card
          v-for="welcomeLink in welcomeLinks"
          :key="welcomeLink.name"
          :card-link="welcomeLink.link"
          :card-name="welcomeLink.name"
          :card-image="welcomeLink.image"
          :card-title="welcomeLink.title"
          :card-description="welcomeLink.description"
        />
      </div>
    </div>`
  });

  app.mount('#home-page-container');

</script>
