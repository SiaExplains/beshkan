#!/usr/bin/env node

const { execSync } = require('child_process');
const { program } = require('commander');
const path = require('path');
const fs = require('fs');

program
  .option('--name <projectName>', 'Project name')
  .parse(process.argv);

const options = program.opts();

if (!options.name) {
  console.error('❌ Please provide a project name using --name');
  process.exit(1);
}

const projectName = options.name;
const repoUrl = 'https://github.com/SiaExplains/app-template.git';

try {
  execSync(`git clone ${repoUrl} ${projectName}`, { stdio: 'inherit' });
  console.log(`✅ Project "${projectName}" created!`);

  // Remove the .git directory to unlink it from the template repo
  const gitDir = path.join(process.cwd(), projectName, '.git');
  fs.rmSync(gitDir, { recursive: true, force: true });

  console.log(`✅ Project "${projectName}" created and unlinked from Git history.`);

} catch (error) {
  console.error('❌ Error creating project:', error.message);
}
