"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Input,
  Typography,
  Modal,
  Button,
  IconButton,
} from "@mui/material";
import Posts from "./_components/Posts/Posts";
import { Post as PostInterface } from "./../interfaces/post.type";
import SinglePost from "./_components/SinglePost/SinglePost";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/system";
import toast from "react-hot-toast";

const InputElement = styled("input")(
  ({ theme }) => `
  width:100%;
  color:white;
  background-color:#252728;
  border-bottom:gray 1px solid;
  padding:10px;
  resize:none;
  cursor:pointer;
  &:focus{
    outline:0
  };
`
);
const VisuallyHiddenInput = styled("input")({
  height: "100%",
  position: "absolute",
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  whiteSpace: "nowrap",
  width: "100%",
  opacity: 0,
});
export default function Home() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [singlePost, setSinglePost] = useState<PostInterface | null>(null);
  const [open, setOpen] = useState(false);
  const removeFocus = useRef<HTMLInputElement>(null);
  const postCaptionRef = useRef<HTMLInputElement>(null);
  const postImgRef = useRef<HTMLInputElement>(null);
  const handleOpen = () => {
    setOpen(true);
    removeFocus.current?.blur();
    
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  useEffect(() => {
    console.log("postImgRef",postImgRef);
  }, [postImgRef]);
  const getAllPosts = () => {
    axios
      .get("https://linked-posts.routemisr.com/posts?page=39", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
        console.log("res", res);
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
        setSinglePost(res.data.post);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const closePost = (): void => {
    setSinglePost(null);
  };
  const createPost = () => {
    const payLoad = new FormData()
    const postCation = postCaptionRef.current?.value||'';
    payLoad.append('body',postCation)

    
      if( postImgRef.current?.files?.[0]){
        console.log("hlaaaaaaaaaaaaaaaa");
        const postImg = postImgRef.current?.files[0];
        payLoad.append('image',postImg)
      }

    axios.post("https://linked-posts.routemisr.com/posts",payLoad,{
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res)=>{
      toast.success('Post Created Successfully',{position:'top-right'})
      console.log("res", res);
      setOpen(false);
    }).catch((err)=>{
      toast.error('Something Went wrong',{position:'top-right'})
      setOpen(false);
      console.log("err", err);
    })
  };
  return (
    <>
      <div className={singlePost ? "hidden" : ""}>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>

          <Grid
            item
            xs={6}
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Box
              onClick={handleOpen}
              sx={{ bgcolor: "#252728", p: 2, cursor: "pointer" }}
            >
              <Typography component="h2" variant="h5" sx={{ color: "white" }}>
                Create Post
              </Typography>
              <Input
                inputRef={removeFocus}
                onFocus={handleOpen}
                title="Create Post"
                slots={{ input: InputElement }}
                fullWidth
                multiline
                placeholder="What's on your mind?..."
              />
              <IconButton sx={{mx: "auto", display: "block"}}>
              <AddPhotoAlternateIcon
                titleAccess="Create Post"
                sx={{ color: "white" }}
              />
              </IconButton>
            </Box>
            {posts.map((post) => (
              <Posts key={post._id} post={post} getSinglePost={getSinglePost} />
            ))}
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>
      </div>

      <div
        className={
          singlePost ? "fixed top-0 bottom-0 left-0 right-0" : "hidden"
        }
      >
        <SinglePost singlePost={singlePost} closePost={closePost} />
      </div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        sx={{
          mx: "auto",
          mt: "100px",
          width: "70%",
          bgcolor: "rgb(0,0,0,0.6)",
        }}
      >
        <Box sx={{ bgcolor: "#252728", p: 2 }}>
          <Typography component="h2" variant="h5" sx={{ color: "white" }}>
            Create Post
          </Typography>
          <Input
            inputComponent='textarea'
            inputRef={postCaptionRef}
            title="Create Post123"
            slots={{ input: InputElement }}
            fullWidth
            multiline
            placeholder="What's on your mind?..."
          />

          <IconButton
            sx={{
              position: "relative",
              width: "fit-content",
              mx: "auto",
              display:'block',
              cursor: "pointer",
            }}
          >
            <AddPhotoAlternateIcon
              titleAccess="Attach Image"
              sx={{
                color: "white",
              }}
            />
            <VisuallyHiddenInput
              ref={postImgRef}
              type="file"
              accept="image/*"
              sx={{ cursor: "pointer" }}
            />
          </IconButton>

          <Button
            title="Create"
            variant="contained"
            onClick={createPost}
            sx={{ width: "fit-content", ml: "auto", display: "block" }}
          >
            Post
          </Button>
        </Box>
      </Modal>
    </>
  );
}
