'use client'
import React, { useEffect, useState } from 'react'
import { MenuItem, Select, InputLabel, Paper, TextField, FormControl, Button, Typography, Box } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
export default function Register() {
  const [isLoading,setIsloading] = useState(false)
  const [isError,setIsError] = useState(null)
  const navigate = useRouter()
  useEffect(() => {
    if(localStorage.getItem("token")){
      redirect('/')
    }
  }, []);
  const onSubmit = (values:{name:string,email:string,password:string,rePassword:string,dateOfBirth:string,gender:string})=>{
    setIsloading(true)
    setIsError(null)
    return axios.post('https://linked-posts.routemisr.com/users/signup',values)
      .then(()=>{
        setIsloading(false)
        navigate.push('/login')
      })
      .catch((err)=>{
        setIsloading(false)
        setIsError(err.response.data.error)
        setTimeout(()=>setIsError(null),5000)
      })
  }
  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      dateOfBirth:'',
      gender:''
    },
    onSubmit,
    validationSchema:yup.object().shape({
      name:yup
        .string()
        .required("Name required")
        .min(3, "Minimum name length is 3 characters")
        .max(15, "Maxmum name length is 15 characters"),
      email: yup
        .string()
        .required("Email required")
        .email("Invalid email"),
      password: yup
        .string()
        .required("Password required")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password should contain at least 8 Characters => 1 capital letter, 1 small letter, 1 digit and 1 special character"),
      rePassword: yup
        .string()
        .required("Repassword required")
        .oneOf([yup.ref("password")], "Repassword should match password"),
      dateOfBirth:yup
        .string()
        .required("Date required"),
      gender:yup
        .string()
        .required("Gender required")
    })
  })
  return (
    <div className="w-[60%] mx-auto mt-28">
      {isError&&(
        <Box sx={{textAlign:'center',mb:'10px'}}>
          <Typography color='error'>{isError}</Typography>
        </Box>
      )}
      <Paper variant="elevation" square={false} elevation={1} sx={{ p: '30px', backgroundColor: '#252728',boxShadow:'2px 2px 8px #252728,-2px -2px 8px #252728' }}>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5 text-white '>
          <TextField id="name" name='name' value={formik.values.name} onChange={formik.handleChange} label="Name..." variant="outlined" placeholder='Name' type='text' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          {formik.errors.name&&formik.touched.name&&(<Typography color='error'>{formik.errors.name}</Typography>)}
          <TextField id="email" name='email' value={formik.values.email} onChange={formik.handleChange} label="Email..." variant="outlined" placeholder='Email' type='email' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          {formik.errors.email&&formik.touched.email&&(<Typography color='error'>{formik.errors.email}</Typography>)}
          <TextField id="password" name='password' value={formik.values.password} onChange={formik.handleChange} label="Password..." variant="outlined" placeholder='Password' type='password' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          {formik.errors.password&&formik.touched.password&&(<Typography color='error'>{formik.errors.password}</Typography>)}
          <TextField id="rePassword" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} label="RePassword..." variant="outlined" placeholder='RePassword' type='password' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          {formik.errors.rePassword&&formik.touched.rePassword&&(<Typography color='error'>{formik.errors.rePassword}</Typography>)}
          <TextField id="dateOfBirth" name='dateOfBirth' value={formik.values.dateOfBirth} onChange={formik.handleChange} variant="outlined" type='date' fullWidth sx={{ input: { color: 'white' } }} InputLabelProps={{ className: '!text-white' }} />
          {formik.errors.dateOfBirth&&formik.touched.dateOfBirth&&(<Typography color='error'>{formik.errors.dateOfBirth}</Typography>)}
          <FormControl fullWidth >
            <InputLabel id="genderlabel" sx={{color:'white'}}>Gender</InputLabel>
            <Select
              labelId="genderlabel"
              id="gender"
              name='gender'
              label="Gender"
              sx={{color:'white'}}
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
          {formik.errors.gender&&formik.touched.gender&&(<Typography color='error'>{formik.errors.gender}</Typography>)}
          <h3 className="mt-4">
          Have an account?{" "}
          <Link
            href={"/login"}
            className="text-blue-500 hover:text-blue-500 font-semibold "
          >
            Log in
          </Link>
        </h3>
          <Button variant="contained" type='submit' sx={{width:'fit-content',ml:'auto'}}>
            {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Register"}
            </Button>
        </form>
      </Paper>
    </div>
  )
}



