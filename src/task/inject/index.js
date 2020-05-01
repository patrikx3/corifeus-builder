const exec = require('./inject');
module.exports = (grunt) => {

    grunt.registerTask('cory-inject', function (target) {
        const config = grunt.config.get('cory-inject');
        if (target !== undefined) {
            exec(grunt, config[target], this.async());
        } else {
            const done = this.async()
            try {
                Object.keys(config).forEach((item) => {
                    exec(grunt, config[item]);
                });
                done()
            } catch(e) {
                done(e)
            }
        }
    })
}
