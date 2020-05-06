## Contribution Guidelines

Crayons is a component library based on Web Components. The goal of Crayons is to provide the developer with easy to use web components by reducing the number of lines of code while giving your app a Freshworks product like user interface. 


#### About Crayons
Crayons are built using StencilJS which provides all features of web component. 

#### Crayons Important links 
- Repository 
- storybook
- Documentation

### How to Contribute
Crayons have a predefined set of components, As a developer, you can not only use the components in your projects, you can also contribute to Crayons as it falls under MIT license and we welcome all contributions, small or big. 

*Contributing usually requires one or more of the following steps* 

1. Forking and setting up 
2. Raise issues towards the repo
3. Fixing existing or a new issue
4. Creating a new component

*Setup the local environment*
1. Fork the crayons repository
2. Clone the forked repo
3. Change directory to the cloned repository and install all the dependencies using *npm install*
4. Run "npm run storybook" to open storybook in https://localhost:9000 

`
Note : Please use npm instead of yarn
`

*Raise an issue in Crayon*
If you find an issue or is you want to raise a feature request in, make sure you raise an issue in https://github.com/freshdesk/crayons/issues
Fix an issue
Should you choose to work on a new issue or an existing issue from https://github.com/freshdesk/crayons/issues, please follow the steps below. 

*Setup the local environment* 
Make the required changes to the component
Write integrations tests and unit tests
check for all lint errors, if there are any fix it 
run tests for all the components 
if the component you modify is used in another component make sure you update the tests for that component as well
Raise a PR to the Crayons Repository