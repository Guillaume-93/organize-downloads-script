const fs = require('fs');
const path = require('path');

// Définir le dossier des téléchargements
const downloadFolder = path.join('C:', 'Users', 'ton_utilisateur', 'Downloads');

// Définir les dossiers cibles où les fichiers triés seront déplacés
const targetFolders = {
    images: path.join(downloadFolder, 'Images'),
    videos: path.join(downloadFolder, 'Videos'),
    documents: path.join(downloadFolder, 'Documents'),
    others: path.join(downloadFolder, 'Autres')
};

// Crée les dossiers cibles s'ils n'existent pas encore
function ensureDirectories() {
    Object.values(targetFolders).forEach((folder) => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    });
}

// Identifier le type de fichier en fonction de son extension
function getFileType(file) {
    const extension = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension)) return 'images';
    if (['.mp4', '.mkv', '.avi'].includes(extension)) return 'videos';
    if (['.pdf', '.docx', '.txt', '.xlsx'].includes(extension)) return 'documents';
    return 'others';
}

// Déplacer un fichier dans le dossier correspondant
function moveFile(file) {
    const filePath = path.join(downloadFolder, file);
    const fileType = getFileType(file);
    const targetFolder = targetFolders[fileType];
    const targetPath = path.join(targetFolder, file);

    try {
        fs.renameSync(filePath, targetPath);
        console.log(`Fichier déplacé : ${file} → ${targetFolder}`);
    } catch (err) {
        console.error(`Erreur lors du déplacement du fichier ${file} :`, err);
    }
}

// Organiser tous les fichiers existants dans le dossier des téléchargements
function organizeExistingFiles() {
    console.log("Début de l'organisation des fichiers...");

    fs.readdir(downloadFolder, (err, files) => {
        if (err) {
            console.error('Erreur lors de la lecture du dossier des téléchargements :', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(downloadFolder, file);
            if (fs.lstatSync(filePath).isFile()) {
                moveFile(file);
            }
        });

        console.log("Tous les fichiers ont été organisés !");
    });
}

// Assurer que les dossiers cibles existent
ensureDirectories();

// Lancer l'organisation des fichiers
organizeExistingFiles();

/**
 * Recommandations pour utiliser ce script :
 * 
 * 1. Ce que fait le script :
 *    - Il organise les fichiers dans le dossier de téléchargements (`Downloads`) en les triant
 *      dans des sous-dossiers (`Images`, `Videos`, `Documents`, et `Autres`).
 *    - Le tri est basé sur l'extension des fichiers.
 *    - Si les dossiers cibles n'existent pas, ils sont automatiquement créés.
 * 
 * 2. Configuration :
 *    - Modifie le chemin dans `downloadFolder` pour qu'il corresponde à ton dossier de téléchargements.
 *    - Exemple : `path.join('C:', 'Users', 'mon_utilisateur', 'Downloads')`.
 * 
 * 3. Exécution :
 *    - Place ce script dans un fichier nommé `organizeDownloads.js`.
 *    - Ouvre un terminal et exécute la commande :
 *      ```
 *      node organizeDownloads.js
 *      ```
 *    - Le script affichera dans le terminal les fichiers déplacés et les éventuelles erreurs.
 * 
 * 4. Personnalisation :
 *    - Tu peux ajouter d'autres types de fichiers dans la fonction `getFileType` :
 *      Exemple pour inclure les fichiers audio :
 *      ```javascript
 *      if (['.mp3', '.wav'].includes(extension)) return 'audio';
 *      ```
 *    - Ajoute ensuite un dossier cible pour ce type dans `targetFolders` :
 *      ```javascript
 *      audio: path.join(downloadFolder, 'Audio')
 *      ```
 * 
 * 5. Créer un raccourci pour exécuter le script facilement :
 *    - Crée un fichier `.bat` pour exécuter le script avec Node.js :
 *      1. Ouvre un éditeur de texte (ex : Notepad).
 *      2. Colle le code suivant :
 *         ```
 *         @echo off
 *         node "C:\chemin\vers\votre\script\organizeDownloads.js"
 *         exit
 *         ```
 *      3. Remplace `C:\chemin\vers\votre\script\organizeDownloads.js` par le chemin exact de ton script.
 *      4. Enregistre ce fichier avec l'extension `.bat` (par exemple, `OrganizeDownloads.bat`).
 *    - Déplace le fichier `.bat` sur ton bureau.
 *    - Double-clique dessus pour exécuter le script.
 * 
 * 6. Compatibilité avec d'autres environnements :
 *    - **Windows** : Le script est conçu pour fonctionner nativement sur Windows.
 *    - **macOS/Linux** : Pour l'adapter :
 *        - Modifie le chemin de `downloadFolder` pour correspondre à ton environnement.
 *          Exemple pour macOS :
 *          ```javascript
 *          const downloadFolder = path.join('/Users', 'ton_utilisateur', 'Downloads');
 *          ```
 *        - Utilise un fichier shell script (`.sh`) au lieu de `.bat` pour lancer le script.
 *          Exemple de shell script :
 *          ```
 *          #!/bin/bash
 *          node /chemin/vers/organizeDownloads.js
 *          ```
 *        - Rends le fichier exécutable avec la commande :
 *          ```
 *          chmod +x organizeDownloads.sh
 *          ```
 *        - Double-clique dessus ou lance-le depuis le terminal.
 * 
 * 7. Attention :
 *    - Ce script ne traite que les fichiers et ignore les dossiers présents dans `Downloads`.
 *    - Si nécessaire, il peut être modifié pour gérer également les dossiers.
 * 
 * Avec ces recommandations, tu peux utiliser et personnaliser facilement ce script selon tes besoins,
 * que tu sois sous **Windows**, **macOS** ou **Linux**.
 */
