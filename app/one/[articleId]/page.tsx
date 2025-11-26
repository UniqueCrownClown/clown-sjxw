import BackButton from "@/components/BackButton";
import { db } from "@/db/db";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  // 解包 params Promise
  const { articleId } = await params;

  // 将数据获取逻辑与JSX渲染分开
  let articleDetail = null;
  let error = null;

  try {
    // 直接从数据库获取数据
    articleDetail = await db.articleContent.findFirst({
      where: { article_id: articleId },
    });
  } catch (err) {
    // 捕获错误但不在这里构建JSX
    console.error("获取文章详情失败:", err);
    error = err;
  }

  // 错误页面渲染
  if (error) {
    return (
      <div className="container mx-auto p-4 w-full">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded">
          <p>加载文章时发生错误</p>
          <BackButton />
        </div>
      </div>
    );
  }

  if (!articleDetail) {
    return (
      <div className="container mx-auto p-4 w-full">
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">文章不存在</h2>
          <p className="mb-6">您查找的文章可能已被删除或移动</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 w-2/3">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="header mb-6">
        <div className="text-5xl font-bold text-center bg-sky-500 text-white px-4 py-2 rounded-md">ONE</div>
      </div>
      {/* 文章内容 */}
      <div className="article-content">
        <h1 className="text-3xl font-bold mb-4">{articleDetail.keyword}</h1>
        <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />
      </div>
    </div>
  );
}
