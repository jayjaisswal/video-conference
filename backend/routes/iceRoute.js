// routes/iceRoute.js
const express = require("express");
const https = require("https");
const router = express.Router();

router.get("/", (req, res) => {
  const data = JSON.stringify({ format: "urls" });

  const options = {
    host: "global.xirsys.net",
    path: "/_turn/MyFirstApp",
    method: "PUT",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from("jayjaisswal:813272ae-60ce-11f0-9aa8-0242ac150003").toString("base64"),
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const request = https.request(options, (response) => {
    let result = "";
    response.on("data", (chunk) => {
      result += chunk;
    });
    response.on("end", () => {
      try {
        const parsed = JSON.parse(result);
        res.json(parsed.v.iceServers); // Send only the iceServers array
      } catch (err) {
        console.error("ICE parse error:", err);
        res.status(500).json({ error: "Failed to parse ICE servers" });
      }
    });
  });

  request.on("error", (e) => {
    console.error("ICE request error:", e);
    res.status(500).json({ error: "Failed to fetch ICE servers" });
  });

  request.write(data);
  request.end();
});

module.exports = router;
