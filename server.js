const path = require("path");
const os = require("os");
const express = require("express");

const app = express();
const port =
  Number(process.env.PORT) ||
  Number(process.env.OPENSHIFT_NODEJS_PORT) ||
  8080;
const host =
  process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/ping", (_req, res) => {
  res.json({
    ok: true,
    message: "pong",
    host: os.hostname(),
    time: new Date().toISOString(),
  });
});

app.get("/api/info", (_req, res) => {
  res.json({
    app: "OpenShift Node.js Demo",
    version: process.env.APP_VERSION || "1.0.0",
    host: os.hostname(),
    platform: process.platform,
    node: process.version,
    uptimeSeconds: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString(),
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, host, () => {
  console.log(`Server ready on http://${host}:${port}`);
});
