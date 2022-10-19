(() => {
  let metadataStore;

  function createPropsTable(props) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Property</th>
          <th>Attributes</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        ${props
          .map(
            (prop) => `
        <tr>
          <td>
            <code>${escapeHtml(prop.name)}</code>
          </td>
          <td><code>${escapeHtml(prop.attr)}</code></td>
          <td>${escapeHtml(prop.docs)}</td>
          <td><code style="white-space: normal;">${escapeHtml(
            prop.type
          )}</code></td>
          <td><code style="white-space: normal;">${escapeHtml(
            prop.default
          )}</code></td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createEventsTable(events) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Event</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map(
            (event) => `
        <tr>
          <td><code>${escapeHtml(event.event)}</code></td>
          <td>${escapeHtml(event.docs)}</td>
          <td><code>CustomEvent&lt;${escapeHtml(event.detail)}&gt;</code></td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createMethodsTable(methods) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Method</th>
          <th>Description</th>
          <th>Returns</th>
        </tr>
      </thead>
      <tbody>
        ${methods
          .map(
            (method) => `
        <tr>
          <td><code>${escapeHtml(method.name)}</code></td>
          <td>${escapeHtml(method.docs)}</td>
          <td><code>${escapeHtml(method.returns.type)}</code></td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createSlotsTable(slots) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Slot</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${slots
          .map(
            (slot) => `
        <tr>
          <td><code>${
            slot.name ? escapeHtml(slot.name) : '(default)'
          }</code></td>
          <td>${escapeHtml(slot.docs)}</td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createCustomPropertiesTable(styles) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${styles
          .map(
            (style) => `
        <tr>
          <td><code>${escapeHtml(style.name)}</code></td>
          <td>${escapeHtml(style.docs)}</td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createPartsTable(parts) {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${parts
          .map(
            (part) => `
        <tr>
          <td><code>${escapeHtml(part.name)}</code></td>
          <td>${escapeHtml(part.docs)}</td>
        </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    return table.outerHTML;
  }

  function createDependentsList(dependents) {
    const ul = document.createElement('ul');
    ul.innerHTML = `
        ${dependents
          .map(
            (dependent) => `
              <li><code>${escapeHtml(dependent)}</code></li>
            `
          )
          .join('')}
    `;

    return ul.outerHTML;
  }

  function escapeHtml(html) {
    return (html + '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  function getMetadata() {
    return new Promise((resolve) => {
      // Simple caching to prevent multiple XHR requests
      if (metadataStore) {
        return resolve(metadataStore);
      }

      fetch('/components.json')
        .then((res) => res.json())
        .then((data) => {
          metadataStore = data;
          resolve(metadataStore);
        })
        .catch((err) => {
          console.error('Error Fetching Metadata from components.json', err);
          resolve({});
        });
    });
  }

  function getShortNumber(value) {
    const suffixes = ['', 'k', 'm', 'b', 't'];
    const index = Math.floor(('' + value).length / 3);
    let shortValue = parseFloat(
      (index !== 0 ? value / Math.pow(1000, index) : value).toPrecision(2)
    );

    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }

    return shortValue + suffixes[index];
  }

  function getDocsTagsObject(docsTags) {
    let tags = {};

    for (const tag of docsTags) {
      tags[tag.name] = tag.text;
    }

    return tags;
  }

  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    // on mount fetch metadata for components
    hook.mounted(function () {
      getMetadata()
        .then((metadata) => {
          const target = document.querySelector('.app-name');

          // Add version
          const version = document.createElement('div');
          version.classList.add('sidebar-version');
          version.textContent = metadata.version;
          target.appendChild(version);

          // Add repo buttons
          const buttons = document.createElement('div');
          buttons.classList.add('sidebar-buttons');
          buttons.innerHTML = `
            <fw-button color="secondary" class="repo-button repo-button--github">
            <a href="https://github.com/freshworks/crayons/stargazers" target="_blank">  
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
                Star
            </a>
            </fw-button>
          `;
          target.appendChild(buttons);
        })
        // .then(() => {
        //   fetch('https://api.github.com/repos/freshworks/crayons')
        //     .then((res) => res.json())
        //     .then((json) => {
        //       const count = getShortNumber(json.stargazers_count);
        //       [...document.querySelectorAll('.github-star-count')].map(
        //         (stars) => (stars.textContent = count)
        //       );
        //     });
        // })
        .catch((err) => {
          console.error(`Error in fetching metadata`, err);
        });
    });

    hook.beforeEach(async function (content, next) {
      const metadata = await getMetadata();
      let tagElem = '';

      let tagIndex = content.indexOf('[component-header');
      if (tagIndex === -1) {
        next(content);
        return;
      }

      // Replace %VERSION% placeholders
      content = content.replace(/%VERSION%/g, metadata.version);

      const index = content
        .toString()
        .lastIndexOf('<!-- Auto Generated Below -->');
      // console.log(index);

      // use custom content and ignore auto generated content by Stencil
      if (index != -1) content = content.substring(0, index);

      // Use [component-header] to get the component tag name
      content = content.replace(
        /\[component-header:([a-zA-Z0-9_-]+)\]/g,
        (match, tag) => {
          tagElem = tag;
          const data = metadata.filter((data) => data.tag === tag)[0];
          let result = '';

          if (!data) {
            console.error('Component not found in metadata: ' + tag);
            next(content);
            return;
          }

          const tags = getDocsTagsObject(data.docsTags);

          const pascalCase = (str) =>
            str
              .split('-')
              .map((n) => n[0].toUpperCase() + n.substring(1))
              .join('');

          if (tags && tags.status) {
            let color = 'normal';
            if (tags.status === 'stable') color = 'green';
            if (tags.status === 'experimental') color = 'yellow';
            if (tags.status === 'planned') color = 'grey';
            if (tags.status === 'deprecated') color = 'red';

            result += `
            <div class="component-header">
              <div class="component-header__tag">
                <code>&lt;${pascalCase(tag)}/&gt;</code>
              </div>
              <div class="component-header__info">
                <fw-pill color="grey">
                Since ${tags.since || '?'}
                </fw-pill>
                <fw-pill color="${color}" style="text-transform: capitalize;">
                ${tags.status}
                </fw-pill>
              </div>
            </div>
          `;
          }

          return result.replace(/^ +| +$/gm, '');
        }
      );

      const data = metadata.filter((data) => data.tag === tagElem)[0];

      let result = '';

      if (!data) {
        console.error('Component not found in metadata: ' + tagElem);
        next(content);
        return;
      }

      if (data.props.length) {
        result += `
            ## Properties
            ${createPropsTable(data.props)}
          `;
      }

      if (data.events.length) {
        result += `
            ## Events
            ${createEventsTable(data.events)}
          `;
      }

      if (data.methods.length) {
        result += `
            ## Methods
            ${createMethodsTable(data.methods)}
          `;
      }

      if (data.slots.length) {
        result += `
            ## Slots
            ${createSlotsTable(data.slots)}
          `;
      }

      if (data.styles.length) {
        result += `
            ## CSS Custom Properties
            ${createCustomPropertiesTable(data.styles)}
          `;
      }

      if (data.parts.length) {
        result += `
            ## CSS Parts
            ${createPartsTable(data.parts)}
          `;
      }

      if (data.dependents.length) {
        result += `
            ## Dependents
            The following components make use of this component.
            ${createDependentsList(data.dependents)}
          `;
      }

      result += '<br>Built with ❤ &nbsp;at Freshworks';

      // Strip whitespace so markdown doesn't process things as code blocks
      content += result.replace(/^ +| +$/gm, '');

      next(content);
    });

    // hide and show sidebar based on route
    hook.doneEach(() => {
      const file = vm.route.file;
      // console.log(file)
      const body = document.querySelector('body');

      if (file === '/getting-started/overview.md') {
        body.classList.add('no-sidebar');
      } else {
        body.classList.remove('no-sidebar');
      }
    });
  });
})();
