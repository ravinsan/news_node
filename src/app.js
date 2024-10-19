import express from "express";
import admin from "./route/admin.route.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { i18n, i18nPromise } from './i18n.js';
import cors from "cors";

const app = express();

const defaultLanguage = 'en';  // Default language

// i18n to initialize
i18nPromise.then(() => {
  // Middleware to change the language based on request parameters
  app.use((req, res, next) => {
    const lang = req.query.lang || (req.cookies && req.cookies.lang) || defaultLanguage; // Check query param, cookie, or use default
    i18n.changeLanguage(lang)
      .then(() => {
        // Log the greeting after changing the language
        const greeting = i18n.t('greeting'); 
        console.log(greeting); 
        next();
      })
      .catch(() => {
        next(); 
      });
  });

  // Middleware
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow cookies to be sent
  }));

  app.use('/api/v1', admin);

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
});

export default app;
