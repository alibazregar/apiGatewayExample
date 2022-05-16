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
  


  if(apiAlreadyExists(registrationInfo)){
    res.send(`configuration Already exists for ${registrationInfo} at ${registrationInfo.host}`)
  }else{
     registrationInfo.url = registrationInfo.protocol + "://" + registrationInfo.host + ":" + registrationInfo.port + "/"

     registry.services[registrationInfo.apiName].push({...registrationInfo})
  
     fs.writeFile("./registry.json", JSON.stringify(registry),error=>{
       if(error){
         res.send(`could not register ${registrationInfo.apiName}
         ${error}`);
        }else{
          res.send(`successfully registered ${registrationInfo.apiName}`)
        }
      })  
  }
 
  
})

router.post('unregister',(req, res)=>{
  const registrationInfo = req.body
  if(apiAlreadyExists(registrationInfo)){
    const index = registry.services[registrationInfo.apiName].findIndex(instance=>{
      return registrationInfo.url === instance.url
    })
    registry.services[registrationInfo.apiName].splice(index,1)
    fs.writeFile("./registry.json", JSON.stringify(registry),error=>{
      if(error){
        res.send(`could not register ${registrationInfo.apiName}
        ${error}`);
       }else{
         res.send(`successfully registered ${registrationInfo.apiName}`)
       }
     })  
    

  }else{
      res.send(`configuration does not exist for ${registrationInfo.apiName} at: ${registrationInfo.url} ` );
  }
  const apiAlreadyExists = (registrationInfo)=>{
    let exists =false
    registry.services[registrationInfo.apiName].forEach((instance)=>{
      if(instance.url = registrationInfo.url){
        exists = true
        return 
      }
      return exists
    })
  }
})

module.exports = router;