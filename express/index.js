const   express=require('express')
const   fs=require('fs')
const   app=express()
const   router=express.Router()


app.get('/tasks',(req,res)=>{
    res.status(200).json([
       { item:'Meet Elon'},
       {item:'Meet Mark'}
    ])
})



const   port=3000   
app.listen(port,()=>{
    console.log(`server listening to port ${port}`)
})