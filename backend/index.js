import express, { response } from "express";
import { PORT , MONGO_URL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json()); //midsleware for parsing request body

//middleware for handling cors
app.use(cors());

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("helo");
});

app.use('/books', booksRoutes);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {   //run express only if database connection is successful
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });