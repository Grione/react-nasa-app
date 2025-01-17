const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware');

app.use(express.json());
app.use(cors());

const DATA_FILE = 'data.json';

const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDataToFile = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.use('/api', authRoutes);

app.get('/api/data', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const dataStore = readDataFromFile();

    const userData = dataStore.filter((obj) => obj.userId === userId);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/data', authenticateToken, (req, res) => {
  try {
    const newData = req.body;
    if (!newData || typeof newData !== 'object') {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    const userId = req.user.id;
    const dataStore = readDataFromFile();

    newData.userId = userId;
    dataStore.unshift(newData);

    writeDataToFile(dataStore);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/api/data', authenticateToken, (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.user.id;

    const medias = readDataFromFile();

    const mediaIndex = medias.findIndex((media) => (media.url === url && media.userId === userId));

    if (mediaIndex === -1) {
      return res.status(404).json({ message: 'Media not found' });
    }

    medias.splice(mediaIndex, 1);

    writeDataToFile(medias);

    res.json({ message: 'Media deleted' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});