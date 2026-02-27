"use client"

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { SignUp } from "@/components/custom/authentication/signup";
import { Login } from "@/components/custom/authentication/login";
import { Home, Rows3, Trash, BookOpen } from "lucide-react";
import { useAuth } from "@/backend/auth_provider";
import { getUser } from "@/backend/firestore_database";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Anime List", url: "/anime_list", icon: Rows3 },
  { title: "Dropped List", url: "/calendar", icon: Trash },
];

export function NavBar() {
  const [isModalSignUpOpen, setIsModalSignUpOpen] = useState(false)
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)
  const [firstName, setFirstName] = useState("")

  const { user, logout } = useAuth()

  const handleModalSignUp = () => {
  setIsModalSignUpOpen(true)
  }

  const handleCloseModalSignUp = () => {
    setIsModalSignUpOpen(false)
  }

  const handleModalLogin = () => {
  setIsModalLoginOpen(true)
  }

  const handleCloseModalLogin = () => {
    setIsModalLoginOpen(false)
  }

  useEffect(() => {
    if (user) {
      getUser(user.uid).then((userData) => {
        if (userData) {
          setFirstName(userData.firstName)
        }
      })
    }
  }, [user])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between">
        <div className="flex justify-between basis-3/5">
          <div className="flex items-center gap-2 ml-20">
            <span className=""><BookOpen className="h-13 w-15"/></span>
            <span className="font-bold tracking-wider text-3xl italic">Anime Diary</span>
          </div>
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div>
          {/* Auth Buttons */}
          <div className="mr-8">
            { !user ? (
              <div className="flex gap-2">
                <Button variant="ghost" size="lg" onClick={handleModalLogin}>Login</Button>
                <Button size="lg" className="text-white" onClick={handleModalSignUp}>Sign Up</Button>
              </div>      
            ): (
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">{firstName}</span>
                <Button variant="secondary" size="lg" onClick={logout}>Logout</Button>
              </div>      
            )}         
          </div>
        </div>   
      </div>
      <SignUp isOpen={isModalSignUpOpen} onClose={handleCloseModalSignUp} />
      <Login isOpen={isModalLoginOpen} onClose={handleCloseModalLogin} />
    </header>
  );
}