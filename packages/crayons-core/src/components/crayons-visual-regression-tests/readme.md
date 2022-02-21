# Crayons Component Visual Regression Testing

## Setup Visual Testing With Storybook, Jest-Screenshot and Puppeteer & Jest-screenshot reporter

Storybook is a powerful tool for visualizing components and it is a perfect environment to do Visual Testing.A form of testing where a current snapshot is compared with one from the past.

1. Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable,familiar and feature-rich API 
   that gives you results quickly.We have set up Visual Testing using Jest; As a well-established framework, it combines unit testing in extend to visual testing. In short: Run the Jest tests, it checks whether any visual change occurred by comparing the current state of a component with a previous snapshot.However other tools are required to achieve Visual Screenshot testing.
2. We will make snapshots using puppeteer (a package that allows you to spin up a browser and take screenshots), which will lay the foundation for 
   comparing snapshots. The comparison is done with jest-screenshot: A package that generates a difference between 2 snapshots; then it checks whether a test will fail or not, as icing on the cake it is also capable of generating an html-based report that interactively shows where the differences occurred.
3. Jest is a tool for writing our Unit Tests; Puppeteer allows us to spin up a browser and take screenshots of our components; Jest-screenshot is a 
   package that can compare snapshots with each other.
   `npm i -D jest puppeteer jest-puppeteer jest-screenshot`
4. Just pass your story names to `crayons-wc-visual-test.spec.js` and then start your storybook in parallel to ensure that your storybook is running while 
   you execute the tests using `jest` command.
5. The Jest-Puppeteer-Storybook Integration is closed by a reporting tool that captures even minutest style regressions that impact the UI. We have 
   achieved it using `jest-screenshot-reporter package`.
6. After running your tests , just go to `__crayonsDIR__/visual-regression-tests/jest-screenshot-report` path and open the report via `http-server`. You 
   can see the regressions and correct them. 
7. After correcting again run the same command with `jest -u`. `-u` option helps you to save new snapshots that will be used for further integrations.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description     | Type     | Default     |
| -------- | --------- | --------------- | -------- | ----------- |
| `first`  | `first`   | The first name  | `string` | `undefined` |
| `last`   | `last`    | The last name   | `string` | `undefined` |
| `middle` | `middle`  | The middle name | `string` | `undefined` |


----------------------------------------------

Built with ❤ at Freshworks
