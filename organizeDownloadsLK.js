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
