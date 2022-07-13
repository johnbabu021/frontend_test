import "../styles/register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const user = useSelector(userData);
  console.log(user);
  const navigate=useNavigate()
useEffect(()=>{
if(user?.user!==null)
navigate('/')
// else{
    // console.log('hi')
// }
},[user])
  //    const data= userData()
  //    console.log(data)
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  console.log(err);
  const schema = yup
    .object({
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (state) => {
    await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.err) {
          toast.error(data.err)
          setErr(data.err);
        } else {
          toast.success('logged In succesfully')
          dispatch(login(data));
          setErr("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(state);
  };

  return (
    <div className="login">
      <div className="login__header">Login</div>

      <form onSubmit={handleSubmit(onSubmit)} className="login__data">
        {err && <p className="error">{err}</p>}
        <section className="login__wrap">
          <label>email</label>

          <input type={"email"} {...register("email", { required: true })} />
          {errors.email?.type === "required" && (
            <p className="error">Email is required *</p>
          )}
        </section>

        <section className="login__wrap">
          <label>Password</label>

          <input
            type={"password"}
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="error">Password is required *</p>
          )}
        </section>

        <button type="submit">Login</button>
        <h3>Don't have an Account?<Link to="/register">signup</Link></h3>

      </form>
    </div>
  );
}
