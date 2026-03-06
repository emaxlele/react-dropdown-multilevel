import fs from 'fs/promises';
import path from 'path';

// Percorso del file package.json appena copiato
const distPackageJsonPath = path.resolve('dist/package.json');

// Funzione asincrona per modificare il package.json
async function modifyPackageJson() {
    // Leggi il file package.json
    const packageJson = JSON.parse(await fs.readFile(distPackageJsonPath, 'utf8'));

    // Rimuove le proprietà inutilia
    delete packageJson.scripts;
    delete packageJson.devDependencies;
    delete packageJson.engines;
    delete packageJson.private;

    // Modifica la versione
    packageJson.version = '1.0.0'; // Puoi aggiungere la logica per la versione

    // Scrivi il file package.json modificato
    await fs.writeFile(distPackageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}

// Esegui la funzione
modifyPackageJson().catch(() => {
    //console.error
});
