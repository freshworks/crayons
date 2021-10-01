module.exports = function (plop) {
  plop.setHelper('componentCase', (text) =>
    text.replace(/\s+/g, '-').toLowerCase()
  );
  plop.setHelper('pascalCase', (text) =>
    text
      .match(/[a-z]+/gi)
      .map(
        (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
      )
      .join('')
  );

  plop.setGenerator('component', {
    description: 'Generates Component Files',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Enter the component name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{componentCase componentName}}/{{componentCase componentName}}.scss',
        templateFile: 'plop-templates/component.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{componentCase componentName}}/{{componentCase componentName}}.stories.mdx',
        templateFile: 'plop-templates/component.stories.mdx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{componentCase componentName}}/{{componentCase componentName}}.e2e.ts',
        templateFile: 'plop-templates/component.e2e.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{componentCase componentName}}/{{componentCase componentName}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
    ],
  });
};
