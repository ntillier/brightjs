const esbuild = require('esbuild');

const targets =  [];//['chrome58', 'firefox57', 'safari11', 'edge16'];
const entryPoints = ['./src/index.ts']

esbuild.buildSync({
  bundle: true,
  format: 'iife',
  globalName: 'brightJs',
  outfile: './lib/bright.js',
  target: targets,
  entryPoints: entryPoints
});

esbuild.buildSync({
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'brightJs',
  outfile: './lib/bright.min.js',
  target: targets,
  entryPoints, entryPoints
});

console.log("Builded successfully.")