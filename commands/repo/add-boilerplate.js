const Git = require("nodegit");
const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const fs = require('fs');

// context would have all the relevant amplify CLI info/metadata/helper functions that are needed by the plugins
module.exports = {
  name: 'add-boilerplate',
  run: async (context) => {
    console.log('Adding Amplify repo boilerplate');
    // https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await 
    const dir = './_templates';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    fs.stat(`${dir}/new-project`, function(err) {
      if (!err) {
          console.log('template folder exist, check for new version.');
          const pathToRepo = require("path").resolve(`${dir}/new-project`);
          Git.Repository.open(pathToRepo).then(function (repo) {
            return repo.fetchAll({
              callbacks: {
                credentials: function(url, userName) {
                  return Git.Cred.sshKeyFromAgent(userName);
                },
                certificateCheck: function() {
                  return 0;
                }
              }
            })
            // Now that we're finished fetching, go ahead and merge our local branch
            // with the new one
            .then(function() {
              return repo.mergeBranches("master", "origin/master");
            })
            .done(function() {
              console.log("Checking done. Run template now.");
              runTemplate(dir)
            });
          });
        }
      else if (err.code === 'ENOENT') {
        Git.Clone("https://github.com/d10l/new-project.git", `${dir}/new-project`)
        .then(function() {
          console.log(`cloned template into ${dir}/new-template`);
          runTemplate(dir)
          
        }).catch(function(error) {
          console.log(error)
        })
      }
  });
  }
}


const runTemplate = (dir) => {
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
}




