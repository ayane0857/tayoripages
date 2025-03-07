// app/topic/[id]/page.tsx
import { client } from "@/libs/client";
import dayjs from "dayjs";

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
};

// microCMSから特定の記事を取得
async function gettopicPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: `topic/${id}`,
  });
  return data;
}

// 記事詳細ページの生成
export default async function topicPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await gettopicPost(id);

  const formattedDate = dayjs(post.publishedAt).format("YY.MM.DD");

  return (
    <main>
      <h1>{post.title}</h1>
      <div>{formattedDate}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: "topic" });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}
