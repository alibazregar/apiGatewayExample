const express = require('express');
const app = express();
const axios = require("axios")

app.use(express.json());

app.use("/",require("./src/routes/index.js"))

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Gateway has started on port ${port}....`)
})