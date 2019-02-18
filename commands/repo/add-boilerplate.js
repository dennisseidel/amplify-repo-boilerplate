// context would have all the relevant amplify CLI info/metadata/helper functions that are needed by the plugins
module.exports = {
  name: 'add-boilerplate',
  run: async (context) => {
    console.log('Adding Amplify repo boilerplate');
    // https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await 
    var dir = './_templates';
    var fs = require('fs');
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    var Git = require("nodegit");
    const { runner } = require('hygen')
      const Logger = require('hygen/lib/logger')
      const path = require('path')
      //const defaultTemplates = path.join(__dirname, '_templates')
      
      runner(['new-project', 'new'], {
        templates: dir,
        cwd: process.cwd(),
        logger: new Logger(console.log.bind(console)),
        createPrompter: () => require('enquirer'),
        exec: (action, body) => {
          const opts = body && body.length > 0 ? { input: body } : {}
          return require('execa').shell(action, opts)
        },
        debug: !!process.env.DEBUG
    })
    // Git.Clone("https://github.com/d10l/new-project.git", `${dir}/new-projects`)
    // .then(function() {
    //   console.log(`cloned template into ${dir}/new-template`)
    // })

  }
}




