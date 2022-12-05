const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080 ;
const dbconnect = require("./config/db");

const userRouter = require("./controllers/user/user.router");
const imageRouter = require("./controllers/images/images.router");


const app = express();

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000/users/login",
    "http://localhost:3000/users/signup",
    "http://localhost:3000/files",
    "http://localhost:3000/home",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://104.142.122.231",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use('/public', express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);




app.use("/users", cors(corsOptions), userRouter);
app.use("/files", cors(corsOptions), imageRouter);

app.listen(PORT, async () => {
  try {
    dbconnect();
    console.log(`listening on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
