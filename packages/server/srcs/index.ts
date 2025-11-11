import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import axios from 'axios';

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Proxy endpoint to fetch images
app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (typeof url !== 'string') {
    return res.status(400).send('Invalid URL');
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching image');
  }
});

// Endpoint to generate the storyboard
app.post('/api/generate', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'character', maxCount: 1 }]), (req, res) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const logoUrl = files['logo'] ? `${req.protocol}://${req.get('host')}/uploads/${files['logo'][0].filename}` : null;
  const characterUrl = files['character'] ? `${req.protocol}://${req.get('host')}/uploads/${files['character'][0].filename}` : null;
  const { story } = req.body;

  // Mock marketing script (simulating Gemini)
  const script = story.split('.').map((line: string, index: number) => {
    const emotions = ['Adventurous', 'Excitement', 'Joyful', 'Hopeful'];
    const intents = ['Intrigue', 'Reward', 'Transformation', 'Continuation'];
    return {
      line: line.trim(),
      emotion: emotions[index % emotions.length],
      intent: intents[index % intents.length],
    };
  }).filter((s: { line: string; }) => s.line.length > 0);

  // Mock image URLs (simulating Nano Banana)
  const frames = Array.from({ length: 8 }, (_, i) => {
    if (i === 0 && logoUrl) return logoUrl;
    if (i === 1 && characterUrl) return characterUrl;
    // Generate some placeholder images
    return `https://picsum.photos/seed/${story.length + i}/400/300`;
  });

  res.json({ script, frames });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
