import Link from "next/link";
import { client } from "@/libs/client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";

// HTMLタグを削除する関数
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ""); // 正規表現でタグを除去
}

type Props = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
};

async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "topic",
    queries: {
      limit: 5,
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">トピック記事一覧</h1>
          <div className="grid gap-6">
            {posts.map((post) => {
              const plainText = stripHtml(post.content); // HTMLタグを削除
              const truncatedText =
                plainText.length > 100
                  ? plainText.slice(0, 100) + "..."
                  : plainText; // 100文字まで表示
              const formattedDate = dayjs(post.publishedAt).format(
                "YYYY.MM.DD"
              );

              return (
                <Link
                  href={`/topic/${post.id}`}
                  key={post.id}
                  className="block hover:no-underline transition-transform duration-200 hover:scale-105"
                >
                  <Card className="h-full hover:shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl font-semibold">
                          {post.title}
                        </CardTitle>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                          {formattedDate}
                        </span>
                      </div>
                      <CardDescription className="text-gray-600 line-clamp-3">
                        {truncatedText}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
