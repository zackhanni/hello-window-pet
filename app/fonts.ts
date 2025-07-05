import localFont from "next/font/local";

export const sourceSans = localFont({
  src: [
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Source_Sans_3/static/SourceSans3-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-source-sans",
  display: "swap",
});
