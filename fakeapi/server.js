const express = require('express');
const app = express();
const axios = require('axios')
const PORT = 3001
const HOST = 'localhost'

app.use(express.json());

app.get("/fakeapi",(req,res)=>{
  res.send("hello from fake api server")
})
app.post("/bgapi",(req,res)=>{
  res.send("bibibibibib")
})

app.listen(PORT,async ()=>{
  const response = await axios({
      method: "POST",
      url: "http://localhost:3000/register", 
      headers: {"content-type": "application/json"},
      data: {
        apiName : "registryTest",
        protocol : "http",
        host: HOST,
        port:PORT,
        url:HOST + ":" + PORT +"/"
      }
    })
    console.log(response.data)
    console.log("fake server started on port " + PORT)
})