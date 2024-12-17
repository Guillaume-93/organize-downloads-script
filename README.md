# 📁 Script d'Organisation des Téléchargements

## Description
Ce script Node.js organise les fichiers présents dans le dossier des téléchargements (`Downloads`) en les classant automatiquement dans des sous-dossiers spécifiques selon leur type :
- `Images`
- `Videos`
- `Documents`
- `Autres`

---

## Fonctionnement

1. **Tri des fichiers** :
   - Le tri est basé sur les extensions des fichiers.
   - Les types pris en compte par défaut :
     - **Images** : `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
     - **Vidéos** : `.mp4`, `.mkv`, `.avi`
     - **Documents** : `.pdf`, `.docx`, `.txt`, `.xlsx`
     - Les fichiers inconnus vont dans le dossier `Autres`.

2. **Création des dossiers cibles** :
   - Si les dossiers `Images`, `Videos`, `Documents` ou `Autres` n'existent pas, ils sont automatiquement créés.

3. **Déplacement des fichiers** :
   - Chaque fichier est déplacé vers son dossier correspondant.

---

## Prérequis

- **Node.js** doit être installé sur votre machine.
- Assurez-vous d'avoir accès au dossier `Downloads`.

---

## Installation

1. **Téléchargez** le script et sauvegardez-le sous le nom `organizeDownloads.js`.
2. **Modifiez le chemin** du dossier des téléchargements dans le script :
   ```javascript
   const downloadFolder = path.join('C:', 'Users', 'ton_utilisateur', 'Downloads');
   ```
   Remplacez `ton_utilisateur` par votre nom d'utilisateur Windows.

---

## Utilisation

### Exécution via Terminal

1. Placez-vous dans le dossier contenant le script.
2. Lancez la commande suivante dans le terminal :
   ```bash
   node organizeDownloads.js
   ```

3. Le script affichera :
   - Les fichiers déplacés et leur destination.
   - Les éventuelles erreurs.

---

## Personnalisation

### Ajouter de nouveaux types de fichiers

1. Dans la fonction `getFileType`, ajoutez les extensions que vous souhaitez prendre en compte :
   ```javascript
   if (['.mp3', '.wav'].includes(extension)) return 'audio';
   ```

2. Ajoutez un dossier cible pour ce type dans `targetFolders` :
   ```javascript
   audio: path.join(downloadFolder, 'Audio')
   ```

### Exemple : Ajouter un dossier pour les fichiers audio

```javascript
const targetFolders = {
    images: path.join(downloadFolder, 'Images'),
    videos: path.join(downloadFolder, 'Videos'),
    documents: path.join(downloadFolder, 'Documents'),
    audio: path.join(downloadFolder, 'Audio'),
    others: path.join(downloadFolder, 'Autres')
};
```

---

## Automatisation avec un fichier `.bat` (Windows)

Créez un fichier `.bat` pour lancer le script avec un double-clic :

1. Ouvrez un éditeur de texte comme **Notepad**.
2. Collez le code suivant :
   ```bat
   @echo off
   node "C:\chemin\vers\organizeDownloads.js"
   exit
   ```
3. Enregistrez le fichier sous `OrganizeDownloads.bat`.
4. Double-cliquez sur le fichier `.bat` pour exécuter le script.

---

## Adaptation pour macOS/Linux

1. Modifiez le chemin des téléchargements dans le script :
   ```javascript
   const downloadFolder = path.join('/Users', 'ton_utilisateur', 'Downloads');
   ```
2. Créez un fichier `.sh` pour exécuter le script :
   ```bash
   #!/bin/bash
   node /chemin/vers/organizeDownloads.js
   ```
3. Rendez le script exécutable :
   ```bash
   chmod +x organizeDownloads.sh
   ```
4. Lancez-le avec :
   ```bash
   ./organizeDownloads.sh
   ```

---

## Exemple de Structure après Organisation

Après exécution, la structure du dossier des téléchargements sera organisée comme suit :

```
Downloads/
│-- Images/
│   └── photo.jpg
│-- Videos/
│   └── video.mp4
│-- Documents/
│   └── rapport.pdf
│-- Autres/
│   └── fichier_inconnu.xyz
```

---

## Compatibilité

- **Windows** : Natif.
- **macOS/Linux** : Adaptation mineure requise (voir la section dédiée).

