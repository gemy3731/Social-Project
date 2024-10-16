"use client";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./_components/NavBar/NavBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "@/lib/Redux/Store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getUserToken } from "@/lib/Redux/tokenSlice/TokenSlice";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <title>Linked Posts</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Provider store={store}>
          <div className="z-10">
            <NavBar />
          </div>
          <div className="container mx-auto mt-20 ">
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                {children}
                <Toaster />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </div>
        </Provider>
      </body>
    </html>
  );
}
