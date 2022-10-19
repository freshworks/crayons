(() => {
  const reactVersion = '17.0.2';
  let flavor = localStorage.getItem('flavor') || 'html';
  let count = 1;
  let packageName = 'crayons';
  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  function getAdjacentExample(name, pre) {
    let currentPre = pre.nextElementSibling;

    while (currentPre?.tagName.toLowerCase() === 'pre') {
      if (currentPre?.getAttribute('data-lang').split(' ').includes(name)) {
        return currentPre;
      }

      currentPre = currentPre.nextElementSibling;
    }

    return null;
  }

  function runScript(script) {
    const newScript = document.createElement('script');

    if (script.type === 'module') {
      newScript.type = 'module';
      newScript.textContent = script.innerHTML;
    } else {
      newScript.appendChild(
        document.createTextNode(`(() => { ${script.innerHTML} })();`)
      );
    }

    script.parentNode.replaceChild(newScript, script);
  }

  window.$docsify.plugins.push((hook, vm) => {
    hook.beforeEach(async function (content, next) {
      let packageIndex = content.indexOf('[component-package');
      if (packageIndex === -1) {
        next(content);
        return;
      }

      content = content.replace(
        /\[component-package:([a-zA-Z0-9_-]+)\]/g,
        (match, package) => {
          packageName = package;
          return '';
        }
      );

      next(content);
    });

    // Convert code blocks to previews
    hook.afterEach(function (html, next) {
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(html, 'text/html');

      const htmlButton = `
        <button
          type="button"
          title="Show HTML code"
          class="code-block__button code-block__button--html ${
            flavor === 'html' ? 'code-block__button--selected' : ''
          }"
        >
          HTML
        </button>
      `;

      const reactButton = `
        <button
          type="button"
          title="Show React code"
          class="code-block__button code-block__button--react ${
            flavor === 'react' ? 'code-block__button--selected' : ''
          }"
        >
          React
        </button>
      `;

      const codeSandboxButton = `
      <button type="button" class="code-block__button code-block__button--codesandbox" title="Edit on CodeSandbox">
       CODESANDBOX
      </button>
    `;

      [...doc.querySelectorAll('code[class^="lang-"]')].map((code) => {
        if (code.classList.contains('preview')) {
          const pre = code.closest('pre');
          const preId = `code-block-preview-${count}`;
          const toggleId = `code-block-toggle-${count}`;
          const reactPre = getAdjacentExample('react', pre);
          const hasReact = reactPre !== null;

          pre.id = preId;
          pre.setAttribute(
            'data-lang',
            pre.getAttribute('data-lang').replace(/ preview$/, '')
          );
          pre.setAttribute('aria-labelledby', toggleId);

          const codeBlock = `
            <div class="code-block code-block--show-${flavor} ${
            hasReact ? 'code-block--has-react' : ''
          }">
              <div class="code-block__preview">
                ${code.textContent}
                <div class="code-block__resizer">
                  <fw-icon name="drag"></fw-icon>
                </div>
              </div>

              <div class="code-block__source code-block__source--html">
                ${pre.outerHTML}
              </div>

              ${
                hasReact
                  ? `
                <div class="code-block__source code-block__source--react">
                  ${reactPre.outerHTML}
                </div>
              `
                  : ''
              }

              <div class="code-block__buttons">
                ${hasReact ? ` ${htmlButton} ${reactButton} ` : ''}

                <button type="button" class="code-block__button code-block__toggle" aria-expanded="false" aria-controls="${preId}">
                  View Source
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                ${codeSandboxButton}
              </div>
            </div>
          `;

          pre.replaceWith(
            domParser.parseFromString(codeBlock, 'text/html').body
          );
          if (reactPre) reactPre.remove();

          count++;
        }
      });

      // Force the highlighter to run again so JSX fields get highlighted properly
      requestAnimationFrame(() => Prism.highlightAll());

      next(doc.body.innerHTML);
    });

    // After the page is done loading, force scripts in previews to execute
    hook.doneEach(() => {
      [...document.querySelectorAll('.code-block__preview script')].map(
        (script) => runScript(script)
      );
    });

    // Horizontal resizing
    hook.doneEach(() => {
      [...document.querySelectorAll('.code-block__preview')].map((preview) => {
        const resizer = preview.querySelector('.code-block__resizer');
        let startX;
        let startWidth;

        const dragStart = (event) => {
          startX = event.changedTouches
            ? event.changedTouches[0].pageX
            : event.clientX;
          startWidth = parseInt(
            document.defaultView.getComputedStyle(preview).width,
            10
          );
          preview.classList.add('code-block__preview--dragging');
          event.preventDefault();
          document.documentElement.addEventListener(
            'mousemove',
            dragMove,
            false
          );
          document.documentElement.addEventListener(
            'touchmove',
            dragMove,
            false
          );
          document.documentElement.addEventListener('mouseup', dragStop, false);
          document.documentElement.addEventListener(
            'touchend',
            dragStop,
            false
          );
        };

        const dragMove = (event) => {
          setWidth(
            startWidth +
              (event.changedTouches
                ? event.changedTouches[0].pageX
                : event.pageX) -
              startX
          );
        };

        const dragStop = (event) => {
          preview.classList.remove('code-block__preview--dragging');
          document.documentElement.removeEventListener(
            'mousemove',
            dragMove,
            false
          );
          document.documentElement.removeEventListener(
            'touchmove',
            dragMove,
            false
          );
          document.documentElement.removeEventListener(
            'mouseup',
            dragStop,
            false
          );
          document.documentElement.removeEventListener(
            'touchend',
            dragStop,
            false
          );
        };

        const setWidth = (width) => (preview.style.width = width + 'px');

        resizer.addEventListener('mousedown', dragStart);
        resizer.addEventListener('touchstart', dragStart, { passive: true });
      }, false);
    });
  });

  // Toggle source mode
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    // const codeBlock = button?.closest('.code-block');

    if (button?.classList.contains('code-block__button--html')) {
      flavor = 'html';
    } else if (button?.classList.contains('code-block__button--react')) {
      flavor = 'react';
    } else {
      return;
    }

    localStorage.setItem('flavor', flavor);

    [...document.querySelectorAll('.code-block')].map((codeBlock) => {
      codeBlock.classList.toggle('code-block--show-html', flavor === 'html');
      codeBlock.classList.toggle('code-block--show-react', flavor === 'react');
      codeBlock
        .querySelector('.code-block__button--html')
        ?.classList.toggle('code-block__button--selected', flavor === 'html');
      codeBlock
        .querySelector('.code-block__button--react')
        ?.classList.toggle('code-block__button--selected', flavor === 'react');
    });
  });

  // Expand and collapse code blocks
  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('.code-block__toggle');
    if (toggle) {
      const codeBlock = event.target.closest('.code-block');
      codeBlock.classList.toggle('code-block--expanded');
      event.target.setAttribute(
        'aria-expanded',
        codeBlock.classList.contains('code-block--expanded')
      );
    }
  });

  // Show pulse when copying
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.docsify-copy-code-button');
    if (button) {
      button.classList.remove('copied');
      requestAnimationFrame(() => {
        button.addEventListener(
          'animationend',
          () => button.classList.remove('copied'),
          { once: true }
        );
        button.classList.add('copied');
      });
    }
  });

  // Open in CodeSandbox
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    const version = 'next';

    if (button?.classList.contains('code-block__button--codesandbox')) {
      const codeBlock = button.closest('.code-block');
      const htmlExample = codeBlock.querySelector(
        '.code-block__source--html > pre > code'
      )?.textContent;
      const reactExample = codeBlock.querySelector(
        '.code-block__source--react > pre > code'
      )?.textContent;
      const isReact = flavor === 'react' && typeof reactExample === 'string';

      const form = document.createElement('form');
      form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
      form.method = 'POST';
      form.target = '_blank';

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'parameters';

      let body = '';

      if (!isReact) {
        body = getCodeSandboxHTMLTemplate(htmlExample, version);
      } else {
        body = getCodeSandboxReactTemplate(reactExample, version);
      }

      input.value = body;
      form.append(input);

      document.body.append(form);
      form.submit();
      form.remove();
    }
  });

  function getCodeSandboxReactTemplate(body, version) {
    const code = `${body}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);`;
    const html = '<div id="root"></div>';

    const dependencies = {
      'react': 'latest',
      'react-dom': 'latest',
      //    '@freshworks/crayons': version,
    };

    dependencies[`@freshworks/${packageName}`] = version;

    const params = {
      files: {
        'package.json': {
          content: {
            dependencies,
          },
        },
        'index.js': {
          content: code,
        },
        'index.html': {
          content: html,
        },
      },
    };

    const parameters = LZString.compressToBase64(JSON.stringify(params));
    return parameters;
  }

  function getCodeSandboxHTMLTemplate(body, version) {
    const html = `<html>
  <head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@freshworks/${packageName}@${version}/dist/${packageName}/${packageName}.esm.js"></script>
    <script type="nomodule" src="https://cdn.jsdelivr.net/npm/@freshworks/${packageName}@${version}/dist/${packageName}/${packageName}.js"></script>
  </head>
  <body>
    ${body}
  </body>
</html>
`;
    const parameters = LZString.compressToBase64(
      JSON.stringify({
        files: {
          'index.html': {
            content: html,
          },
        },
      })
    );
    return parameters;
  }
})();
