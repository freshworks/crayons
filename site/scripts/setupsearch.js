const fs = require('fs');
const path = require('path');
const glob = require('glob');
const lunr = require('lunr');

const metadata = JSON.parse(fs.readFileSync('./custom-elements.json'), 'utf8');

console.log('Generating search index for docs');

(async () => {
  function getHeadings(markdown, maxLevel = 6) {
    const headings = [];
    const lines = markdown.split('\n');

    lines.map((line) => {
      if (line.startsWith('#')) {
        const level = line.match(/^(#+)/)[0].length;
        const content = line.replace(/^#+/, '');

        if (level <= maxLevel) {
          headings.push({ level, content });
        }
      }
    });

    return headings;
  }

  function getMembers(markdown) {
    const members = [];
    const headers = markdown.match(/\[component-header:([a-z-]+)\]/g);

    if (!headers) {
      return '';
    }

    headers.map((header) => {
      const tagName = header.match(/\[component-header:([a-z-]+)\]/)[1];
      const component = metadata?.tags?.find(
        (component) => component.tag === tagName
      );

      if (component) {
        const fields = [
          'properties',
          'attributes',
          'methods',
          'cssProperties',
          'cssParts',
          'slots',
          'events',
        ];

        fields.map((field) => {
          if (component[field]) {
            component[field].map((entry) => {
              if (entry.name) members.push(entry.name);
              if (entry.docs) members.push(entry.docs);
              if (entry.attr) members.push(entry.attr);
            });
          }
        });
      }
    });

    return members.join(' ');
  }

  await glob('../site/**/*.md', function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.

    console.log(files);

    const map = {};
    const searchIndex = lunr(function () {
      this.ref('id'); // id
      this.field('t', { boost: 10 }); // title
      this.field('h', { boost: 5 }); // headings
      this.field('m', { boost: 2 }); // members (props, methods, events, etc.)
      this.field('c'); // content

      files.map((file, index) => {
        const relativePath = path.relative('../site', file).replace(/\\/g, '/');
        const relativePathNoExtension = relativePath
          .split('.')
          .slice(0, -1)
          .join('.');
        const url = relativePath.replace(/\.md$/, '');
        const filename = path.basename(file);
        // Ignore certain directories and files
        if (
          relativePath.startsWith('assets/') ||
          relativePath.startsWith('dist/') ||
          filename === '_sidebar.md' ||
          filename === '_navbar.md'
        ) {
          return false;
        }

        const content = fs.readFileSync(file, 'utf8');
        const allHeadings = getHeadings(content, 4);
        const title =
          allHeadings.find((heading) => heading.level === 1)?.content || '';
        const headings = allHeadings
          .filter((heading) => heading.level > 1)
          .map((heading) => heading.content)
          .concat([relativePathNoExtension])
          .join(' ');

        const members = getMembers(content);

        this.add({ id: index, t: title, h: headings, m: members, c: content });

        map[index] = { title, url };
      });
    });

    fs.writeFileSync(
      '../site/search.json',
      JSON.stringify({ searchIndex, map }),
      'utf8'
    );
  });
})();
