import fs from 'fs';
import path from 'path';

const rootPackagePath = path.resolve('./package.json');
const distPackagePath = path.resolve('./dist/package.json');

const data = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));

delete data.devDependencies;

const scriptDev = data.scripts.dev

data.scripts = {};

data.scripts.dev = scriptDev;

fs.writeFileSync(distPackagePath, JSON.stringify(data, null, 4));

console.log('Dist package.json creato con successo.');
