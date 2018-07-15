const fs = require('fs');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
function setKey(key) {
    if(!key) {
        console.log(logSymbols.error, chalk.red(`can't set key null`));
        return;
    }
    key = (new Buffer(key)).toString('base64');
    fs.writeFile('./private.key', JSON.stringify(key), err => {
        if(err) {
            console.log(logSymbols.error, chalk.red('set key error'));
            return;
        }
        console.log(logSymbols.success, chalk.green('set ket success'));
    })
}

module.exports = {
    setKey,
}