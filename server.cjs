require('dotenv').config(); // Load environment variables
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const moment = require('moment');
const axios = require('axios');

// Set up the express app
const app = express();
const PORT = 4000; // You can change the port if needed

// MongoDB URI and DB setup from environment variables
const DB_URL = process.env.MONGODB_URI;
let db, collection;

// Connect to MongoDB
MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('Weather-Info');  
    collection = db.collection('Weather');  
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

// Middleware
app.use(express.json());  // To parse JSON requests
app.use(cors({
  origin: 'http://localhost:5173'  // Allow only the frontend running on this domain
}));

// CREATE: Store weather data in MongoDB
app.post('/weather', async (req, res) => {
    console.log("Check #1")
  try {
    const { location, startDate, endDate, temperatureData } = req.body;

    // Validate date range
    const start = moment(startDate, 'YYYY-MM-DD', true);
    const end = moment(endDate, 'YYYY-MM-DD', true);

    if (!start.isValid() || !end.isValid()) {
      return res.status(400).send('Invalid date format. Use YYYY-MM-DD.');
    }

    if (end.isBefore(start)) {
      return res.status(400).send('End date cannot be before start date.');
    }

    // Create a new weather record
    const newWeatherRecord = {
      location,
      startDate,
      endDate,
      temperatureData
    };

    // Insert the new record into the collection
    const result = await collection.insertOne(newWeatherRecord);
    res.status(201).send(result);  // Respond with the result of the insert operation
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving weather data.");
  }
});

// READ: Get weather data based on location and date range
app.get('/weather', async (req, res) => {
  try {
    const { location, startDate, endDate } = req.query;

    // Validate dates
    const start = moment(startDate, 'YYYY-MM-DD', true);
    const end = moment(endDate, 'YYYY-MM-DD', true);

    if (!start.isValid() || !end.isValid()) {
      return res.status(400).send('Invalid date format. Use YYYY-MM-DD.');
    }

    const records = await collection.find({
      location,
      startDate: { $gte: start.format('YYYY-MM-DD') },
      endDate: { $lte: end.format('YYYY-MM-DD') }
    }).toArray();

    if (records.length === 0) {
      return res.status(404).send('No records found for the given location and date range.');
    }

    res.status(200).json(records);  // Respond with the records
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data.");
  }
});

// UPDATE: Update weather data (e.g., update temperature) by location and date range
app.put('/weather', async (req, res) => {
  try {
    const { location, startDate, endDate, temperatureData } = req.body;

    // Validate date range
    const start = moment(startDate, 'YYYY-MM-DD', true);
    const end = moment(endDate, 'YYYY-MM-DD', true);

    if (!start.isValid() || !end.isValid()) {
      return res.status(400).send('Invalid date format. Use YYYY-MM-DD.');
    }

    if (end.isBefore(start)) {
      return res.status(400).send('End date cannot be before start date.');
    }

    // Find and update the record
    const result = await collection.updateOne(
      { location, startDate, endDate },
      { $set: { temperatureData } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send('No record found to update.');
    }

    res.status(200).send('Weather data updated successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating weather data.");
  }
});

// DELETE: Delete weather data by location and date range
app.delete('/weather', async (req, res) => {
  try {
    const { location, startDate, endDate } = req.body;

    // Validate date range
    const start = moment(startDate, 'YYYY-MM-DD', true);
    const end = moment(endDate, 'YYYY-MM-DD', true);

    if (!start.isValid() || !end.isValid()) {
      return res.status(400).send('Invalid date format. Use YYYY-MM-DD.');
    }

    // Delete the record
    const result = await collection.deleteOne({ location, startDate, endDate });

    if (result.deletedCount === 0) {
      return res.status(404).send('No record found to delete.');
    }

    res.status(200).send('Weather data deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting weather data.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
