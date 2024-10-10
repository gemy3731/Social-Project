"use client";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Modal,
  Divider,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { User } from "@/interfaces/user.type";
import avatarImg from "@/images/default-avatar-profile-picture-male-icon.webp";
import { useFormik } from "formik";
import * as yup from "yup";
// const StyledInput = styled(Input)(({ theme }) => ({
//     input: {
//       color: 'red', // Change the input text color to red
//     },
//   }));
const VisuallyHiddenInput = styled("input")({
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  whiteSpace: "nowrap",
  width: "100%",
  opacity: 0,
});
export default function page() {
  const [isLoading,setIsloading] = useState(false)
  const [userData, setUserData] = useState<User>();
  const [showBtn, setShowBtn] = useState(false);
  const [updatePass, setUpdatePass] = useState(false);
  useEffect(() => {
    getUserData();
  }, []);
  const profileImageRef = useRef<HTMLInputElement>(null);
  const getUserData = () => {
    axios
      .get("https://linked-posts.routemisr.com/users/profile-data", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("res", res);
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const uploadProfilePhoto = () => {
    let profileImg: File | null | undefined =
      profileImageRef.current?.files?.[0];
    const formBody = new FormData();
    if (profileImg) {
      formBody.append("photo", profileImg);
    }
    axios
      .put("https://linked-posts.routemisr.com/users/upload-photo", formBody, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("res hna", res);
        getUserData();
        setShowBtn(false);
      })
      .catch((err) => {
        console.log("err hna", err);
      });
  };
  const handleBtn = () => {
    setShowBtn(true);
  };
  const onSubmit = (values:{password:string,newPassword:string}) => {
    console.log("hellozzzzzzzzzzzzz",values);
    setIsloading(true)
    return axios.patch('https://linked-posts.routemisr.com/users/change-password',values,{
      headers:{
        token:localStorage.getItem('token'),
      }
    }).then((res)=>{
      setUpdatePass(false)
      setIsloading(false)
      localStorage.setItem('token',res.data.token)
      console.log('res',res)
    }).catch((err)=>{
      console.log('err',err)
    })
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    onSubmit,
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("Password required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password should contain at least 8 Characters => 1 capital letter, 1 small letter, 1 digit and 1 special character"
        ),
        newPassword: yup
        .string()
        .required("Password required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "New Password should contain at least 8 Characters => 1 capital letter, 1 small letter, 1 digit and 1 special character"
        ),
    }),
  });
  return (
    <>
      <div className="w-[60%] mx-auto">
        <Paper
          variant="elevation"
          square={false}
          elevation={1}
          sx={{
            p: "30px",
            backgroundColor: "#252728",
            boxShadow: "2px 2px 8px #252728,-2px -2px 8px #252728",
          }}
        >
          <Typography
            component={"h2"}
            variant="h4"
            sx={{ color: "white", mb: "10px" }}
          >
            Profile
          </Typography>
          <Button
            className={showBtn ? "!ml-auto !my-4 !block" : "!hidden"}
            variant="contained"
            onClick={uploadProfilePhoto}
          >
            Update Photo
          </Button>
          <Box
            className={showBtn ? "!hidden group" : "group"}
            onClick={handleBtn}
            // className="group"
            sx={{
              ml: "auto",
              width: "100px",
              height: "100px",
              mb: 3,
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Image
              src={userData?.photo ?? avatarImg}
              width={100}
              height={100}
              alt="Annonymous"
              objectFit="cover"
            ></Image>
            <Box
              className="hidden group-hover:flex"
              sx={{
                bgcolor: "rgba(0,0,0,0.7)",
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              Change Photo
            </Box>
            <VisuallyHiddenInput
              ref={profileImageRef}
              type="file"
              accept="image/*"
            />
          </Box>
          <div className="flex flex-col gap-5 text-white ">
            <TextField
              disabled
              id="name"
              name="name"
              label={`Name : ${userData?.name ?? ""}`}
              variant="outlined"
              placeholder="Name"
              type="text"
              fullWidth
              sx={{
                input: { color: "white", "&::placeholder": { color: "gray" } },
              }}
              InputLabelProps={{ className: "!text-white" }}
            />
            <TextField
              disabled
              id="email"
              name="email"
              label={`Email : ${userData?.email ?? ""}`}
              variant="outlined"
              placeholder="Email"
              type="email"
              fullWidth
              sx={{
                input: { color: "white", "&::placeholder": { color: "gray" } },
              }}
              InputLabelProps={{ className: "!text-white" }}
            />
            <TextField
              disabled
              id="dateOfBirth"
              name="dateOfBirth"
              label={`Birth : ${userData?.dateOfBirth ?? ""}`}
              variant="outlined"
              placeholder="DateOfBirth"
              type="text"
              fullWidth
              sx={{
                input: { color: "white", "&::placeholder": { color: "gray" } },
              }}
              InputLabelProps={{ className: "!text-white" }}
            />
            <TextField
              disabled
              id="gender"
              name="gender"
              label={`Gender : ${userData?.gender ?? ""}`}
              variant="outlined"
              placeholder="Gender"
              type="text"
              fullWidth
              sx={{
                input: { color: "white", "&::placeholder": { color: "gray" } },
              }}
              InputLabelProps={{ className: "!text-white" }}
            />
            <Divider sx={{bgcolor:'gray'}} />
            <Button
              className={updatePass?'!hidden':''}
              variant="contained"
              sx={{ width: "fit-content", ml: "auto" }}
              onClick={()=>{setUpdatePass(true)}}
            >Change Password</Button>
            <form
              onSubmit={formik.handleSubmit}
              className={updatePass?`flex flex-col gap-5 text-white `:'!hidden'}
            >
              <TextField
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                label="Password..."
                variant="outlined"
                placeholder="Password"
                type="password"
                fullWidth
                sx={{
                  input: {
                    color: "white",
                    "&::placeholder": { color: "gray" },
                  },
                }}
                InputLabelProps={{ className: "!text-white" }}
              />
              {formik.errors.password && formik.touched.password && (
                <Typography color="error">{formik.errors.password}</Typography>
              )}
              <TextField
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                label="newPassword..."
                variant="outlined"
                placeholder="newPassword"
                type="password"
                fullWidth
                sx={{
                  input: {
                    color: "white",
                    "&::placeholder": { color: "gray" },
                  },
                }}
                InputLabelProps={{ className: "!text-white" }}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <Typography color="error">
                  {formik.errors.newPassword}
                </Typography>
              )}
              <Button
              variant="contained"
              type="submit"
              sx={{ width: "fit-content", ml: "auto" }}
            >
              {isLoading?<i className="fa fa-spinner fa-spin"></i>:"Update Password"}</Button>
            </form>
          </div>
        </Paper>
      </div>
    </>
  );
}
