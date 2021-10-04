const path = require("path");
const components = require("../src/custom-elements.json");

const getComponents = () =>
  components.tags.map(({ tag }) => {
    return `../src/components/${tag.substr(3)}/`;
  });

const getUtils = () => ['card'].map(util => (`/components/${util}/`));

const getTags = () => [
  "Web Components",
  "Ui Kit",
  "Marketplace",
  "Freshworks Marketplace",
  "Component Library",
  "FDK",
  "Freshworks developers",
  "Freshworks development",
  "Freshworks",
  "Freshworks Development Kit",
];

const websiteUrl = "https://crayons.freshworks.com";

module.exports = {
  title: "Crayons",
  base: "/",
  description: "A refreshed design library for the Freshworks Developers.",
  dest: "docs-dist",
  docsDir: "src",
  head: [
    ["script", { type: "module", src: "/www/build/crayons.esm.js" }],
    ["script", { nomodule: "", src: "/www/build/crayons.js" }],
    ["link", { rel: "icon", href: "/favicon.png" }],
  ],
  themeConfig: {
    lastUpdated: "Last Updated",
    smoothScroll: true,
    sidebar: [
      {
        title: "Introduction",
        collapsable: false,
        sidebarDepth: 1,
        children: ["../src/components/"],
      },
      {
        title: "Components",
        collapsable: false,
        sidebarDepth: 1,
        children: getComponents(),
      }, 
      {
        title: 'CSS Utils',
        collapsable: false,
        sidebarDepth: 1,
        children: getUtils()
      }
    ],
  },
  plugins: [
    [
      "live",
      {
        layout: path.resolve(__dirname, "./previewLayout.vue"),
      },
    ],
    ["@vuepress/active-header-links"],
    [
      "vuepress-plugin-google-tag-manager",
      {
        gtm: "GTM-WQKBJ88",
      },
    ],
    [
      "vuepress-plugin-seo",
      {
        siteTitle: () => "Crayons",
        title: () => "Crayons",
        description: () =>
          "A refreshed design library for the Freshworks Developers.",
        author: () => "Freshworks",
        tags: getTags,
        twitterCard: (_) => "summary_large_image",
        type: () => "website",
        url: (_, $site, path) => websiteUrl + path,
        image: ($page, $site) =>
          "https://s3.amazonaws.com/static.freshcloud.io/crayons/assets/crayons.png",
        publishedAt: ($page) =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
      },
    ],
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "../src/components"),
      },
    },
  },
};
