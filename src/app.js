import express from "express";
import admin from "./route/admin.route.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

//app.use(cors('*'));
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow cookies to be sent
}));

app.use('/api/v1', admin);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;
