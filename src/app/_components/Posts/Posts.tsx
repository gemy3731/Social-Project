import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Post as PostInterface } from "@/interfaces/post.type";
import { Box } from "@mui/material";
import Image from "next/image";
import avatarImg from '@/images/download.png'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  //   variants: [
  //     {
  //       props: ({ expand }) => !expand,
  //       style: {
  //         transform: 'rotate(0deg)',
  //       },
  //     },
  //     {
  //       props: ({ expand }) => !!expand,
  //       style: {
  //         transform: 'rotate(180deg)',
  //       },
  //     },
  //   ],
}));

export default function Posts({ post,getSinglePost }: { post: PostInterface;getSinglePost:Function }) {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const date = new Date(post.createdAt).toDateString();
  const dateComment: string = new Date(
    post.comments[0]?.createdAt
  ).toDateString();
  return (
    <>
    <Card sx={{ width: "100%", bgcolor: "#252728", color: "white"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ cursor: "pointer" }} aria-label="recipe">
            <Image
              src={post.user.photo??avatarImg}
              alt={post.user.name}
              width={50}
              height={50}
            ></Image>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: "white" }} />
          </IconButton>
        }
        title={post.user.name}
        subheader={date}
        titleTypographyProps={{
          sx: {
            cursor: "pointer",
            width: "fit-content",
          },
        }}
        subheaderTypographyProps={{
          sx: {
            color: "#818181",
          },
        }}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "white" }}>
          {post.body}
        </Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          component="img"
          height="194"
          image={post.image}
          src={post.image}
          alt="Paella dish"
          onClick={()=>{getSinglePost(post._id)}}
        />
      )}

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "white" }} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon sx={{ color: "white" }} />
        </ExpandMore>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: "white" }} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {post.comments[0] && (
          <CardContent>
            <Box>
              <CardHeader
                sx={{ p: 0 }}
                avatar={
                  <Avatar
                    sx={{ cursor: "pointer", width: 30, height: 30 }}
                    aria-label="recipe"
                  >
                    <Image
                      src={post.comments[0]?.commentCreator.photo??avatarImg}
                      alt={post.comments[0]?.commentCreator.name}
                      width={30}
                      height={30}
                    ></Image>
                  </Avatar>
                }
                title={post.comments[0]?.commentCreator.name}
                subheader={dateComment}
                titleTypographyProps={{
                  sx: {
                    cursor: "pointer",
                    width: "fit-content",
                  },
                }}
                subheaderTypographyProps={{
                  sx: {
                    color: "#818181",
                  },
                }}
              />
              <Typography sx={{ marginBlock: 2 }}>
                {post.comments[0]?.content}
              </Typography>
              {post.comments[1]&&<Typography sx={{ marginBlock: 1, color:'#1aa3e9',textDecoration:'underLine', cursor:'pointer' }} onClick={()=>{getSinglePost(post._id)}}>
                See All
              </Typography>}
              
            </Box>
          </CardContent>
        )}
      </Collapse>
    </Card>
    </>
  );
}
