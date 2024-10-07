import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import bookingRoutes from './routes/bookings.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
    {
        origin:["https://event-manangement-frontend.vercel.app"],
        method:["POST","GET"],
        Credential:true
    }
));

// MongoDB connection
const mongoURI = 'mongodb+srv://akshitshukrawal:nUiGNtwDY8pIakae@megamind.v32mq.mongodb.net/?retryWrites=true&w=majority&appName=Megamind';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// Routes
const front = (req,res) => {
    res.json("hello world");
}
app.use('/',front);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
