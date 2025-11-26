"use client";

import { Carousel } from "@/components/carousel";
import { useEffect, useState } from "react"; // Added useState import
import { useRouter } from "next/navigation";

// Define Article type or use an existing type from your project
type Article = {
  id: string;
  title: string;
  [key: string]: string;
};

type CarouselItem = {
  id: number;
  img_url: string;
  labels: string;
  content: string;
  type: string;
};

export default function One() {
  const [article, setArticle] = useState<Article[]>([]);
  const [question, setQuestion] = useState<Article[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  const [loading, setLoading] = useState(true); // Added loading state

  // 在组件中
  const router = useRouter();

  const fetchImageData = async () => {
    try {
      const response = await fetch("/api/one/imageConfig");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("获取失败:", error);
    }
  };

  const fetchArticleData = async () => {
    try {
      const response = await fetch("/api/one/article?type=1");
      const data = await response.json();
      // Make state update asynchronous to prevent cascading renders
      return data;
    } catch (error) {
      console.error("获取失败:", error);
    }
  };

  const fetchQuestionData = async () => {
    try {
      const response = await fetch("/api/one/article?type=2");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("获取失败:", error);
    }
  };

  // 更清晰的方式是使用 Promise 和异步/等待
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imageData, articleData, questionData] = await Promise.all([
          fetchImageData(),
          fetchArticleData(),
          fetchQuestionData(),
        ]);
        if (imageData) {
          // 1. 更新 carouselItems 状态
          setCarouselItems(imageData);
        }
        // 2. 优化依赖项，避免不必要的重新渲染
        if (articleData) {
          setArticle(articleData);
        }
        if (questionData) {
          setQuestion(questionData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleArticleClick = (item: Article) => {
    router.push(`/one/${item.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="header mb-6">
        <div className="text-5xl font-bold text-center bg-sky-500 text-white px-4 py-2 rounded-md">ONE</div>
      </div>
      <div className="main flex flex-col lg:flex-row gap-6">
        <div className="slide w-full lg:w-1/2">
          <section className="mb-6">
            <Carousel
              items={carouselItems.map((item) => ({
                ...item,
                imageUrl: item.img_url,
                alt: item.labels,
              }))}
            />
          </section>
        </div>
        <div className="content w-full lg:w-1/2 overflow-hidden">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-3 text-center bg-sky-500 text-white px-4 py-2 rounded-md">ONE文章</h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
              {article.map((item) => (
                <li
                  key={item.id}
                  className="text-lg text-sky-500 cursor-pointer hover:text-sky-600 transition-colors"
                  onClick={() => handleArticleClick(item)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-center bg-sky-500 text-white px-4 py-2 rounded-md">ONE问题</h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
              {question.map((item) => (
                <li
                  key={item.id}
                  className="text-lg text-sky-500 cursor-pointer hover:text-sky-600 transition-colors"
                  onClick={() => handleArticleClick(item)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
