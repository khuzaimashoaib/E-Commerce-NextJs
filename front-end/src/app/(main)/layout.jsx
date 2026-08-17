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
