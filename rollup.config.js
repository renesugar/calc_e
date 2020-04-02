import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import svelte_preprocess_postcss from 'svelte-preprocess-postcss';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';
import copy from "rollup-plugin-copy-assets";

export default [
	{
		input: ['src/main.ts', 'src/preload.ts', 'src/renderer.ts'],
		output: {
			dir: 'dist',
			format: 'cjs',
			sourcemap: true
		},
		plugins: [
			resolve(),
			svelte({
				preprocess: {
					style: svelte_preprocess_postcss(),
			  },
				css: css => {
					css.write('dist/svelte.css')
				}
			}),
			resolve(),
			commonjs(),
			postcss({
				extract: true,
		  }),
			json(),
			typescript({
				typescript: require('typescript')
			}),
			copy({
				assets: [
					// You can include directories
					"src/assets",
					"src/fonts",
					// You can also include files
					"src/index.html",
				],
			})
		],
		external: [
			'electron',
			'child_process',
			'fs',
			'path',
			'url',
			'module',
			'os'
		]
	}
];