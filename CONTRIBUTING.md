# Contribution Guidelines

## About Crayons

Crayons is a component library based on Web Components. The goal of Crayons is to provide the developer with easy to use web components by reducing the number of lines of code while giving your app a Freshworks product like user interface.

Crayons are built using StencilJS which provides all features of web component.

### Crayons Important links

- [Repository](https://github.com/freshdesk/crayons)
- [Documentation](https://crayons.freshworks.com)

## How to Contribute

Crayons have a predefined set of components, As a developer, you can not only use the components in your projects, you can also contribute to Crayons as it falls under MIT license and we welcome all contributions, small or big.

### Contributing usually requires one or more of the following steps

1. Forking and setting up
2. Raise issues towards the repo
3. Fixing existing or a new issue
4. Creating a new component

### Setup the local environment

1. Fork the Crayons repository.
2. Clone your forked Crayons repository.
3. Change directory to the cloned repository and install all the dependencies using `npm install`.
4. Run `git config core.hooksPath .git/hooks/`.
5. Run `npm run dev` to open storybook in `https://localhost:9000`.

`
Note : Please use npm instead of yarn
`

### Raise an issue in Crayon

If you find an issue or is you want to raise a feature request in, make sure you raise an issue in <https://github.com/freshdesk/crayons/issues>
Fix an issue
Should you choose to work on a new issue or an existing issue from <https://github.com/freshdesk/crayons/issues>, please follow the steps below.

### Prepare the contribution commits

- Make the required changes to the component.
- Write integrations tests and unit tests.
- Check for all lint errors, if there are any fix it.
- Run tests for all the components.
- If the component you modify is used in another component make sure you update the tests for that component as well.
- Raise a Pull Requesst to the Crayons Repository.

### Commit the changes to Github

Crayons repository uses github pre commit hooks, follow the below steps to commit our changes to github

1. Make your changes to the file, add the untracked files to staging area.

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

7. Fill in the following details when it prompts.

    ```bash
    ? Are there any breaking changes? Yes
    ? Describe the breaking changes:
    documents
    ? Does this change affect any open issues? No
    ```

8. Give a commit message when it prompts.

9. Run `git push -u origin <your-branch>`, to push your changes to the forked repo. git hooks will run all the test before pushing the changes. if any test fails, rewrite the tests and make sure all the test passes before pushing again.

10. Go to the forked repo in github and raise a PR. wPlease wait for the PR to be approved or address comments if any.

## FAQ

Q: Githooks are not running on my repo. What do I do?

Ans: Please run `git config core.hooksPath .git/hooks/` in the root of your project.
