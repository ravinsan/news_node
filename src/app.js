import express from "express";
import admin from "./route/admin.route.js";
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/v1', admin);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;
