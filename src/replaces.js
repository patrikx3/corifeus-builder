const fs = require('fs');
const _ = require('lodash');

module.exports = (options, pkg) => {
    options.replacer = options.replacer || {}
    let replacer = 'corifeus';
    if (typeof (options.replacer) === 'string') {
        replacer = options.replacer;
    } else if (options.replacer.hasOwnProperty('type')) {
        replacer = options.replacer.type;
    }


    let commonBuild = `[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  `


    if (pkg.corifeus && pkg.corifeus.publish === true) {
        // ![https://www.npmjs.com/package/${pkg.name}](https://img.shields.io/npm/v/${pkg.name}.svg)
        commonBuild = `[![NPM](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})  ` + commonBuild

    }

    let opencollectiveHeader = ''
    let opencollectiveFooter = ''
    pkg.corifeus.opencollective = false;
    if (options.replacer.hasOwnProperty('opencollective') && options.replacer.opencollective === true) {
        pkg.corifeus.opencollective = true;

        pkg.collective = {
            type: "opencollective",
            url: `https://opencollective.com/${pkg.name}`
        }

        opencollectiveHeader = ` [![Backers on Open Collective](https://opencollective.com/\${pkg.name}/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/\${pkg.name}/sponsors/badge.svg)](#sponsors)`
        opencollectiveFooter = `

# Open collective

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/patrikx3/\${pkg.corifeus.reponame}/graphs/contributors"><img src="https://opencollective.com/\${pkg.name}/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers!

🙏 [Become a backer](https://opencollective.com/\${pkg.name}#backer)

<a href="https://opencollective.com/\${pkg.name}#backers" target="_blank"><img src="https://opencollective.com/\${pkg.name}/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website.

🙏 [Become a sponsor](https://opencollective.com/\${pkg.name}#sponsor)

<a href="https://opencollective.com/\${pkg.name}/sponsor/0/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/1/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/2/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/3/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/4/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/5/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/6/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/7/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/8/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/9/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/9/avatar.svg"></a>

`
    }

    const replaceFiles = [
        'artifacts/**/*.md',
        'docs/**/*.md',
        '*.md',
        '!node_modules',
        '!build',
        '!LICENSE.md',
        '!readme.md',
        '!README.md',
    ]

    const defaultHeader = {
        header: true,
        replace: `
# \${pkg.description}

                        `,
        files: replaceFiles
    }



    let defaultFooterNpm = ``


    if (pkg.corifeus && pkg.corifeus.publish === true) {
        // ![https://www.npmjs.com/package/${pkg.name}](https://img.shields.io/npm/v/${pkg.name}.svg)
        defaultFooterNpm = `[![NPM](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})  `

    }

    const defaultFooter = {
        footer: true,
        replace: `
---

## 🚀 Quick and Affordable Web Development Services

If you want to quickly and affordably develop your next digital project, visit [corifeus.eu](https://corifeus.eu) for expert solutions tailored to your needs.

---

## 🌐 Powerful Online Networking Tool  

Discover the powerful and free online networking tool at [network.corifeus.com](https://network.corifeus.com).  

**🆓 Free**  
Designed for professionals and enthusiasts, this tool provides essential features for network analysis, troubleshooting, and management.  
Additionally, it offers tools for:  
- 📡 Monitoring TCP, HTTP, and Ping to ensure optimal network performance and reliability.  
- 📊 Status page management to track uptime, performance, and incidents in real time with customizable dashboards.  

All these features are completely free to use.  

---

## ❤️ Support Our Open-Source Project  
If you appreciate our work, consider ⭐ starring this repository or 💰 making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.eu](https://corifeus.eu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.

---


[**\${pkg.name.toUpperCase()}**](https://corifeus.com/\${git.repo === 'corifeus' ? 'matrix' : git.repo}) Build v\${pkg.version}

 ${defaultFooterNpm}[![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)




${opencollectiveFooter}
`,
        files: replaceFiles
    };

    let angularVersion = '';
    let nodeJsInfo = `

### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

\`\`\`txt
${process.version}
\`\`\`

`;

    if (options.replacer.hasOwnProperty('nodejsinfo') && options.replacer.nodejsinfo === false) {
        nodeJsInfo = '';
    }


    const angularPkgPath = `${process.cwd()}/node_modules/@angular/core/package.json`;
    if (fs.existsSync(angularPkgPath)) {
        const angularPkg = JSON.parse(fs.readFileSync(angularPkgPath).toString());
        angularVersion = `
# 📦 Built on Angular

\`\`\`text
${angularPkg.version}
\`\`\`

`
    }

    const hideNodeVersion = options.hasOwnProperty('replacer') && options.replacer.node === false;

    let hideBuild = options.hasOwnProperty('replacer') && options.replacer.build === false;

    pkg.corifeus.build = !hideBuild;

//    let build = hideBuild ? '' : `[![Build Status](https://travis-ci.com/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.com/patrikx3/\${git.repo})  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)`

    let build = commonBuild

    // https://api.travis-ci.com/patrikx3/redis-ui-material.svg?branch=master
    /*
    build += hideBuild ? '' : `[![Build Status](https://api.travis-ci.com/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.com/patrikx3/\${git.repo})
[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://stats.uptimerobot.com/9ggnzcWrw)

`


     */

    // https://github.com/patrikx3/onenote/workflows/build/badge.svg
    build += hideBuild ? '' : `[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://stats.uptimerobot.com/9ggnzcWrw)

`


    build += opencollectiveHeader

    // below is to add additional status
    const domainInfo = `
  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    `

    let nodeVersion = hideNodeVersion ? `# 🛠️ \${pkg.description}  v\${pkg.version}

${domainInfo}

# Description

` : `# \${pkg.description} v\${pkg.version}

${domainInfo}

${nodeJsInfo}

${angularVersion}

# 📝 Description
`

    const footerMain = _.clone(defaultFooter);

    footerMain.files = [
        'readme.md',
        'README.md',
    ];
    switch (replacer) {
        case 'corifeus':
            options.config['cory-replace'] = {
                headerMain: {
                    header: true,
                    replace: `
 ${build}

${build.trim() === '' ? '' : '---'}
${nodeVersion}
                        `,
                    files: [
                        'readme.md',
                        'README.md',
                    ]
                },
                footerMain: footerMain,
                header: defaultHeader,
                footer: defaultFooter
            }
            break;

        case 'p3x':
            let nonEmptyP3x = '';
            if (!options.empty) {
                nonEmptyP3x = `${build}

`
            }

            options.config['cory-replace'] = {
                headerMain: {
                    header: true,
                    /*  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)
                     */

                    replace: `
  ${nonEmptyP3x}

${nodeVersion}
                        `,
                    files: [
                        'readme.md',
                        'README.md',
                    ]
                },
                footerMain: footerMain,
                header: defaultHeader,
                footer: defaultFooter
            };
            break;

        case 'build':
        case 'lede':
        case 'openwrt':
            let nonEmptyBuild = '';
            if (!options.empty) {
                /*
                                nonEmptyBuild = `[![Build Status](https://travis-ci.com/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.com/patrikx3/\${git.repo})  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)

                                # \${pkg.description}

                `
                */
                nonEmptyBuild = `[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://stats.uptimerobot.com/9ggnzcWrw)

# \${pkg.description}

`
            }

            if (replacer === 'openwrt') {
                nonEmptyBuild += `

`
            }

            options.config['cory-replace'] = {
                headerMain: {
                    header: true,
                    /*  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)
                     */

                    replace: `
 ${commonBuild} ${nonEmptyBuild}
                        `,
                    files: [
                        'readme.md',
                        'README.md',
                    ]
                },
                footerMain: footerMain,
                header: defaultHeader,
                footer: defaultFooter
            };
            break;

        case 'home':
            options.config['cory-replace'] = {
                header: {
                    header: true,
                    replace: `
# \${pkg.description}

                        `,
                    files: [
                        'readme.md',
                        'README.md',
                    ]
                },
                footer: defaultFooter,
            }
            break;

        default:
            throw new Error(`unknown replacer ${options.replacer}`)
    }

    /*
    if (options.replacer.hasOwnProperty('npmio') && options.replacer.npmio === true && options.config['cory-replace'].hasOwnProperty('headerMain')) {
        const replace = options.config['cory-replace'].headerMain.replace;

        const append = replace.substring(replace.indexOf('---'));

        options.config['cory-replace'].headerMain.replace = replace.substring(0, replace.indexOf('---')) + `
[![NPM](https://nodei.co/npm-dl/\${pkg.name}.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/\${pkg.name}/)
` + append
    }
    */

}
