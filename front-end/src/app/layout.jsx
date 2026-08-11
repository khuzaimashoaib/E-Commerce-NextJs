import "./globals.css";
import "@/styles/animate.css";
import "@/styles/bootstrap.min.css";
import "@/styles/color-2.css";
import "@/styles/color-3.css";
import "@/styles/color-4.css";
import "@/styles/color.css";
import "@/styles/magnific-popup.css";
import "@/styles/main.css";
import "@/styles/meanmenu.css";
import "@/styles/nice-select.css";
import "@/styles/swiper-bundle.min.css";
import "@/styles/custom.css";
import Script from "next/script";

export const metadata = {
  title: "Sports Store",
  description: "Your one stop sports shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </body>
    </html>
  );
}
