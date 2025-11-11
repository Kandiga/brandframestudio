import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

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

// Endpoint for file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Endpoint to generate the storyboard
app.post('/api/generate', (req, res) => {
  // Mock marketing script (simulating Gemini)
  const script = [
    { line: "A hero embarks on a quest.", emotion: "Adventurous", intent: "Intrigue" },
    { line: "They discover a hidden treasure.", emotion: "Excitement", intent: "Reward" },
    { line: "The treasure changes their life.", emotion: "Joyful", intent: "Transformation" },
    { line: "A new adventure begins.", emotion: "Hopeful", intent: "Continuation" },
  ];

  // Mock image URLs (simulating Nano Banana)
  const frames = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCEHHuHp9Ziwj5VA48_TAtGvJrsKEB0bn7TeSmWHj_Myr1NVFNRr9_JXdDoE03IgrejTHLb5qg_tLbYZzTauZIupOWrQQ83XnsWZjyRb4BpxTdZ5QFYruuiHV_oCWMZGmBH9LaqDkqKRsPyc6s1qqLSTBN5Onj7uWrJQQ8YXyJrm4kySm6SOmxJbBeYtFZvN-iwWYi7eiY8w1SJFPTVeNdGAcelatBKbYoz3GbXnNGYSABEQ03GlNLtdhUci6pAHMnvfUhNtK2G-35H',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAK3tRPMhICw2yQRB3XyxGejG8_ooeCgQMqBBefLTvbmGVytkdFusJi7M83BCtFojR9G2EowClSQP-cnm5JAME5ocVm-bQb2yxg6IaQjpkBBPpXCDLXnjNk0emDIhGYk64ceG5G8IBsYIRqVSEEEWPPBt-pkDFsYWa5HRHBq_oLx09zrtpHVUeLVYhioAHLcVpCgf4FbU0tszLBZ3zpcoQTX2zEvc_94ikKq25WMNSO2nNx0LfusvBLTdJy2SQ252EcXGFuCrngulQP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2MdnGYj64GSyDU_wl3-kQOfe4-eCzL9v_zj4UFgb1_OaBV7R11Pg9trsQmQVsg1xa7MT-8Swmosug4gxoGl1PATdWfqzZgvIJKcksSqcT7GA6RJAbF1z8yj4z3i5uPGQUW90HtKcehTaUCAb7ljoqttFZ80wpVhfpxPEaHynqxeanPgDXORuhBFGRJyi3dVMWo5MgTJxADHt9UzWPbT0YzewgxwruWaBl4MIrovv4gmrcHK8d9P7DMyYEv1GioYqDpdAHUESy3BGI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAyILhN7sb-bYbasxUpqyIzFHOkwzWUMz_uhKM_m7rSYkdg-3cbCaXQRZiduBQedVquEhIcnxLLdvbxB--UYk-V8Vb-aoma_Y8OUxIFRDyVbfBoIofT6ucZzV9mNpKCgtRTJpwNfV0PMETAPw3PZO2WQ-WOYBlgUX6e_0I3snu98w8yBkGWNeDU-YxMf4gaYuRmAnAgrcE4R-TjuT32U2j7pTHa3_Y4m8f1KIESxeNiZF2cYtqSBiMVE0vMoL8voUpztbBXr6kazOYH',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ2jXgME6QkwH9N2eauY_Lood56JwiCZGzlw_yDRmogKCDig-UeaiIoeS2SMJiQUfjl2fkF8XV7ZjAOufVKd6oe7eVjn1Z5zx3DnndN8mWZ0yAwoYb40BK9h-a0U2sg7qSMyIQ7-mR-WgZcvVpjbDKEFoRRPGXWe5VL6x1vAO2DRCXSsKPpd1NzFRk_fW_7U2w3SQCalzz0-cm8kRc24f2u4kdqRQOfffKp-HPk2UAjaN1SYdBgCxEbmkAG3hJ-KjQDCyH5Jn3tKwW',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCpr4y0YrKplbdFkW_jylr8MBlkI4Qk5lQiYDFoPV25K1vasbqcmpC9D5LgQctupbP0laqJsonFEsGlBggjOBTRhck8pIZ48AzjTljiBGjTcVL4Jmlrz1HkDbLhghRIO9hTOOri7iTcrYHOhge5PP84515cuTS_I2Cn4iXAdKaUDdtW_yCt5KaDeDVxZpoiWpkHmKaNfMjDT1iD4WtB8DIk8Ew48t31xk0ZYPM0BCc_iyxyePAum2GaRAtd-exym3l_a75Mthdg84i5',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmqLW2DM2CdG8S60NjJ7-G154zMvLVrp0fLhp48_AvWHr5KiNOkEpabFUw_eGRv8OhpginjmNQK_pSFEAXzcZTQewC5VtvoDG_ArTE9a46y-bxfyx5Xr9tasljVnBRuOaBgMyXdS9NR3mJpHniFinJLYOSd0_55FTA5W4Svd_UT-k4_y8WWLnQTp4yFjYd4YY7Fobr95jg2ExqFA670_uMoDziIkc8PtjXet2qfgWnTMtDIn8cwrt3RpXpWxOLocQgD6T9tmqezBBi',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCTx5NlFFX-ObkTvErkLG5bpDliqdvJQLj9762G3kD7M2sVJa5HGO0yZ8SAKDzC5dPvg7H7d7AWpc5xqBLMYCsLUgfbqaEnAtQ1o2y0KMUF0jmQEFKDdTxD4UzaVhBDc_UJGNN5TFLCpvT30J_1tDAEzZ8yxzArT2JpGQGq4EFp3YjKx1yYK_Pk6jLlzfxh0Qz512LcPFRC_aW_q3NzyMrWcHVD4F2sBYi1xopTRqLWk72PaTqkP9etE6pRsZKyLXu46YCkyNOcASR5'
  ];

  res.json({ script, frames });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
