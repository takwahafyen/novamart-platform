import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le répertoire du fichier courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration de multer pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Répertoire de stockage des images
  },
  filename: (req, file, cb) => {
    // Utilisation du nom d'origine du fichier
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export { upload };
