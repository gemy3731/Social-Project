import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Post as PostInterface } from "@/interfaces/post.type";
import Image from "next/image";
import { Avatar, CardActions, CardContent, CardHeader } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import avatarImg from "@/images/download.png";
import Comment from "../Comments/Comment";

const drawerWidth = 400;

interface Props {
  window?: () => Window;
}

export default function SinglePost({
  window,
  singlePost,
  closePost,
}: {
  window?: () => Window;
  singlePost: PostInterface | null;
  closePost: Function;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const date = singlePost?.createdAt
    ? new Date(singlePost.createdAt).toDateString()
    : "No date available";
  const drawer = (
    <div className="bg-[#252728] h-[auto] text-white w-[100%] p-3">
      <Divider />
      <CardHeader
        sx={{ p: 0 }}
        avatar={
          <Avatar
            sx={{ cursor: "pointer", width: 40, height: 40 }}
            aria-label="recipe"
          >
            <Image
              src={singlePost?.user.photo ?? avatarImg}
              alt={singlePost?.user.name ?? "Anonymous"}
              width={30}
              height={30}
            ></Image>
          </Avatar>
        }
        title={singlePost?.user.name}
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
          {singlePost?.body}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: "white" }} />
        </IconButton>
      </CardActions>
      <Divider />
      {singlePost?.comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", bgcolor: "#252728", color: "white" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#252728",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <CloseIcon
            sx={{ ml: "auto", cursor: "pointer" }}
            onClick={closePost as React.MouseEventHandler<SVGSVGElement>}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "#252728",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            bgcolor: "#252728",
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            bgcolor: "#252728",
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "black",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar />
        <Image
          src={singlePost?.image ?? ""}
          alt={singlePost?.user.name ?? "Anonymous"}
          width={600}
          height={600}
        ></Image>
      </Box>
    </Box>
  );
}
