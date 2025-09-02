import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter
});

const uploadSingleImage = (fieldName) => {
  return upload.single(fieldName);
};

const uploadMultipleImages = (fieldName, maxCount = 5) => {
  return upload.array(fieldName, maxCount);
};

const deleteImage = async (filename) => {
  try {
    const filePath = path.join(UPLOADS_DIR, filename);
    // Check if file exists
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return { success: true, message: 'Image deleted successfully' };
    }
    return { success: false, message: 'Image not found' };
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

const getImagePath = (filename) => {
  return path.join(UPLOADS_DIR, filename);
};

const getAllImages = async () => {
  try {
    const files = await fs.promises.readdir(UPLOADS_DIR);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
  } catch (error) {
    console.error('Error getting images:', error);
    throw new Error('Failed to retrieve images');
  }
};

const uploadTwoImages = (fieldName1, fieldName2) => {
  return upload.fields([
    { name: fieldName1, maxCount: 1 },
    { name: fieldName2, maxCount: 10 }
  ]);
};
const uploadThreeImages = (fieldName1, fieldName2, fieldName3) => {
  return upload.fields([
    { name: fieldName1, maxCount: 5 },
    { name: fieldName2, maxCount: 5 },
    { name: fieldName3, maxCount: 5 }
  ]);
};
const uploadFiveImages = (fieldName1, fieldName2, fieldName3, fieldName4, fieldName5) => {
  return upload.fields([
    { name: fieldName1, maxCount: 1 },
    { name: fieldName2, maxCount: 2 },
    { name: fieldName3, maxCount: 3 },
    { name: fieldName4, maxCount: 4 },
    { name: fieldName5, maxCount: 5 }
  ]);
};

export {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
  getImagePath,
  getAllImages,
  uploadTwoImages,
  uploadThreeImages,
  uploadFiveImages
}