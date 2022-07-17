const express=require('express');
const cors=require('cors')
const axios=require('axios')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
    fetch(...args));

const app=express();
app.use(cors())
const PORT=5000
app.get('/products/:searchTerm/:count/:pageperItem',async(req,res)=>{
try{
    const apiResponse=await fetch(
       `https://www.blibli.com/backend/search/products?searchTerm=${req.params.searchTerm}&start=${req.params.count}&itemPerPage=${req.params.pageperItem}`
    )
    const apiresponseJSON=await apiResponse.json()
    res.send(apiresponseJSON)
} catch(err){
    console.log(err)
    res.status(500).send('Something went wrong')
}
})
app.get('/image/:url',async(req,res)=>{
    try{
        const apiResponse=await axios.get(
            decodeURIComponent(req.params.url)
       ,{responseType:'arraybuffer'} )
       let returnedb64=Buffer.from(apiResponse.data).toString('base64')
       res.send(returnedb64)
    
   
    } catch(err){
        console.log(err)
        res.status(500).send('Something went wrong')
    }
})

app.listen(PORT,()=>console.log('server running on Port',PORT))