import { comment as commentIntergace } from "@/interfaces/post.type";
import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import avatarImg from "@/images/download.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
export default function Comment({ comment }: { comment: commentIntergace }) {
  const dateComment: string = new Date(comment.createdAt).toDateString();
  return (
    <>
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
                  src={comment.commentCreator.photo ?? avatarImg}
                  alt={comment.commentCreator.name}
                  width={30}
                  height={30}
                ></Image>
              </Avatar>
            }
            title={comment.commentCreator.name}
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
          <Typography sx={{ marginBlock: 1}}>{comment.content}</Typography>
          <CardActions sx={{ display: "flex", justifyContent: "space-around"}}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton aria-label="share">
              <ReplyIcon sx={{ color: "white" }} />
            </IconButton>
          </CardActions>
        </Box>
      </CardContent>
      <Divider />
    </>
  );
}
