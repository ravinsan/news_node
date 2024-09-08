import { Router } from "express";
import { signUp } from "../controllers/register.js";

const Route = Router();

/* User Singin*/ 
Route.post('/signup', signUp);

export default Route;