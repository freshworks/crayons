# Crayons Component Visual Regression Testing

## Setup Visual Testing With Storybook, Jest-Screenshot and Puppeteer & Jest-screenshot reporter

Storybook is a powerful tool for visualizing components and it is a perfect environment to do Visual Testing.A form of testing where a current snapshot is compared with one from the past.

1. Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable,
   familiar and feature-rich API 
   that gives you results quickly.We have set up Visual Testing using Jest; As a well-established framework, it combines unit testing in extend to visual testing. In short: Run the Jest tests, it checks whether any visual change occurred by comparing the current state of a component with a previous snapshot.However other tools are required to achieve Visual Screenshot testing.
2. We will make snapshots using puppeteer (a package that allows you to spin up a browser and take screenshots), which will lay the foundation for 
   comparing snapshots. The comparison is done with jest-screenshot: A package that generates a difference between 2 snapshots; then it checks whether a test will fail or not, as icing on the cake it is also capable of generating an html-based report that interactively shows where the differences occurred.
3. Jest is a tool for writing our Unit Tests; Puppeteer allows us to spin up a browser and take screenshots of our components; Jest-screenshot is a 
   package that can compare snapshots with each other.
   `npm i -D jest puppeteer jest-puppeteer jest-screenshot`
4. JEST-RUN-IN-BAND : Just pass your story names to `crayons-visual-regression-tests/__all_tests__/__tests__/crayons-wc-all-visual-test.spec.js` and then 
   start your storybook in parallel to ensure that your storybook is running while you execute the tests using `npm run test-all` command. Use `storybook:deploy` npm script under `crayons` root package.json to start the server. Currently storybook runs with `--max_old_space_size=512` param. You may choose to use `1024`,`2048`,`4096` and `8192`.However recommended is default.
   JEST-RUN-IN-PARALLEL : Just create your story specs under `crayons-visual-regression-tests/__spec_tests__/__tests__/` and then start your storybook in parallel to ensure that your storybook is running while you execute the tests using `npm run test-each` command. Use `storybook:deploy` npm script under `crayons` root package.json to start the server. Currently storybook runs with `--max_old_space_size=512` param. You may choose to use `1024`,`2048`,`4096` and `8192`.However recommended is default.You may also pass options like `--runInBand` and `max-workers=2` to ensure slower/sequential execution in case you see any bounces in test execution.
   NOTE: Since tests are async and promise based , its not possible for Jest to figure out which Assertions have failed. So it may be possible that it reports all tests have passed which is normal in such intensive async test scenarios. To verify just see if regression report is generated.
5. The Jest-Puppeteer-Storybook Integration is closed by a reporting tool that captures even minutest style regressions that impact the UI. We have 
   achieved it using `jest-screenshot-reporter package`.
6. After running your tests ,if there is a visual regression found a report will be created.In order to see the report, just go to 
   `__crayonsDIR__/visual-regression-tests/jest-screenshot-report` path and open the report via `http-server`. You can see the regressions and correct them. 
7. After correcting the errors , again run the same command with `jest -u`. `-u` option helps you to save new snapshots that will be used for further  
   integrations.
   The commands are mentioned in package.json as :-
        1. "update-snapshots:all": "jest -u --testPathPattern=./__all_tests__/__tests__",
        2. "update-snapshots:each": "jest -u --testPathPattern=./__spec_test/__tests__",
        3. "update-snapshots:spec": "jest -u",
   In case you only want to update snapshots for few components, then run the command as follows:-
        1. npm run update-snapshots:spec crayons-wc-visual-test-datatable.spec.js crayons-wc-visual-test-skeleton.spec.js ... ... ...
8. Running Visual Regression Tests for Crayons, requires you to first run `npm run storybook:build`. However this is done during lerna:build but one should 
   do it prior to every checkin.
## Cache Resources in Puppeteer with userDataDir
By default, when starting a new browser session Puppeteer does not reuse CSS / JS / Images assets that were downloaded during a previous session. This means that everything gets loaded from scratch with a new browser session.

If you are hitting webpages with common CSS / JS / Image assets you may want to tell Puppeteer to use a cache for these assets so that they do not get unnecessarily downloaded in subsequent sessions (kind of how your regular browser works).

You can achieve this by setting a `userDataDir` path when launching Puppeteer. This can be found in `jest.setup.js`. It is suggested not to delete this during test runs as it helps to run tests faster. Core Crayons build will automatically reset the package state to zero-cached.

PANIC NOTE :The `crayons-visual-regression-test` suite is optimized for all errors and uses ultra optimized args for puppeteer with singe puppeteer/browser and page sessions. So its very rare you will face issues like `system-hault`,`browser-crash`. But in rare cases you may follow the advisory as follows. \
1. If you start seeing `Session closed/Target Closed/etc` sort of errros , nothing to worry. Its just your localhost has been tired or you might have run many tests in a row. 
2. Just restart your browser or use a `--max_old_space_size=xxxx` of something greater while running tests. 
3. In rare cases,You may also need to restart your machine if problem persists as it happens with Puppeteer. In CI Environment this will be not an issue. 
CAUTION: Therefore dont over run the test suite >7/8 times as its very memory exhaustive.

----------------------------------------------

Built with ❤ at Freshworks
