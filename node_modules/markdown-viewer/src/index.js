const fs = require('fs');
const path = require('path');
const open = require('open');
const write = require('write');
const marked = require('marked');
const read = require('read-file');
const appRoot = require('app-root-path');


/**
 * Generate (and save) HTML file from markdown file
 *
 * @param file {string} absolute path to the file (optional), default: README.md
 * @param outputDir {string} absolute path to the output directory (optional)
 *   By default it saves the file to PROJECT_ROOT_DIR/.markdown-viewer/file.html
 *   If you are using this default,
 *   ensure to add .markdown-viewer to .gitignore and .npmignore files
 * @param opts object with members:
 *   - open {boolean} if true, opens the generated HTML in default browser
 *
 * @return {string} path to the generated HTML file
 */
async function mdRenderer(file, outputDir, opts) {
  file = (typeof file === 'string' ? file : '').trim();
  file = file.length === 0 ? `${appRoot}/README.md` : file;
  outputDir = (typeof outputDir === 'string' ? outputDir : '').trim();

  if(!fs.existsSync(file)) {
    throw {
      message: `File ${file} not found`,
    };
  }

  const input = read.sync(file, { encoding: 'utf8' });
  const output = marked(input); // parse output
  const basename = path.basename(file, '.md');
  const saveTo = outputDir.length > 0
    ? outputDir
    : `${appRoot}/.markdown-viewer`;
  const htmlFile = `${saveTo}/${basename}.html`;

  write.sync(htmlFile, output); // Write the parsed output to HTML

  if(opts && opts.open) {
    await open(htmlFile);
  }

  return htmlFile;
}

module.exports = mdRenderer;
