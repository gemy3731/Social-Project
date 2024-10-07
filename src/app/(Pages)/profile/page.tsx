'use client'
import { Box,Typography,Paper,TextField,Button,FormControl,InputLabel,InputAdornment,Input } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { User } from '@/interfaces/user.type';
import avatarImg from '@/images/default-avatar-profile-picture-male-icon.webp'


// const StyledInput = styled(Input)(({ theme }) => ({
//     input: {
//       color: 'red', // Change the input text color to red
//     },
//   }));
export default  function page() {
    const [userData, setUserData] = useState<User>()
    useEffect(()=>{
        getUserData()
    },[])
    const getUserData = ()=>{
        axios.get('https://linked-posts.routemisr.com/users/profile-data',{
            headers:{
                token:localStorage.getItem('token')
            }
        }).then((res)=>{
            console.log('res',res);
            setUserData(res.data.user)
            
        }).catch((err)=>{
            console.log('err',err);
            
        })
    }
  return (
    <div>
        
        <div className="w-[60%] mx-auto">

      <Paper variant="elevation" square={false} elevation={1} sx={{ p: '30px', backgroundColor: '#252728',boxShadow:'2px 2px 8px #252728,-2px -2px 8px #252728' }}>
      <Typography component={'h2'} variant='h4' sx={{color:'white',mb:'10px'}}>Profile</Typography>
      <Box sx={{ml:'auto',width:'100px',height:'100px',mb:3,borderRadius:'50%',overflow:'hidden'}} >
      <Image src={userData?.photo??avatarImg} width={100} height={100} alt='Annonymous' objectFit='cover'></Image>
      </Box>
        <div  className='flex flex-col gap-5 text-white '>
          <TextField disabled  id="name" name='name'   label={`Name : ${userData?.name??''}`} variant="outlined" placeholder='Name' type='text' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          <TextField disabled id="email" name='email'   label={`Email : ${userData?.email??''}`} variant="outlined" placeholder='Email' type='email' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          <TextField disabled id="dateOfBirth" name='dateOfBirth'   label={`Birth : ${userData?.dateOfBirth??''}`} variant="outlined" placeholder='DateOfBirth' type='text' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          <TextField disabled id="gender" name='gender'   label={`Gender : ${userData?.gender??''}`} variant="outlined" placeholder='Gender' type='text' fullWidth sx={{ input: { color: 'white', "&::placeholder": { color: "gray" } } }} InputLabelProps={{ className: '!text-white' }} />
          
          {/* <Button variant="contained" type='submit' sx={{width:'fit-content',ml:'auto'}}>
            </Button> */}
        </div>
      </Paper>
    </div>
    </div>
  )
}
