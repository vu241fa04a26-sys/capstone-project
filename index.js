const express = require("express");
const path = require("path");
const { connectDB, mongoose } = require("./src/db");

const app = express();

const routeTasks = require("./src/routes/tasks");

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

app.get("/api/health", (req, res) => {
  const database =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(database === "connected" ? 200 : 503).json({ database });
});

app.use("/api/tasks", routeTasks);
app.use("/api", (req, res) =>
  res.status(404).json({ error: "API route not found." }),
);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body must be valid JSON." });
  }

  console.error(err);
  res.status(500).json({ error: "An unexpected server error occurred." });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Connected to MongoDB; listening on ${port}`),
    );
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exitCode = 1;
  }
}

startServer();
