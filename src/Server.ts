import morgan from "morgan";
import path from "path";

import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

import Logger from "jet-logger";
import {
  FakeProjectRepository,
  FileBasedDayRepository
} from "src/infrastructure";
import { ConsultantAgent } from "src/anti-corruption-layer";
import { ConsultantController, DayController } from "src/api-controllers";

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Add APIs

const dayRepository = new FileBasedDayRepository();
const consultantAgent = new ConsultantAgent();
const projectRepository = new FakeProjectRepository();

const daysCtrl = new DayController(
  dayRepository,
  consultantAgent,
  projectRepository
);
const consultantCtrl = new ConsultantController(
  consultantAgent,
  projectRepository
);

app.use("/api/days", daysCtrl.routes);
app.use("/api/consultants", consultantCtrl.routes);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message
  });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));
app.get("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: staticDir });
});

// Export express instance
export default app;
