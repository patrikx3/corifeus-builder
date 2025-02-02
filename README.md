[//]: #@corifeus-header

 [![NPM](https://img.shields.io/npm/v/corifeus-builder.svg)](https://www.npmjs.com/package/corifeus-builder)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)



---
# 🏗️ Corifeus Builder v2025.4.136


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v22.13.1
```





# 📝 Description

                        
[//]: #@corifeus-header:end



To provide a global library for testing, documentation, building and a shared common library. 

It uses JS and TypeScript. It is the builder for a few ```p3x``` libs and the whole ```Corifeus Platform```. Is uses grunt / webpack / jshint / karma / protractor / angular / mocha / istanbul coverage, and a few additional helpers for building like ```json2css```, automatic ```npm versioning``` end ```file replacer``` for adding in ```build date/version, git, repo name``` etc...   


# Version
```grunt cory-npm```

Generates automated version. Major and minor is kept. Build and commit is automatic.
Major.Minor.Build-Commit

# Tasks
See [tasks](artifacts/readme/builds/tasks.md).

# Folders
[Folders](artifacts/readme/builds/folders.md) the system using.  


# Example package.json
Name is based on the ```git``` repo name, plus a prefix, so all generated. (Was ```angular-compile```, in ```NPM``` it is ```p3x-angular-compile```, also the prefix is not required, in other libs is not used like ```Corifeus```.)

```json
{
    "name": "p3x-angular-compile",
    "version": "1.1.114-203",
    "corifeus": {
        "time": "5/6/2017, 5:02:36 PM",
        "icon": "fa fa-gavel",
        "time-stamp": 1494082956181,
        "code": "Make",
        "publish": true
    }
}    
```

### ECMA versions
`src/utils/config.js`

## Example output
```text
patrikx3@workstation ~/ramdisk/persistence/content/.p3x-ramdisk-link/Projects/patrikx3/corifeus/corifeus-builder $ grunt
Running "generate-folder" task

Running "cory-generate-tasks" task

Running "cory-npm" task

Running "clean:cory-build" (clean) task
>> 1 path cleaned.


Running "cory-replace" task
Replaced: artifacts/readme/builds/folders.md, Pre:  #@corifeus-header, Post:  #@corifeus-header:end
Replaced: artifacts/readme/builds/tasks.md, Pre:  #@corifeus-header, Post:  #@corifeus-header:end
Replaced: README.md, Pre:  #@corifeus-header, Post:  #@corifeus-header:end
Replaced: artifacts/readme/builds/folders.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end
Replaced: artifacts/readme/builds/tasks.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end
Replaced: README.md, Pre:  #@corifeus-footer, Post:  #@corifeus-footer:end

Done.


Execution Time (2017-05-19 11:41:05 UTC+2)
mocha_istanbul:cory-coverage  2.1s  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 97%
Total 2.1s



```


# Await /  Async

Until it works for await/async, removed from **JSDoc**.

[//]: #@corifeus-footer

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


[**CORIFEUS-BUILDER**](https://corifeus.com/corifeus-builder) Build v2025.4.136

 [![NPM](https://img.shields.io/npm/v/corifeus-builder.svg)](https://www.npmjs.com/package/corifeus-builder)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)





[//]: #@corifeus-footer:end
