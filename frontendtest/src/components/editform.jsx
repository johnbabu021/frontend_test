import { CloseOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import InputHandler from '../hooks/inputhandler'
import { edit, userData } from '../redux/features/userSlice'
import '../styles/editform.css'
import toast, { Toaster } from 'react-hot-toast';

export default function EditForm({_id,name:productName,description,price,count}){
    const dispatch=useDispatch()
    // console.log(data,"data")
    // console.log(productName)
    const state=useSelector(state=>state.user.editdata)
    const user=useSelector(userData)
console.log(state)
const name=InputHandler(productName)
const descriptionData=InputHandler(description)
const priceData=InputHandler(price)
const countData=InputHandler(count)
const submitHandler=async()=>{
    console.log(name.value)
    await fetch(`http://localhost:3000/api/products/${_id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${user.user.token}`
        },
        body:JSON.stringify(
            {  
               name: name.value,
               description:descriptionData.value,
               price:priceData.value,
               count: countData.value
            }
            )
    }).then((data)=>data.json())
    .then(data=>{
        if(data.err){
            toast.error(data.err)
        }
        else{
            toast.success(data)
            dispatch(edit(false))
        }


    })
    .catch(err=>{
        toast.error('sorry data didn\'t updated')
    })
//  

}


    return (
        <div    className="edit__box">
            <div    className='edit__container'>
                <div    className='close__icon' onClick={()=>{
                    // console.log('hello')
                    dispatch(edit(false))}}>
                <CloseOutlined />

                </div>
            <h3>Edit Form</h3>
                <label>Name</label>
                <input {...name} defaultValue={productName}  placeholder='enter the name' type={'text'} />
                <label>Description</label>
                <input {...descriptionData}  defaultValue={description} placeholder='enter the description' type={'text'} />
                <label>price</label>
                <input {...priceData}  defaultValue={price} placeholder='enter the price' type={'number'} />
                <label>count</label>
                <input  {...countData}  defaultValue={count} placeholder='enter the count' type={'number'} />
                <input onClick={submitHandler}  type="button" value={'update'}/>
            </div>
        </div>
    )
}