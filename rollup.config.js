import svelte from 'rollup-plugin-svelte';

const pkg = {
  name: process.env.NAME,
  module: process.env.MODULE,
  main: process.env.MAIN
}

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	output: [
		{ file: 'dist/'+pkg.module, 'format': 'es' },
		{ file: 'dist/'+pkg.main, 'format': 'umd', name }
	],
	plugins: [
		svelte({
      customElement: true,
    })
	]
};