const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const User = require('./user');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Enable CORS
app.use(cors());
app.use(express.json());

// Route to handle storing user data along with image upload
app.post('/api/register', upload.single('file'), async (req, res) => {
  try {
    let imageUrl;
    
    if (req.file) {
      const base64String = req.file.buffer.toString('base64');
      // Upload base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64String}`);
      imageUrl = result.secure_url;
    }

    // Create new user
    const newUser = new User({ 
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      profession: req.body.profession,
      email: req.body.email,
      mobile: req.body.mobile,
      handset: req.body.handset,
      city: req.body.city,
      attraction: req.body.attraction,
      usedVivoBefore: req.body.usedVivoBefore,
      cameraModulePreference: req.body.cameraModulePreference,
      favoriteFeatureV30e: req.body.favoriteFeatureV30e,
      portraitExperience: req.body.portraitExperience,
      standoutFeature: req.body.standoutFeature,
      attractFeature:req.body.attractFeature,
      imageUrl: imageUrl
    });

    // Save user to MongoDB
    await newUser.save();

    res.status(201).json({ message: 'Data stored successfully' });
  } catch (error) {
    console.error('Error storing user data:', error);
    res.status(500).json({ error: 'Error storing user data' });
  }
});


// Route to fetch all user data
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
