// components/carousel.tsx
"use client";
import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button"; // 引入 shadcn 的 Button 组件

// 必须导入 slick 的基础样式
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 定义轮播图项的类型
interface CarouselItem {
  id: number;
  imageUrl: string;
  alt: string;
  labels: string;
  content: string;
  type: string;
}

// 定义轮播组件的属性类型
interface CarouselProps {
  items: CarouselItem[];
  settings?: Partial<Settings>;
}

// 自定义箭头组件的属性类型
interface CustomArrowProps {
  direction: "next" | "prev";
  sliderRef: Slider | null;
  [key: string]: any; // 允许接收其他属性，如 currentSlide
}

// 自定义箭头组件，过滤掉不需要的属性
function CustomArrow({ direction, sliderRef, ...props }: CustomArrowProps) {
  const isNext = direction === "next";
  const handleClick = () => {
    if (isNext) {
      sliderRef?.slickNext();
    } else {
      sliderRef?.slickPrev();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute ${
        isNext ? "right-4" : "left-4"
      } top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 text-white hover:bg-black/40`}
      onClick={handleClick}
    >
      {isNext ? (
        <ChevronRight className="h-5 w-5" />
      ) : (
        <ChevronLeft className="h-5 w-5" />
      )}
      <span className="sr-only">{isNext ? "Next" : "Previous"}</span>
    </Button>
  );
}

export function Carousel({ items, settings = {} }: CarouselProps) {
  // 使用 useState 来创建 slider 的引用
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 定义默认的轮播设置，可以被外部传入的 settings 覆盖
  const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    // 自定义箭头组件
    nextArrow: <CustomArrow direction="next" sliderRef={sliderRef} />,
    prevArrow: <CustomArrow direction="prev" sliderRef={sliderRef} />,
    // 自定义指示器（dots）的样式
    appendDots: (dots) => (
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {dots}
      </div>
    ),
    customPaging: (i) => (
      <button
        className={`w-2 h-2 rounded-full transition-all ${
          i === currentSlide ? "bg-white w-8" : "bg-white/50"
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
    ...settings, // 合并外部传入的设置
  };

  return (
    <div className="relative overflow-hidden rounded-lg w-full max-w-full">
      <Slider ref={setSliderRef} {...defaultSettings}>
        {items.map((item) => (
          <div
            key={item.id}
            className="relative h-[300px] md:h-[400px] w-full overflow-hidden"
          >
            <Image
              src={item.imageUrl}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* 可选：添加图片叠加层 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2 text-center px-2">
                {item.content}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
