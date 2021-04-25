const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const options = require("./swagger/swagger");
dotenv.config({ path: "./config/config.env" });

connectDB();

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const subscribers = require("./routes/subscribers");

const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileupload());

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100,
});
app.use(limiter);

app.use(hpp());

app.use(cors());

// app.use(express.static(path.join(__dirname, "public")));

const specs = swaggerJSDoc(options);
app.use("/bootcamp/api/documentation", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/bootcamp/api/v1/bootcamps", bootcamps);
app.use("/bootcamp/api/v1/courses", courses);
app.use("/bootcamp/api/v1/auth", auth);
app.use("/bootcamp/api/v1/users", users);
app.use("/bootcamp/api/v1/reviews", reviews);
app.use("/bootcamp/api/v1/subscribes", subscribers);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // server.close(() => process.exit(1));
});
