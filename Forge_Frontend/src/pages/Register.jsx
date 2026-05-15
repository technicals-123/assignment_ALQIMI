import React from "react";
import { useForm } from "react-hook-form";
import "../css/register.css";
import API from "../api/variableapi";
import image from "../images/image.jpg";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  
  const onSubmit = async (data) => {
     
  const { confirmPassword, ...payload } = data;

  console.log("FINAL PAYLOAD:", payload); 
     
    try {
      await API.post("/register", data);
      alert("Registration successful");
     
  
    } catch (err) {
       console.log("FULL ERROR:", err);
       console.log("RESPONSE DATA:", err.response?.data);
      alert(err.response?.data || "Error occurred");

    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit(onSubmit)}>

        <div className="logo-container">
          <img src={image} alt="logo" className="logo" />
        </div>

        <div className="grid">

          {/* Email */}
          <div className="form-field">
            <label>Email Address*</label>
            <input
              placeholder="Email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email"
                }
              })}
            />
            <p className="error">{errors.email?.message}</p>
          </div>

          {/* First Name */}
          <div className="form-field">
            <label>First Name*</label>
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: "First name required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets allowed"
                }
              })}
            />
            <p className="error">{errors.firstName?.message}</p>
          </div>

          {/* Password */}
          <div className="form-field">
            <label>Password*</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                  message:
                    "Minimum password length 6 , 1 uppercase, 1 number, 1 special char[@$!%*?&]"
                }
              })}
            />
            <p className="error">{errors.password?.message}</p>
          </div>

          {/* Last Name */}
          <div className="form-field">
            <label>Last Name*</label>
            <input
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets allowed"
                }
              })}
            />
            <p className="error">{errors.lastName?.message}</p>
          </div>

          {/* Confirm Password */}
          <div className="form-field">
            <label>Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match"
              })}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>

          {/* Organization */}
          <div className="form-field">
            <label>Organization*</label>
            <input
              placeholder="Organization"
              {...register("organization", {
                required: "Organization required"
              })}
            />
            <p className="error">{errors.organization?.message}</p>
          </div>

          {/* Phone */}
          <div className="form-field">
            <label>Phone Number*</label>
            <input
              placeholder="Phone Number with country code"
              {...register("phoneNumber", {
                required: "Phone number required",
                pattern: {
                  value: /^\+\d{10,15}$/,
                  message: "Format: +1234567890"
                }
              })}
            />
            <p className="error">{errors.phoneNumber?.message}</p>
          </div>

          {/* Position */}
          <div className="form-field">
            <label>Position</label>
            <input
              placeholder="Position"
              {...register("position", {
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Only alphabets allowed"
                }
              })}
            />
            <p className="error">{errors.position?.message}</p>
          </div>

        </div>

        <button type="submit">Submit</button>

      </form>
    </div>
  );
}