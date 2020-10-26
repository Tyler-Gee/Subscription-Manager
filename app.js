const express = require("express");
const app = express();
const path = require("path");
const mongoRoutes = require("./routes/mongoRoutes");


app.use("/static", express.static(path.resolve(__dirname, "public", "static")));
app.use('/img', express.static(path.resolve(__dirname, "public", "img")));

app.use(mongoRoutes);

// Send HTML at root, do not change
app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "public", "static/html/index.html"));
});

app.listen(process.argv[2], () => {
	console.log(`Running app at localhost: ${process.argv[2]}`);
});