import { Geist, Geist_Mono, Inter } from "next/font/google";
import { NavBar } from "@/components/custom/navbar"; 
import { AuthProvider } from "@/backend/auth_provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anime Diary",
  description: "List your anime series and entries in one place. Keep track of your anime watching journey with Anime Diary.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="container mx-auto flex-1 p-4 flex flex-col">
                {children}         
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
