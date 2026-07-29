import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Sports Store",
  description: "Your one stop sports shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}   

         <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
       <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/jquery.meanmenu.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/jquery.counterup.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/jquery.nice-select.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/wow.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}