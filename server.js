const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB URI
const mongoURI = 'mongodb+srv://karthikeyan:karthi@cluster0.rif7wdq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const batterySchema = new mongoose.Schema({
  deviceId: String,
  batteryLevel: Number,
  charging: Boolean,
  timestamp: Date,
});

const BatteryData = mongoose.model('BatteryData', batterySchema);

app.use(bodyParser.json());

app.post('/saveBatteryData', async (req, res) => {
  const { deviceId, batteryLevel, charging, timestamp } = req.body;
  const newBatteryData = new BatteryData({
    deviceId,
    batteryLevel,
    charging,
    timestamp,
  });
  try {
    await newBatteryData.save();
    res.status(200).send('Battery data saved!');
  } catch (error) {
    res.status(500).send('Error saving battery data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
