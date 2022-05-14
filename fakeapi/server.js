const express = require('express');
const app = express();
const axios = require('axios')
const port = 3001

app.use(express.json());

app.get("/fakeapi",(req,res)=>{
  res.send("hello from fake api server")
})
app.post("/bgapi",(req,res)=>{
  res.send("bibibibibib")
})

app.listen(port,async ()=>{
  const response = await axios({
      method: "POST",
      url: "http://localhost:3000/register", 
      headers: {"content-type": "application/json"},
      data: {
        apiName : "registryTest",
        host: "http://localhost:",
        port:"3001",
        url:"http://localhost:3001/"
      }
    })
    console.log(response.data)
    console.log("fake server started on port " + port)
})