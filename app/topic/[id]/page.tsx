import { client } from "@/libs/client";
import dayjs from "dayjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ブログ記事の型定義
type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
};

// microCMSから特定の記事を取得
async function getTopicPost(id: string): Promise<Post> {
  const data = await client.get({
    endpoint: "topic",
    contentId: id,
  });
  return data;
}

// メタデータを動的に生成する関数
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const post = await getTopicPost(id);

  // コンテンツからメタ説明を抽出（HTMLタグを除去、短くする）
  const description = post.content
    .replace(/<[^>]*>/g, "") // HTMLタグを除去
    .slice(0, 160); // 160文字に制限

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

// 記事詳細ページの生成
// ESLint の制約を回避するためのコメントを追加
// @ts-ignore
export default async function TopicPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const post = await getTopicPost(id);

  const formattedDate = dayjs(post.publishedAt).format("YY.MM.DD HH:mm");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link href="/topic" className="text-blue-500 hover:underline">
            <span className="flex items-center gap-1">
              <ArrowLeft size={16} />
              <span>トピック記事一覧へ戻る</span>
            </span>
          </Link>
          <div className="flex justify-between items-start mb-2 mt-4">
            <h1 className="text-4xl font-semibold">{post.title}</h1>
            <span className="text-base text-gray-500 whitespace-nowrap ml-2">
              {formattedDate}
            </span>
          </div>
          <div
            className="mt-6 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const response = await client.get({
    endpoint: "topic",
    queries: { fields: "id", limit: 100 },
  });

  return response.contents.map((content: { id: string }) => ({
    id: content.id,
  }));
}
