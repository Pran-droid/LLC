import express from 'express'; // Importing express framework
import dotenv from 'dotenv'; // Importing dotenv for environment variables
import { connectDB } from './config/db.js'; // Importing database connection function
import registerRoutes from './routes/register.js'; // Importing registration routes
import courseRoutes from './routes/course.js'; // Importing course routes
import scheduleRoutes from './routes/schedule.js'; // Importing schedule routes

dotenv.config(); // Load environment variables from .env file

const app = express(); 

app.use(express.json()); 
const PORT = process.env.PORT || 5000; // Set the port to the value in .env or default to 5000

app.use('/api/register', registerRoutes);

app.use('/api/course', courseRoutes);   

app.use('/api/schedule', scheduleRoutes);   

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});