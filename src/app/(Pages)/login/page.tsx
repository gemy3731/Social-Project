'use client'
import React, { useState } from 'react'
import { Input, MenuItem, Select, InputLabel, Paper, TextField, FormControl, FormControlLabel, FormLabel, Button, Typography, Box } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function Login() {
  const [isLoading,setIsloading] = useState(false)
  const [isError,setIsError] = useState(null)
  const navigate = useRouter()
  const onSubmit = (values:{email:string,password:string})=>{
    setIsloading(true)
    setIsError(null)
    return axios.post('https://linked-posts.routemisr.com/users/signin',values)
      .then((res)=>{
        setIsloading(false)
        // navigate.push('/login')
        console.log("res",res);
        
      })
      .catch((err)=>{
        setIsloading(false)
        setIsError(err.response.data.error)
        setTimeout(()=>setIsError(null),5000)
      })
  }
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    onSubmit,
    validationSchema:yup.object().shape({
      email: yup
        .string()
        .required("Email required")
        .email("Invalid email"),
      password: yup
        .string()
        .required("Password required")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Incorrect Password")
    })
  })
  return (
    <div className="w-[60%] mx-auto">
      {isError&&(
        <Box sx={{textAlign:'center',mb:'10px'}}>
          <Typography color='error'>{isError}</Typography>
        </Box>
      )}
      <Paper variant="elevation" square={false} elevation={1} sx={{ p: '30px', backgroundColor: '#252728',boxShadow:'2px 2px 8px #252728,-2px -2px 8px #252728' }}>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5 text-white '>
         
          <TextField id="email" name='email' value={formik.values.email} onChange={formik.handleChange} label="Email..." variant="outlined" placeholder='Email' type='email' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          {formik.errors.email&&formik.touched.email&&(<Typography color='error'>{formik.errors.email}</Typography>)}
          <TextField id="password" name='password' value={formik.values.password} onChange={formik.handleChange} label="Password..." variant="outlined" placeholder='Password' type='password' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          {formik.errors.password&&formik.touched.password&&(<Typography color='error'>{formik.errors.password}</Typography>)}
          <h3 className="mt-4">
          Don't have an account?
          <Link
            href={"/register"}
            className="text-blue-500 hover:text-blue-500 font-semibold ml-1"
          >
            Sign up
          </Link>
        </h3>
          <Button variant="contained" type='submit' sx={{width:'fit-content',ml:'auto'}}>
            {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Login"}
            </Button>
        </form>
      </Paper>
    </div>
  )
}



