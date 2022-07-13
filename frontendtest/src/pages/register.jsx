import "../styles/register.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const count = useSelector(userData);
  console.log(count);
  const dispatch = useDispatch();
const navigate=useNavigate()
  const [err, setErr] = useState("");
  const schema = yup
    .object({
      username: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      phone: yup.string().required(),
      role: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (state) => {
    console.log(state,"user")
    await fetch("http://localhost:3000/api/user/register", {
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
        // console.log(data)
        if (data.err) {
          setErr(data.err);
          // toast.error(data.err)
        } else {
          console.log(data,"user is here")
          dispatch(login(data));
          navigate('/')
          
          // toast.success('succesfully registred')
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
      <div className="login__header">Register</div>

      <form onSubmit={handleSubmit(onSubmit)} className="login__data">
        <section className="login__wrap">
          {err && <p className="error">{err}</p>}

          <div className="data__row">
            <div className="data__row__wrap">
              <label>
                Name <span className="error">*</span>
              </label>
              <input
                type={"text"}
                {...register("username", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="error">First name is required *</p>
              )}
            </div>
            <div className="data__row__wrap">
              <label>
                Email<span className="error">*</span>
              </label>
              <input
                type={"email"}
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="error">Email is required *</p>
              )}
            </div>
          </div>
        </section>

        <section className="login__wrap">
          <label>Phone</label>

          <input type={"number"} {...register("phone", { required: true })} />
          {errors.phone?.type === "required" && (
            <p className="error">Phone is required *</p>
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
        <section className="login__wrap">
          <label>Role</label>

          <select {...register("role")}>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>

          {errors.role?.type === "required" && (
            <p className="error">Password is required *</p>
          )}
        </section>
        <button type="submit">Register</button>
        <h3>Already have an Account?<Link to="/login">Login</Link></h3>

      </form>
    </div>
  );
}
