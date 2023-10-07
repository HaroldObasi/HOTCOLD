import express from "express";
const app = express();
const PORT = 5000;
app.get("/", (req, res) => {
    res.send("hello from server");
});
app.listen(PORT, () => {
    console.log("Listening on port 5000");
});
//# sourceMappingURL=index.js.map