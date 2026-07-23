const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

const paperRoutes = require('./routes/papers');
app.use('/papers', paperRoutes);

const authorRoutes = require('./routes/authors');
app.use('/authors', authorRoutes);

const institutionRoutes = require('./routes/institutions');
app.use('/institutions', institutionRoutes);