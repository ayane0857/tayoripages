import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Youtube, Twitter } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

type ProfileItemProps = {
  label: string;
  value: string | number;
};

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5">
        {label}
      </h3>
      <p className="text-lg font-semibold mt-0">{value}</p>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="w-full w-1/2 flex justify-center">
              <Image
                src="/standing_picture.png"
                width={556}
                height={1000}
                alt="立ち絵"
                priority
              />
            </div>

            <div className="w-full w-1/2 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
                音(たより)
              </h1>

              <p className="text-lg text-muted-foreground">
                音とは、ゆっくり茶番ショート投稿者であり、脳死で会話する霊夢と魔理沙と音シリーズでは生声を使用し、ショート動画を作成している。現在、チャンネル登録者は10万人を突破している。
              </p>

              <div className="flex gap-4 items-center">
                <Link
                  href="https://www.youtube.com/channel/UCO-M9EilpZtUr-44QuUxI2w"
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-5 w-5" />
                  <span>YouTube</span>
                </Link>
                <Link
                  href="https://x.com/Tayori8739"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span>Twitter</span>
                </Link>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">詳しい情報</h2>
                <ProfileItem label="芸名" value="桜木音" />
                <ProfileItem label="誕生日" value="10月20日" />
                <ProfileItem label="性別" value="女性" />
                <ProfileItem label="血液型" value="O型" />
                <ProfileItem label="好きな季節" value="秋" />
                <ProfileItem label="好きな色" value="水色" />
                <ProfileItem label="猫犬" value="猫派" />
                <ProfileItem label="ハッシュタグ" value="#風のお音" />
                <ProfileItem label="文理" value="文系" />
                <ProfileItem label="好きな東方キャラ" value="フラン" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
