const folder = require('../../folder');
const task = require('../../task');

module.exports = (grunt) => {

    const result = {
        copy: {
            'cory-run': {},
            'cory-build': {}
        },
        /*
        jshint: {
            files: folder.files.all,
            options: {
                "asi": true,
                "esversion": 6
            }
        },
        */


        clean: {
            'cory-build': [
                folder.build.root
            ]
        },


    }


    return result;
};
