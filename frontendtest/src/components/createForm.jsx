import { CloseOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import InputHandler from '../hooks/inputhandler'
import { create, edit, userData } from '../redux/features/userSlice'
import '../styles/editform.css'
import toast, { Toaster } from 'react-hot-toast';

export default function CreateForm(){
    const dispatch=useDispatch()
  
    const user=useSelector(userData)
// console.log(state)
const name=InputHandler('')
const descriptionData=InputHandler('')
const priceData=InputHandler('')
const countData=InputHandler('')
const submitHandler=async()=>{
    console.log(name.value)
    await fetch(`http://localhost:3000/api/products`,{
        method:"POST",
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
            console.log('hello')
            toast.success('data inserted successfully')
            dispatch(create(false))
        }


    })
    .catch(err=>{
        toast.error('sorry data didn\'t added')
    })
//  

}


    return (
        <div    className="edit__box">
            <div    className='edit__container'>
                <div    className='close__icon' onClick={()=>{
                    // console.log('hello')
                    dispatch(create(false))}}>
                <CloseOutlined />

                </div>
            <h3>Edit Form</h3>
                <label>Name</label>
                <input {...name}  placeholder='enter the name' type={'text'} />
                <label>Description</label>
                <input {...descriptionData}  placeholder='enter the description' type={'text'} />
                <label>price</label>
                <input {...priceData}  placeholder='enter the price' type={'number'} />
                <label>count</label>
                <input  {...countData}   placeholder='enter the count' type={'number'} />
                <input onClick={submitHandler}  type="button" value={'update'}/>
            </div>
        </div>
    )
}