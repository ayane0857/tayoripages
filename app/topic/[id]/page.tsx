import { client } from "@/libs/client";
import dayjs from "dayjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
};

async function getTopicPost(params: Promise<{ id: string }>): Promise<Post> {
  const { id } = await params;
  return client.get({
    endpoint: "topic",
    contentId: id,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const post = await getTopicPost(params);
  const description = post.content.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function TopicPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const post = await getTopicPost(params);
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

export async function generateStaticParams() {
  const response = await client.get({
    endpoint: "topic",
    queries: { fields: "id", limit: 100 },
  });

  return response.contents.map((content: { id: string }) => ({
    id: content.id,
  }));
}
