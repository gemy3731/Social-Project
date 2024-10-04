'use client'
// import { store } from "@/lib/Redux/Store";
// import Image from "next/image";
// import { useSelector } from "react-redux";

import axios from "axios";
import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import Posts from "./_components/NavBar/Posts";
import { Post as PostInterface } from './../interfaces/post.type';

export default  function Home() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  // const {userToken} = useSelector((reduxStore:ReturnType<typeof store.getState>)=> reduxStore.userTokenReducer)
  // console.log(userToken);
  useEffect(()=>{
    getAllPosts()
  },[])
  const getAllPosts = ()=>{
     axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
      headers:{
        token:localStorage.getItem('token')
      }
    }).then((res)=>{
      console.log('res',res.data.posts);
      setPosts(res.data.posts)
    }).catch((err)=>{
      console.log('err',err);
    })
  }
  
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
      <Grid item xs={6} sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
        {posts.map((post)=><Posts key={post._id} post={post} />)}
        
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
    </>
  );
}
