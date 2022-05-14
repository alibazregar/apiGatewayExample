const express = require('express');
const router = express.Router()
const axios = require('axios')
const registry = require('./../../registry.json')
const fs = require('fs')

router.all("/:apiName/:path",async(req,res)=>{
  try {
    console.log(req.params.apiName)
    if(!registry.services[req.params.apiName]){
      return res.status(404).send("route not found")
    }
  
    const response = await axios({
      method: req.method,
      url: registry.services[req.params.apiName].url+req.params.path,
      headers : req.headers,
      data:req.body,
    })
    res.send(response.data)
  
    
  
  }catch(error){
    console.log(error)  
  }
})

router.post("/register", async (req,res)=>{
  
  const registrationInfo = req.body
  registrationInfo.url = registrationInfo.protocol + "://" + registrationInfo.host + ":" + registrationInfo.port + "/"

  registry.services[registrationInfo.apiName] = {...registrationInfo}
  
  fs.writeFile("./registry.json", JSON.stringify(registry),error=>{
    if(error){
      res.send(`could not register ${registrationInfo.apiName}
      ${error}`);
    }else{
      res.send(`successfully registered ${registrationInfo.apiName}`)
    }
  })  
  
})

module.exports = router;