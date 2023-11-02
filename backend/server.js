const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const connections =require("./connections")

app.use(express.json());
app.use(cors());





app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});