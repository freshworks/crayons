# Contribution Guidelines

## About Crayons

Crayons is a component library based on Web Components. The goal of Crayons is to provide developers with easy to use web components that give apps a Freshworks product like user interface, while reducing the number of lines of code. Crayons is developed using StencilJS that helps build standard-based Web Components.

### Crayons Important links

- [Repository](https://github.com/freshworks/crayons)
- [Documentation](https://crayons.freshworks.com)

## How to Contribute

Crayons has a predefined set of components. As a developer, you not only can use the components in your projects but you can also contribute to Crayons, as it falls under the MIT license. We welcome all contributions, big or small.

Crayons uses `monorepo` setup. There are 3 packages under packages folder. Uses Lerna for managing monorepo along with npm workspaces. 
1. **crayons-core** (All core atomic components are present here)
2. **crayons-icons** (icon library for crayons)
3. **crayons-i18n** (i18n Library for crayons)


#### Contributing usually requires one or more of the following steps

1. Forking and setting up
2. Raising issues towards the repo
3. Fixing an existing issue
4. Creating a new component/ changes to other packages

### Setup the local environment

`Note : Please use npm instead of yarn`

1. Node Engine requirements
   1. **Node**: >=14.7.0
   2. **NPM**: >=7.0.0
2. Fork the Crayons repository.
3. Clone your forked Crayons repository. ```git clone https://github.com/freshworks/crayons```
4. Change directory to the cloned repository and install all the dependencies using `npm ci`.
5. Run `git config core.hooksPath .git/hooks/`.
6. To install/uninstall any new dependency for a package , use `npm install / uninstall <<dependency>> --workspace=<<packagename>>`. You can find the name of the workspace under each package's package.json.
7. `cd packages/crayons-core` and `npm run start` will start the dev server. You can make changes in `src/index.html` to see live changes in the browser.
8. `npm run test` to run the test
9. To build storybook / docs site, go to root folder and run npm run build. `Docs site -> www-dist, Storybook -> docs/storybook-dist`
10. Always run `npm run build` from root folder before commiting changes so that readme files are in sync.
11. You can generate a component by running `npm run generate` in `packages/crayons-core` directory.
12. `scss` variables and mixins are present in `styles` folder.

##### Naming Components

When generating components, the custom element tags is prefixed with `fw-` while the rest of the name is modified to support web component standards. For example, if a component is generated with the name `Label`, the component that would be generated would be `<fw-label/>`.


### Branches

1. **master** - stable release branch
2. **next** - experimental pre-release branch
3. **canary** - development branch


### Release Process

To know about the release process check [here](RELEASE_PROCESS.md)
   
### Raise an issue

If you find an issue or if you want to raise a feature request in, make sure you raise an issue in <https://github.com/freshworks/crayons/issues>

### Fix an issue

Should you choose to work on a new issue or an existing issue from <https://github.com/freshworks/crayons/issues>, please follow the steps below.

### Prepare the contribution commits

- Make the required changes to the component.
- Write integrations tests and unit tests.
- Check for all lint errors, if there are any fix them.
- Run tests for all the components.
- If the component you modify is used in another component make sure you update the tests for that component as well.
- Raise a Pull Request to the Crayons Repository.

### Commit the changes to Github

The Crayons repository uses GitHub's pre-commit hooks. To commit your changes,

1. Make your changes to the files and add the untracked files to the staging area.

2. Run `git commit`.

3. Choose one of the following based on the nature of your commit.

    | Type      |   Description |
    |-------    |--------------|
    |  feat     |   A new feature |
    |  fix      |   A bug fix |
    |  docs     |   Documentation only changes |
    |  style    |   Changes that do not affect the meaning of the code(white-space, formatting, missing      semi-colons, etc) |
    |  refactor |   A code change that neither fixes a bug nor adds a feature |
    |  perf     |   A code change that improves performance |
    |  test     |   Adding missing tests or correcting existing tests |
    |  build    |   Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
    |  ci       |   Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
    |  chore    |   Other changes that don't modify src or test files |
    |  revert   |   Reverts a previous commit |

4. Choose the scope of the change.

    ```bash
    ? What is the scope of this change (e.g. component or file name): (press enter to skip)
    ```

5. Give a brief description for the commit.

    ```bash
    ? Write a short, imperative tense description of the change (max 94 chars):
    ```

6. Give a long description for the commit.

    ```bash
    ? Provide a longer description of the change: (press enter to skip)
    ```

7. Fill in the following details when prompted.

    ```bash
    ? Are there any breaking changes? Yes
    ? Describe the breaking changes:
    documents
    ? Does this change affect any open issues? No
    ```

8. Give a commit message when prompted.

9. Run `git push -u origin <your-branch>`, to push your changes to the forked repo. git hooks will run all the test before pushing the changes. if any test fails, rewrite the tests and ensure that all tests pass before pushing again.

10. Go to the forked repo in github and raise a PR against `canary` branch. If there are any comments on your PR, address them. Please wait for the PR to be approved.

## FAQ

Q: Githooks are not running on my repo. What do I do?

Ans: Please run `git config core.hooksPath .git/hooks/` in the root of your project.
