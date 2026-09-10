import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import { CardProvider } from "@/lib/context/CartContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { WishlistProvider } from "@/lib/context/WishlistContext";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <CardProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </CardProvider>
      </AuthProvider>
      <Toaster position="bottom-right" />
    </>
  );
}
