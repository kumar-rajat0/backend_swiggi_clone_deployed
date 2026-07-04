import { login, register } from "../controller/user.controller.js";

export function userRoute(app){
 app.post('/api/register' , register)   
 app.post('/api/login' ,login )
}