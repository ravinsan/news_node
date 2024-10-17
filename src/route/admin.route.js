import { Router } from "express";
import { index } from "../controllers/dashboard.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { signUp, signIn, logout } from "../controllers/register.js";
import { users, usersInsert, View, usersUpdate, userDelete, statusChange } from "../controllers/UserController.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { userValidator, userUpdateValidator } from "../validation/userValidator.js";

const Route = Router();

/* User Singin*/ 
Route.post('/signup', signUp);
Route.post('/signin', signIn);

Route.get('/dashboard', AuthMiddleware, index);

/* User Management */
Route.get('/users', AuthMiddleware, users);
Route.post('/users-store', AuthMiddleware, ValidationMiddleware(userValidator), usersInsert);
Route.get('/users/:id', AuthMiddleware, View);
Route.put('/users/:id', AuthMiddleware, ValidationMiddleware(userUpdateValidator), usersUpdate);
Route.delete('/users/:id', AuthMiddleware, userDelete);
Route.get('/users/status-change/:id', AuthMiddleware, statusChange);

/* Logout */ 
Route.get('/logout', logout);

export default Route;