const request = require('request');
const path = require('path');
const fs = require('fs');
const exportUrl = path.join(process.cwd(), 'export');

request(`https://github.com/buunguyen/octotree/raw/master/dist/chrome.crx`).pipe(fs.createWriteStream(path.join(exportUrl, 'dist/chrome.crx')))