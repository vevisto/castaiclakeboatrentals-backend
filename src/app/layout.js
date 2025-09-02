import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Poppins } from 'next/font/google';
import Provider from "./Provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose the weights you want
  variable: '--font-poppins', // optional CSS variable
  display: 'swap',
})



export const metadata = {
  title: "Castaic Lake Boat Rental",
  description: "need to do",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="antialiased">
        <NavBar />
        <Header />
        <div className="min-h-screen">
          <Provider>
            {children}
          </Provider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
