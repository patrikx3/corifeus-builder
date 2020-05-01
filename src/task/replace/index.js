const exec = require('./replace');
module.exports = (grunt) => {


    grunt.registerTask('cory-replace', async function (target) {

        const config = grunt.config.get('cory-replace');
        if (target !== undefined) {
            exec(grunt, config[target], this.async());
        } else {
            const done = this.async()
            try {
                for(let item of Object.keys(config)) {
                    await exec(grunt, config[item]);
                }
                done()
            } catch(e) {
                done(e)
            }
        }
    })
}
