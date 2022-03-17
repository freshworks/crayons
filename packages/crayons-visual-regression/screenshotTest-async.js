/* eslint-disable no-undef */
require('events').EventEmitter.prototype._maxListeners = 250;
require('events').defaultMaxListeners = 250;

const runTestsInBand = (component, setup) => {
  describe(component, () => {
    // Loop each variants for component
    setup[component].forEach((variant) => {
      // Create a prefix for creating the storybook-url and for snapshot-naming
      const variantPrefix = variant ? `--${variant}` : '';
      it(`${variant} should render the same`, async () => {
        try {
          // Launch puppeteer instance
          global.page.setDefaultTimeout(0);
          global.page.setDefaultNavigationTimeout(0);
          // Wait till loaded
          await global.page.goto(
            `http://localhost:8082/iframe.html?id=${component}${variantPrefix}`,
            {
              waitUntil: 'networkidle0',
              timeout: 654321,
            }
          );
          // Take screenshot
          const screenshot = await global.page.screenshot();
          // Test screenshot (also save this new screenshot if -u is set)
          expect(screenshot).toMatchImageSnapshot({
            path: `./__tests__/__snapshots__/${component}${variantPrefix}.snap.jpg`,
            type: 'jpg',
          });
        } catch (ex) {
          console.log(
            `Exception while taking snapshot|id=${component}${variantPrefix}`,
            ex
          );
        }
      });
    });
  });
};

module.exports = (setup) => {
  const components = Object.keys(setup);
  for (let i = 0; i < components.length; i++) {
    runTestsInBand(components[i], setup);
  }
};
