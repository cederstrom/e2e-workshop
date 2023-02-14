import "./env-config";
import app from "./Server";
import Logger from "jet-logger";

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  Logger.info("Express server started on port: " + port);
});
