const utils = require('corifeus-utils')
const fsExtra = require('fs-extra')
const download = require('download');
const extract = require('extract-zip')
const consolePrefix = `[CORIFEUS-BUILDER] [twemoji-install]`
const start = async () => {
    if (await fsExtra.pathExists('node_modules/twemoji/twemoji-master')) {
        await fsExtra.remove('node_modules/twemoji/twemoji-master')
    }
    console.log(consolePrefix, 'start downloading twemoji git repo')
    await download('https://github.com/twitter/twemoji/archive/master.zip', `${process.cwd()}/node_modules/twemoji/`);
    console.log(consolePrefix, 'done downloading twemoji git repo')
    console.log(consolePrefix, 'extract twemoji files')
    await extract('node_modules/twemoji/twemoji-master.zip', { dir: `${process.cwd()}/node_modules/twemoji/` })
    console.log(consolePrefix, 'done extract twemoji files')

    console.log(consolePrefix, 'copy files to appropriate path and cleanup')

    //await utils.childProcess.exec('curl -L https://github.com/twitter/twemoji/archive/master.zip --output node_modules/twemoji/master.zip', true)
    //await utils.childProcess.exec('unzip node_modules/twemoji/master.zip -d node_modules/twemoji/', true)
    if (await fsExtra.pathExists('node_modules/twemoji/2/svg')) {
        await fsExtra.remove('node_modules/twemoji/2/svg')
    }
    await fsExtra.move('node_modules/twemoji/twemoji-master/assets/svg', 'node_modules/twemoji/2/svg')
    await fsExtra.remove('node_modules/twemoji/twemoji-master')
    await fsExtra.remove('node_modules/twemoji/twemoji-master.zip')
    console.log(consolePrefix, 'done files to appropriate path and cleanup')
}
start()
