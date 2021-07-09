import React, { ChangeEvent, FormEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';

interface IFormState {
  name: string;
  age: Number;
  email: string;
  password: string;
  gender: "male" | "female" | "others" | null
}

function App() {

  const [formState, setFormState] = useState<IFormState>({
    name: "",
    age: 0,
    email: "",
    password: "",
    gender: null
  })

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormState>();


  const handleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //destructure property
    const {name, value} = e.target
    setFormState((prevForm) => ({
      ...prevForm,
      [name]: e.target.value
    }))
  }

  const onSubmit = (data: IFormState) => {
    console.log(data)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form-header">Register form</h3>
        <label>Name</label>
        <input type="text" {...register("name", {required: {value: true, message: "Name cannot be empty"}})} />
        {errors.name && <small className="error-message">{errors.name.message}</small>}

        <label>Age</label>
        <input type="number" {...register("age", {required: true, min: 18})} />
        {errors.age && <small className="error-message">Your age must be above 18.</small>}

        <label>Password</label>
        <input type="password"  {...register("password", {required: {value: true, message: "Password cannot be empty"}})}/>
        {errors.password && <small className="error-message">{errors.password.message}</small>}

        <label>Email</label>
        <input type="email" {...register("email", {required: {value: true, message: "Email cannot be empty."}})}/>
        {errors.email && <small className="error-message">{errors.email.message}</small>}

        <label>Gender</label>
        <select {...register("gender", {required: {value: true, message: "At least one gender should be selected."}})}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Others</option>
        </select>
        {errors.gender && <small className="error-message">{errors.gender.message}</small>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
