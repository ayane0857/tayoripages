import { client } from "@/libs/client";
import { MetadataRoute } from "next";

type Post = {
  id: string;
  title: string;
  publishedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ベースURLを設定（実際のドメインに変更してください）
  const baseUrl = "https://xn--f9j5dg.com/";

  // 固定ページのサイトマップエントリー
  const staticPages = [
    {
      url: "https://xn--f9j5dg.com/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://xn--f9j5dg.com/topic",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://xn--f9j5dg.com/about_this_site",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // microCMSから全記事を取得
  const posts = await client.get({
    endpoint: "topic",
    queries: { fields: "id,title,publishedAt" },
  });

  // 記事ページのサイトマップエントリーを生成
  const postEntries = posts.contents.map((post: Post) => ({
    url: `${baseUrl}/topic/${post.id}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 静的ページと記事ページを結合
  return [...staticPages, ...postEntries];
}
