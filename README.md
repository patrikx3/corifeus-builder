[//]: #@corifeus-header

 [![Build Status](https://travis-ci.org/patrikx3/corifeus-builder.svg?branch=master)](https://travis-ci.org/patrikx3/corifeus-builder) 
[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://uptimerobot.patrikx3.com/)

  
 
  
[![NPM](https://nodei.co/npm/corifeus-builder.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/corifeus-builder/)
---
# 🏗️ Corifeus Builder - Make v2018.12.28-2  

This is an open-source project. Star this repository, if you like it, or even donate! Thank you so much! :)

I run my own server with dynamic IP address, so, it may happen, that the server can not be reachable for about max 15 minutes, due to nature of the dynamic DNS. The server may also be unreachable, when I backup the SSD with Clonzilla (very rarely) or an electrical issue (but this should not happen again). When the server is down, please hang on for 15-30 minutes and the server will be back up.

All my domains (patrikx3.com and corifeus.com) could have errors, since I am developing in my free time. However, it is usually stable.

**Bugs are evident™ - MATRIX️**

### Node Version Requirement 
``` 
>=10.13.0 
```  
   
### Built on Node 
``` 
v11.6.0
```   
   
The ```async``` and ```await``` keywords are required.

Install NodeJs:    
https://nodejs.org/en/download/package-manager/    



# Description  

                        
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

## Example output
```text
patrikx3@workstation ~/ramdisk/persistence/content/.p3x-ramdisk-link/Projects/patrikx3/corifeus/corifeus-builder $ grunt
Running "generate-folder" task

Running "cory-generate-tasks" task

Running "cory-ensure-protractor" task
Protractor is not on the path
Running "cory-npm" task

Running "clean:cory-build" (clean) task
>> 1 path cleaned.

Running "mocha_istanbul:cory-coverage" (mocha_istanbul) task


  async/await
    ✓ main (752ms)

  src/git
commit: 35
branch: master
date: 1495185080
repo: corifeus-builder
    ✓ branch / data / commit / repo

  src/task/json2scss
    ✓ default

  src/task/npm/exec
new name: corifeus-builder
old name: corifeus-builder
new version: 1.7.572-36
old version: 1.7.571-36
    ✓ default

  src/task/replace
    ✓ default


  5 passing (832ms)

-----------------------|----------|----------|----------|----------|----------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------------|----------|----------|----------|----------|----------------|
All files              |    52.87 |    28.26 |    31.48 |    52.48 |                |
 src                   |    29.11 |     2.78 |    33.33 |    26.67 |                |
  git.js               |      100 |       50 |      100 |      100 |             10 |
  index.js             |      100 |      100 |      100 |      100 |                |
  loader.js            |      8.2 |        0 |        0 |     8.33 |... 221,225,226 |
 src/config            |    71.43 |      100 |        0 |    71.43 |                |
  index.js             |    71.43 |      100 |        0 |    71.43 |            5,6 |
 src/config/folder     |      100 |      100 |      100 |      100 |                |
  index.js             |      100 |      100 |      100 |      100 |                |
 src/config/grunt      |      100 |      100 |      100 |      100 |                |
  index.js             |      100 |      100 |      100 |      100 |                |
 src/config/grunt/js   |       60 |      100 |        0 |       60 |                |
  index.js             |       60 |      100 |        0 |       60 |          6,101 |
 src/config/grunt/ts   |    46.15 |      100 |        0 |    46.15 |                |
  index.js             |    46.15 |      100 |        0 |    46.15 |... 24,46,48,63 |
 src/config/task       |    88.46 |       50 |      100 |    88.46 |                |
  index.js             |    88.46 |       50 |      100 |    88.46 |       46,47,50 |
 src/task              |    18.42 |        0 |        0 |    18.42 |                |
  ensure-protractor.js |    16.67 |        0 |        0 |    16.67 |... 26,28,30,31 |
  generate-tasks.js    |     12.5 |        0 |        0 |     12.5 |... 19,20,24,34 |
  index.js             |      100 |      100 |      100 |      100 |                |
  noop.js              |    33.33 |      100 |        0 |    33.33 |            2,3 |
 src/task/inject       |    22.73 |        0 |        0 |    22.73 |                |
  index.js             |       25 |        0 |        0 |       25 |   4,5,6,7,9,10 |
  inject.js            |    22.22 |        0 |        0 |    22.22 |... 47,48,49,51 |
 src/task/json2scss    |    80.49 |       75 |     62.5 |    80.49 |                |
  index.js             |       25 |        0 |        0 |       25 |  4,6,7,8,10,11 |
  json2scss.js         |    93.94 |    85.71 |      100 |    93.94 |          16,32 |
 src/task/npm          |    73.68 |       60 |       50 |    72.97 |                |
  index.js             |       25 |      100 |        0 |       25 |   4,5,6,7,8,10 |
  npm.js               |    86.67 |       60 |      100 |    86.21 |    20,21,33,41 |
 src/task/replace      |    71.05 |     62.5 |       40 |    71.05 |                |
  index.js             |       25 |        0 |        0 |       25 |  5,7,8,9,11,12 |
  replace.js           |    83.33 |    83.33 |    57.14 |    83.33 | 65,67,69,70,74 |
-----------------------|----------|----------|----------|----------|----------------|

=============================== Coverage summary ===============================
Statements   : 52.87% ( 184/348 )
Branches     : 28.26% ( 26/92 )
Functions    : 31.48% ( 17/54 )
Lines        : 52.48% ( 180/343 )
================================================================================
>> Done. Check coverage folder.

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

[**CORIFEUS-BUILDER**](https://pages.corifeus.com/corifeus-builder) Build v2018.12.28-2 

[![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software) [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) 


## P3X Sponsors

[IntelliJ - The most intelligent Java IDE](https://www.jetbrains.com)
  
[![JetBrains](https://cdn.corifeus.com/assets/svg/jetbrains-logo.svg)](https://www.jetbrains.com/) [![NoSQLBooster](https://cdn.corifeus.com/assets/png/nosqlbooster-70x70.png)](https://www.nosqlbooster.com/)

[The Smartest IDE for MongoDB](https://www.nosqlbooster.com)
  
  
 

[//]: #@corifeus-footer:end