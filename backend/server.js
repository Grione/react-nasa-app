const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

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

app.get('/api/data', (req, res) => {
  try {
    const dataStore = readDataFromFile();
    res.json(dataStore);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/data', (req, res) => {
  try {
    const newData = req.body;
    if (!newData || typeof newData !== 'object') {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    const dataStore = readDataFromFile();
    dataStore.push(newData);
    writeDataToFile(dataStore);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});