window.addEventListener('DOMContentLoaded',async()=>{
 const  taskParent=document.querySelector('.task-list')
 const  p=document.createElement('p')
 const  headers=new Headers()
headers.append('GET', 'POST', 'OPTIONS');
 const  data=await  fetch('http://localhost:3000/tasks',
 {
     headers    
    })
 .then((res)=>res.text())
 .then((res)=>console.log(res))
//  console.log(data)
 
})