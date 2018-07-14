const url = require('url');
const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');
const logSymbols = require('log-symbols');
const axios = require('axios');
const request = require('request');
const chalk = require('chalk');
const {
    setKey
} = require('./key');
const exportBaseUrl = path.join(process.cwd(), '');
let bar = '';
let token = '';
/**
 * @param {String} BaseUrl
 */
function parseUrl(BaseUrl) {
    try {
        const pathObj = url.parse(BaseUrl);
        const ghUrl = pathObj.path;
        const infoList = ghUrl.split('/');
        let username = infoList[1];
        let repos = infoList[2];
        let branch = '';
        let download = '';
        const includeList = ['/tree/', '/blob/'];
        let includeSwitch = false;
        includeList.map(item => {
            if (ghUrl.indexOf(item) > -1 && !includeSwitch) {
                includeSwitch = true;
                branch = infoList[4];
                const list = ghUrl.split(item);
                download = list[1].split('/');
                download.shift();
                download = download.join('/') + '/';
            }
        })
        if (!includeSwitch) {
            branch = process.argv[3] || 'master';
        }
        requestUrl(username, repos, branch, download);
    } catch (e) {
        console.log(logSymbols.error, chalk.red('url error'));
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
    if (download !== '') {
        filterList = filterList.filter(item => {
            return item.path.indexOf(download) > -1;
        })
    }
    bar = new ProgressBar(':bar :current/:total', {
        total: filterList.length
    });
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
    request(`https://github.com/${username}/${repos}/raw/${branch}/${url}`, (err, res, body) => {
        bar.tick();
        if (bar.complete) {
            console.log(logSymbols.success, chalk.green('all files download!'));
        }
    }).pipe(fs.createWriteStream(exportUrl))
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

function readFile() {
    try {
        token = fs.readFileSync('./private.key');
    } catch (e) {
        console.log(logSymbols.error, chalk.red('please set key first!'))
    }
}

function main() {
    let BaseUrl = process.argv[2];
    if (!BaseUrl) {
        console.log(chalk.red('url is required!'));
        return;
    }
    if (BaseUrl === 'set') {
        const key = process.argv[3];
        setKey(key);
        return;
    }
    readFile();
    parseUrl(BaseUrl);
}

main();