const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");


// Import Modules
const connectDB = require("./config/db.js");

// Routes
// const userRoutes = require("./routes/userRoutes");
// const activityRoute = require("./routes/activityRoute.js");
// const botActivityRoute = require("./routes/botActivityRoute.js");
// const botSessionRoute = require("./routes/sessionRoute.js");
// const licenseRoute = require("./routes/licenseRoute.js");
const router = require("./routes/auth.route.js");
const walletRoutes=require('./routes/walletRoutes.js')
const history =require('./routes/hostory.js')
const productRoutes=require('./routes/Product.js')
dotenv.config();
const app = express();
app.use(cookieParser());

// cors options
const corsOptions = {
  origin: "*",
  "Access-Control-Allow-Origin": "*",
  credentials: true,
  optionSuccessStatus: 200,
};

connectDB().then(() => {
  // require("./jobs/cron/fundsToMasterWallet(ethereum).js");
  // require("./jobs/cron/fundsToMasterWallet(binance).js");
  // require("./jobs/cron/fundsToMasterWallet(arbitrum).js");
});
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// app.use("/api/users", userRoutes);
// app.use("/api/activity", activityRoute);
// app.use("/api/bot-activity", botActivityRoute);
// app.use("/api/bot-session", botSessionRoute);
// app.use("/api/license", licenseRoute);
app.use(router);
app.use(walletRoutes)
app.use(history);
app.use( productRoutes);
app.use('/uploads', express.static('uploads'));




const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT}`)
);

// // Schedule cron jobs
// const scheduleCronJob = (scriptPath, cronSchedule) => {
//   cron.schedule(cronSchedule, () => {
//     const cronJobProcess = spawn("node", [
//       "--max-old-space-size=4096",
//       scriptPath,
//     ]);

//     cronJobProcess.stdout.on("data", (data) => {
//       console.log(`Cron job output: ${data}`);
//     });

//     cronJobProcess.stderr.on("data", (data) => {
//       console.error(`Cron job error: ${data}`);
//     });

//     cronJobProcess.on("close", (code) => {
//       console.log(`Cron job process exited with code ${code}`);
//     });
//   });
// };

// connectDB()
//   .then(
//     scheduleCronJob(
//       "./jobs/cron/fundsToMasterWallet(ethereum).js",
//       "*/30 * * * * *"
//     )
//     // scheduleCronJob(
//     //   "./jobs/cron/fundsToMasterWallet(binance).js",
//     //   "*/30 * * * * *"
//     // )
//     // scheduleCronJob(
//     //   "./jobs/cron/fundsToMasterWallet(arbitrum).js",
//     //   "*/30 * * * * *"
//     // )
//   )
//   .catch((error) => {
//     console.log(error);
//     console.log("Database connection error");
//     process.exit(1);
//   });
