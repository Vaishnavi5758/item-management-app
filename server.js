require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize= require('./config/database');
//const {Item,ItemType} = require('./models')
//const db = require('./config/db'); // Import database connection
const itemRoutes = require( './routes/itemRoutes');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/items',itemRoutes);


console.log('itemRoutes: ',itemRoutes);


sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Database synced successfully!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });