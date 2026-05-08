'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Rows3, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/auth_provider';
import { getUser } from '@/backend/firestore_database';
import { useModal } from '@/context/modal_provider';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Anime List', url: '/anime_list', icon: Rows3 },
];

export function NavBar() {
  const [firstName, setFirstName] = useState('');
  const { openModal } = useModal();

  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      getUser(user.uid).then((userData) => {
        if (userData) {
          setFirstName(userData.firstName);
        }
      });
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-center gap-4 md:justify-between md:mx-10">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">
            <BookOpen className="size-8 xl:size-12" />
          </span>
          <span className="font-bold italic text-base md:text-lg xl:text-2xl">
            Anime Diary
          </span>
        </div>
        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
            >
              <item.icon className="size-6 sm:size-4" />
              <span className="hidden sm:inline">{item.title}</span>
            </Link>
          ))}
        </nav>
        {/* Auth Buttons */}
        <div className="">
          {!user ? (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="px-2 py-1 md:px-8 md:py-5"
                onClick={() => openModal('login')}
              >
                Login
              </Button>
              <Button
                className="px-2 py-1 md:px-8 md:py-5"
                onClick={() => openModal('signup')}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="px-2 py-1 md:px-8 md:py-5"
                onClick={logout}
              >
                Profile
              </Button>
              <Button
                variant="secondary"
                className="px-2 py-1 md:px-8 md:py-5"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
