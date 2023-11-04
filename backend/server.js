const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const connections =require("./connections")
const router = require("./Routers/productRouters")
const userRouter = require("./Routers/userRouters")

app.use(express.json());
app.use(cors());


app.use("/",router);
app.use("/", userRouter);


app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});