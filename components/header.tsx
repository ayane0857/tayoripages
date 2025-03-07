import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-center">
          <ul className="flex space-x-8 md:space-x-12">
            <li>
              <Link
                href="/"
                className="text-sm md:text-base font-medium hover:text-primary transition-colors"
              >
                トップ
              </Link>
            </li>
            <li>
              <Link
                href="/topic"
                className="text-sm md:text-base font-medium hover:text-primary transition-colors"
              >
                トピック
              </Link>
            </li>
            <li>
              <Link
                href="/about_this_site"
                className="text-sm md:text-base font-medium hover:text-primary transition-colors"
              >
                このサイトについて
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
