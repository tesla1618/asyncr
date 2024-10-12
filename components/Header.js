import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Asyncr",
  description:
    "Asyncr is a project management tool that helps you keep track of your projects, tasks, and deadlines.",
};

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {session ? (
            <Link
              href="/projects"
              className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors duration-200"
            >
              Asyncr
            </Link>
          ) : (
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors duration-200"
            >
              Asyncr
            </Link>
          )}

          <nav className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/projects"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center hover:text-blue-200 transition-colors duration-200"
                  >
                    {session.user.name}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4">
            {session ? (
              <>
                <Link
                  href="/projects"
                  className="block py-2 hover:text-blue-200 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })} // Redirect to homepage
                  className="block w-full text-left py-2 hover:text-blue-200 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="block bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors duration-200 text-center"
              >
                Sign In
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
