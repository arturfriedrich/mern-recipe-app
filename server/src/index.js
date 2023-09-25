import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

// Allow server to accept json
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => { console.log(`Server running on port: ${port}`) });
}).catch((error) => {
    console.log(error.message);
});

