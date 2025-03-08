import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-blue-500 pl-4">
            このホームページについて
          </h2>

          <p className="text-lg mb-4">
            このホームページは、音(たより)について掲載しているファンサイトです。
          </p>

          <p className="text-lg mb-4">
            当サイトは音(たより)の非公式ファンサイトとして、最新情報の共有やファン同士の交流の場を提供することを目的としています。
          </p>

          <p className="text-lg">
            このホームページを運営しているX(旧twitter)アカウントは{" "}
            <Link
              href="https://x.com/@tayoripages"
              className="text-blue-500 hover:underline"
            >
              こちら
            </Link>
            でご確認いただけます。
          </p>
        </div>
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-blue-500 pl-4">
            運営メンバー募集中
          </h2>

          <p className="text-lg mb-4">
            このホームページは、現在有志により運営されており、現在運営メンバーを募集しています。
          </p>

          <p className="text-lg mb-4">
            運営メンバーになりたい方はぜひX(旧twitter)のDMまで！
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
