const db = require("./appMongoose");
const cors = require("cors");
const userRoute = require("./routes/user-routes");
const bookRoute = require("./routes/book-routes");
const bookIssueRoute = require("./routes/book-issue-route");

const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/user",userRoute);
app.use("/book",bookRoute);
app.use("/book-issue",bookIssueRoute);



app.listen(PORT, () => {
    console.log(`Backend is Running on Port : ${PORT}.`);
});

