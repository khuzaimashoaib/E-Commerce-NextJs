import "../../styles/animate.css";
import "../../styles/bootstrap.min.css";
import "../../styles/color-2.css";
import "../../styles/color-3.css";
import "../../styles/color-4.css";
import "../../styles/color.css";
import "../../styles/magnific-popup.css";
import "../../styles/main.css";
import "../../styles/meanmenu.css";
import "../../styles/nice-select.css";
import "../../styles/swiper-bundle.min.css";
import "../../styles/custom.css";
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
    </>
  );
}
