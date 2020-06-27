const fs = require('fs').promises;

module.exports = (grunt) => {

    grunt.registerTask('cory-raw-npm-angular', async function () {
        const done = this.async();
        try {
            const angularPkg = require(process.cwd() + '/node_modules/@angular/core/package.json');
            const pkgFile = process.cwd() + '/package.json';
            const pkg = JSON.parse((await fs.readFile(pkgFile)).toString());
            pkg.corifeus.angular = angularPkg.version
            await fs.writeFile(pkgFile, JSON.stringify(pkg, null, 4))
            done();

        } catch (e) {
            done(e)
        }
    });
}
