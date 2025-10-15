// FileIncluded
import express from "express";
import contactsroute from "./routes/contact.routes.js";
import conectDB from "./config/contactdb.js";
const PORT = process.env.PORT;
const app = express();
// Database Connection
conectDB();
// middelware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.use(contactsroute);
//Server
app.listen(PORT, () => {
  console.log(`Server is Listing on ${PORT}`);
});
