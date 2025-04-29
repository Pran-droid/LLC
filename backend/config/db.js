import mongoose from 'mongoose';

// Using hardcoded MongoDB connection string (not recommended for production)
// export const connectDB = async () => {
//     const mongoURI = 'mongodb://127.0.0.1:27017/llcdb'; 
//     mongoose.connect(mongoURI).then(() => {
//     console.log('MongoDB connected successfully');
//     }).catch((err) => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit process with failure
//     }
//     );
// }

Using hardcoded MongoDB connection string (not recommended for production)
export const connectDB = async ()=> {
    try {
        const MONGO_URI = 'mongodb://127.0.0.1:27017/llcdb'; // Replace with your MongoDB connection string
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

//Using .env file for MongoDB connection string
// export const connectDB = async ()=> {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI); // Use the environment variable for MongoDB URI
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// }
