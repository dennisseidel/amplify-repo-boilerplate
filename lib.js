const fs = require('fs');
const Git = require("nodegit");
const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');

const createFolderIfItNotExists = (dir) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

const getTemplateFolder = async (pathToFolder, templateSourceUrl) => {
  if(fs.existsSync(pathToFolder)){
    await pullAndCreateFiles(pathToFolder);
  } else {
    await cloneAndCreateFiles(pathToFolder, templateSourceUrl);
  }
}

const pullAndCreateFiles = async (pathToRepo) => {
  console.log('template folder exist, check for new version.');
  const repo = await Git.Repository.open(pathToRepo); 
  await repo.fetchAll({
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
    await repo.mergeBranches("master", "origin/master");
    console.log("Checking done. Run template now.");
}


const cloneAndCreateFiles = async (pathToFolder, templateSourceUrl) => {
  try { 
    const repo = await Git.Clone(templateSourceUrl, pathToFolder);
    console.log(`cloned template into ${pathToFolder}`);
  } catch(error) {
    console.log(error);
  }
}

const runTemplate = async (dir, params) => {
  await runner(params, {
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


module.exports.createFolderIfItNotExists = createFolderIfItNotExists;
module.exports.getTemplateFolder = getTemplateFolder;
module.exports.runTemplate = runTemplate;