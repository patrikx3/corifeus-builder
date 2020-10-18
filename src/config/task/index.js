const fs = require('fs');
const folder = require('../folder');

const taskBuildEmpty = [
    'cory-npm',
    'clean',
    'cory-replace',
    'cory:license',
]

const taskBuild = [
    'cory-npm',
    'clean',
    /*, 'jsdoc'*/
    'cory-replace',
    'cory:license',
];



const taskTest = [ ];

const runAll = taskBuild.slice();
runAll.push('watch:cory-js-all');

const runTest = taskTest.slice();

module.exports = {
    build: {
        js: taskBuild,
        empty: taskBuildEmpty,
    },
    run: {
        js: runAll,
        jsTest: [],
//        jsDoc: ['jsdoc', 'watch:cory-doc']
    },
    watch: {
        jsAll: taskBuild,
        jsTest: taskTest,
    },
    test: {
        jsTest: taskTest,
    }
};
