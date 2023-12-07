import app from "./app.js";
import {connectDB} from "./db.js";
import sendEmail from "./helper/sendemail.js"



connectDB();
app.listen(3000);
console.log('server on port', 3000);