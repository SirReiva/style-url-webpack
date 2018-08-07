const path = require('path');
const fs = require('fs');
const { urlToRequest } = require('loader-utils');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

// template pattern
const pattern = new RegExp(/\w+:(|[\s]+?)("|')?([\w+-?[\w\s+.\\*]+.(scss|sass|css))("|')/);


const compileCss = postcss([
  autoprefixer({ browsers: ['last 2 versions'] }),
  postcssPresetEnv({ browsers: ['last 2 versions'] }),
  cssnano(),
]);

function compile(css, source, callback) {
  compileCss.process(css, { from: undefined, to: undefined })
    .then((result) => {
      const caspeta = '`';
      const formatCss = result.css.toString();
      const newSource = source.replace(pattern, `styleUrl: ${caspeta}${formatCss}${caspeta}`);
      callback(null, newSource);
    })
    .catch(err => callback(err));
}

/**
 * Convert object { styleUrl: ''} to { styleUrl: css}
 * @param {*} source
 */
module.exports = async function (source) {
  const styleUrl = source.match(pattern);
  if (styleUrl === null) {
    throw new Error('Invalid format - styleUrl: formats (sass, scss, css)');
  }

  const callback = this.async();
  const url = styleUrl[3];
  const dirname = path.dirname(this.resourcePath);
  const request = urlToRequest(url, dirname);
  const resolve = path.resolve(dirname, request);
  const normalize = path.normalize(resolve);
  const ext = path.extname(request);
  let css;

  if (ext === '.scss' || ext === '.sass') {
    sass.render({
      file: normalize,
    }, (err, result) => {
      if (err) {
        callback(err);
        return;
      }

      css = result.css.toString();
      compile(css, source, callback);
    });
  }

  if (ext === '.css') {
    fs.readFile(normalize, 'utf-8', (err, result) => {
      if (err) {
        callback(err);
        return;
      }

      compile(result, source, callback);
    });
  }
};
