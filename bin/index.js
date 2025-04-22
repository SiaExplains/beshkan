#!/usr/bin/env node

const { execSync } = require('child_process');
const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

program
  .option('--name <projectName>', 'Project name')
  .option('--default', 'set all default values', false)
  .parse(process.argv);

const options = program.opts();

if (!options.name) {
  console.error('❌ Please provide a project name using --name');
  process.exit(1);
}

const projectName = options.name;
const repoUrl = 'https://github.com/SiaExplains/app-template.git';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

(async () => {
  try {
    // Ask for title and description
    let arg_title = 'Beshkan Webapp';
    let arg_description = 'Beshkan Webapp is a web application for Beshkan project.';
    if(!options.default) {
      arg_title =  await askQuestion('Enter the title for your project: ');
      arg_description =  await askQuestion('Enter the description for your project: ');

    }

    rl.close();

    // ----- Clone the repository -----
    execSync(`git clone ${repoUrl} ${projectName}`, { stdio: 'inherit' });
    console.log(`✅ Project "${projectName}" created!`);

    // ----- Remove .git directory -----
    const gitDir = path.join(process.cwd(), projectName, '.git');
    fs.rmSync(gitDir, { recursive: true, force: true });

    // ----- Replace dynamic parameters -----
    const layoutFilePath = path.join(process.cwd(), projectName, 'frontend', 'app', 'layout.tsx');
    const replaceParam = (param, value, filePath) => {
      if (fs.existsSync(filePath)) {
        let fileContent = fs.readFileSync(filePath, 'utf8');
        const regex = new RegExp(param, 'g');
        fileContent = fileContent.replace(regex, value);
        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`✅ Replaced "${param}" with "${value}" in ${filePath}.`);
      } else {
        console.warn(`⚠️ File ${filePath} does not exist. Skipping replacement.`);
      }
    };

    const packJsonFilePath = path.join(process.cwd(), projectName, 'frontend', 'package.json');

    replaceParam('<<<APP_NAME>>>', arg_title, layoutFilePath);
    replaceParam('<<<APP_DESCRIPTION>>>', arg_description, layoutFilePath);
    replaceParam('<<<APP_NAME>>>', arg_title, packJsonFilePath);
    replaceParam('<<<APP_DESCRIPTION>>>', arg_description, packJsonFilePath);

    console.log(`✅ Project "${projectName}" created and unlinked from Git history.`);
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    rl.close();
  }
})();
