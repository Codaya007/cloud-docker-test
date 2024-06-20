import { Lato } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { AuthProvider } from "@/context/AuthContext";

// const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "EcoClima Tracker",
  description:
    "Aplicación desarrollada para realizar un seguimiento climático de área UNL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
      </head>
      {/* <body className={inter.className}> */}
      <body className={lato.className} style={{ height: "100vh" }}>
        <AuthProvider>
          <Header />
          <div className="app-container">
            <NavBar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
