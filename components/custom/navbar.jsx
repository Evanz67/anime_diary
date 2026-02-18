import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Rows3, Trash, BookOpen } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Anime List", url: "/inbox", icon: Rows3 },
  { title: "Dropped List", url: "/calendar", icon: Trash },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
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

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 mr-8">
          <Button variant="ghost" size="lg">Login</Button>
          <Button size="lg" className="text-white">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}