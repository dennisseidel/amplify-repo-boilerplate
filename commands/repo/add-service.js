const { createFolderIfItNotExists, getTemplateFolder, runTemplate } = require('../../lib');

// context would have all the relevant amplify CLI info/metadata/helper functions that are needed by the plugins
module.exports = {
  name: 'add-service',
  run: async (context) => {
    console.log('Adding service template based on AWS lambda functions and pulumi');
    const dir = './_templates';
    createFolderIfItNotExists(dir);
    await getTemplateFolder(`${dir}/aws-function`,'https://github.com/d10l/aws-function-template.git');
    await runTemplate(`${dir}/aws-function`, ['aws-function', 'service']);
  }
}