const url = require('url');
let BaseUrl  = process.argv[2];
const axios = require('axios');
const request = require('request');
const fs = require('fs');
const path = require('path');
const exportBaseUrl = path.join(process.cwd(), 'export');
/**
 * @param {String} BaseUrl
 */
function parseUrl(BaseUrl) {
    const pathObj = url.parse(BaseUrl);
    const ghUrl = pathObj.path;
    let username = '';
    let repos = '';
    let branch = '';
    let download = '';
    try {
        const infoList = ghUrl.split('/');
        username = infoList[1];
        repos = infoList[2];
        const includeList = ['/tree/', '/blob/'];
        let includeSwitch = false;
        includeList.map(item => {
            if(ghUrl.indexOf(item) > -1 && !includeSwitch) {
                includeSwitch = true;
                branch = infoList[4];
                const list = ghUrl.split(item);
                download = list[1].split('/');
                download.shift();
                download = download.join('/');
            }
        })
        console.log(username, repos, branch, download)
        if(!includeSwitch){
            branch = process.argv[3] || 'master';
        }
        requestUrl(username, repos, branch, download);
    } catch(e) {
        console.log('url error');
    }
}

/**
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} download
 */
function requestUrl(username, repos, branch, download) {
    const url = `https://api.github.com/repos/${username}/${repos}/git/trees/${branch}?recursive=1`;
    const token = 'b8455e3d38fba927c47c8b6a3dff9038a06b209d';
    axios.get(url, {
        header: {
            Authorization: `token ${token}`
        }
    }).then(res => {
        const data = res.data;
        const trees = data.tree;
        handleTree(username, repos, branch, trees, download);
    });
}

/**
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} tree
 * @param {String} download
 */
function handleTree(username, repos, branch, tree, download) {
    let filterList = tree.filter(item => {
        return item.type === 'blob';
    })
    if(download !== '') {
        filterList = filterList.filter(item => {
            return item.path.indexOf(download) > -1;
        })
    }
    filterList.map(item => {
        downloadFile(username, repos, branch, item.path)
    });
}

/**
 * @param {String} username
 * @param {String} repos
 * @param {String} branch
 * @param {String} url
 */
function downloadFile(username, repos, branch, url) {
    const exportUrl = path.join(exportBaseUrl, url);
    const dir = path.dirname(exportUrl);
    mkdirsSync(dir);
    request(`https://github.com/${username}/${repos}/raw/${branch}/${url}`).pipe(fs.createWriteStream(exportUrl))
}

/**
 * @param {String} dirname
 * @returns
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }

parseUrl(BaseUrl);
