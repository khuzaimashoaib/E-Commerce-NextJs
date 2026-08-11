import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import { CardProvider } from "@/lib/context/CartContext";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function MainLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <CardProvider>
          <Header />
          {children}
          <Footer />
        </CardProvider>
      </AuthProvider>

      <Script
        src="/assets/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/jquery-3.7.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/jquery.meanmenu.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/jquery.magnific-popup.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/jquery.counterup.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/jquery.nice-select.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/swiper-bundle.min.js "
        strategy="afterInteractive"
      />
      <Script src="/assets/js/wow.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}
