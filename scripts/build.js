const esbuild = require('esbuild');

const targets =  ['chrome58', 'firefox57', 'safari11', 'edge16'];

esbuild.buildSync({
  bundle: true,
  format: 'iife',
  globalName: 'brightJs',
  outfile: '../bright.js',
  target: targets
});

esbuild.buildSync({
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'brightJs',
  outfile: '../bright.min.js',
  target: targets
});