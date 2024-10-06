"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Posts from "./_components/Posts/Posts";
import { Post as PostInterface } from "./../interfaces/post.type";
import SinglePost from "./_components/SinglePost/SinglePost";

export default function Home() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [singlePost, setSinglePost] = useState<PostInterface|null>(null);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = () => {
    axios
      .get("https://linked-posts.routemisr.com/posts?limit=50", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getSinglePost = (id: string): void => {
    axios
      .get(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSinglePost(res.data.post)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const closePost = ():void=>{
    setSinglePost(null)
  }
  return (
    <>
        <div className={singlePost?'hidden':''}>
      <Grid container spacing={3}>
        <Grid item xs={3}></Grid>

        <Grid
          item
          xs={6}
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {posts.map((post) => (
            <Posts key={post._id} post={post} getSinglePost={getSinglePost} />
          ))}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
        </div>
          <div className={singlePost?'fixed top-0 bottom-0 left-0 right-0':'hidden'}>
            <SinglePost singlePost={singlePost} closePost={closePost} />
          </div>
    </>
  );
}
