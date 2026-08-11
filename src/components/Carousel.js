import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import { EASE_OUT } from "../lib/motion";

// 从 MDX 图片节点里取出 { src, alt }。
// gatsby-remark-images 会把 Markdown 图片转成带 dangerouslySetInnerHTML 的
// <span>，内部是 <img class="gatsby-resp-image-image">；这里两种形态都兼容。
function extractImageInfo(child) {
  if (!child) return null;

  if (child.type === "img") {
    return {
      src: child.props.src,
      alt: child.props.alt || "",
    };
  }

  const html = child.props?.dangerouslySetInnerHTML?.__html;
  if (!html || typeof DOMParser === "undefined") return null;

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    if (!img) return null;

    const srcset = img.getAttribute("srcset");
    const src = img.getAttribute("src");
    // 优先取 srcSet 里尺寸最大的一张，预览时画质更好
    const largest = srcset
      ?.split(",")
      .map((candidate) => {
        const [url, descriptor] = candidate.trim().split(/\s+/);
        return { url, width: parseInt(descriptor, 10) || 0 };
      })
      .filter((candidate) => candidate.url)
      .sort((a, b) => b.width - a.width)[0]?.url;

    return {
      src: largest || src,
      alt: img.getAttribute("alt") || "",
    };
  } catch {
    return null;
  }
}

function CarouselArrow({ direction, onClick, onPrev, onNext, label }) {
  const Icon = direction === "next" ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(e);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          onPrev?.();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          onNext?.();
        }
      }}
      className={`absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-lightest/90 text-purple-dark shadow-md transition-colors duration-200 cursor-pointer hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-light ${
        direction === "next" ? "right-2 md:right-3" : "left-2 md:left-3"
      }`}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.2} />
    </button>
  );
}

function NextArrow(props) {
  return (
    <CarouselArrow
      direction="next"
      onClick={props.onClick}
      onPrev={props.onPrev}
      onNext={props.onNext}
      label="下一张图片"
    />
  );
}

function PrevArrow(props) {
  return (
    <CarouselArrow
      direction="prev"
      onClick={props.onClick}
      onPrev={props.onPrev}
      onNext={props.onNext}
      label="上一张图片"
    />
  );
}

function LightboxArrow({ direction, onClick }) {
  const Icon = direction === "next" ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      aria-label={direction === "next" ? "下一张图片" : "上一张图片"}
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors duration-200"
      style={direction === "next" ? { right: "0.75rem" } : { left: "0.75rem" }}
    >
      <Icon className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
}

function Lightbox({ images, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const startXRef = useRef(null);
  const suppressClickRef = useRef(false);
  const image = images[index];
  const count = images.length;

  const prev = useCallback(() => {
    if (index > 0) onChange(index - 1);
  }, [index, onChange]);

  const next = useCallback(() => {
    if (index < count - 1) onChange(index + 1);
  }, [count, index, onChange]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, onClose, prev]);

  const onTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const startX = startXRef.current;
    startXRef.current = null;
    if (startX == null) return;

    const deltaX = e.changedTouches[0].clientX - startX;
    if (Math.abs(deltaX) > 48) {
      suppressClickRef.current = true;
      if (deltaX < 0) next();
      else prev();
    }
  };

  const handleBackdropClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onClose();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="图片预览"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-silhouette-darkest/95 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: EASE_OUT } }}
      onClick={handleBackdropClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="关闭预览"
        onClick={onClose}
        className="absolute top-3 right-3 md:top-5 md:right-5 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors duration-200"
      >
        <X className="w-6 h-6" />
      </button>

      {index > 0 && (
        <LightboxArrow
          direction="prev"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        />
      )}
      {index < count - 1 && (
        <LightboxArrow
          direction="next"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={image.src}
          src={image.src}
          alt={image.alt}
          draggable={false}
          className="max-w-[92vw] max-h-[82vh] md:max-h-[86vh] object-contain rounded-sm shadow-2xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.25, ease: EASE_OUT },
          }}
          exit={{
            opacity: 0,
            scale: 0.97,
            transition: { duration: 0.15, ease: EASE_OUT },
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      <p className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/85 text-sm tracking-wider">
        {index + 1} / {count}
      </p>
    </motion.div>
  );
}

function Carousel({ children }) {
  const sliderRef = useRef(null);
  const dragStartRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [images, setImages] = useState([]);

  // DOMParser 只在浏览器存在；Carousel 会被 Gatsby SSR 渲染，
  // 因此提取放到 effect 里，保证服务端 HTML 与客户端水合首帧一致，
  // 挂载后再补齐指示点与预览能力。
  useEffect(() => {
    setImages(
      React.Children.toArray(children)
        .map(extractImageInfo)
        .filter(Boolean),
    );
  }, [children]);

  const hasMultiple = images.length > 1;

  const goTo = useCallback((index) => {
    sliderRef.current?.slickGoTo(index);
  }, []);

  const goNext = useCallback(() => {
    sliderRef.current?.slickNext();
  }, []);

  const goPrev = useCallback(() => {
    sliderRef.current?.slickPrev();
  }, []);

  const openLightbox = (index) => {
    if (images.length === 0) return;
    setLightboxIndex(index);
  };

  const handleSlidePointerDown = (e) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleSlidePointerUp = (e) => {
    const start = dragStartRef.current;
    dragStartRef.current = null;
    if (!start) return;
    // 滑动/拖拽切换图片后，浏览器仍可能补发 click，这里跳过以免误开预览
    if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > 12) {
      suppressClickRef.current = true;
    }
  };

  const handleSlideClick = (index) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    openLightbox(index);
  };

  const changeLightboxIndex = (index) => {
    goTo(index);
    setLightboxIndex(index);
  };

  const settings = {
    infinite: hasMultiple,
    speed: 300,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: hasMultiple,
    nextArrow: <NextArrow onPrev={goPrev} onNext={goNext} />,
    prevArrow: <PrevArrow onPrev={goPrev} onNext={goNext} />,
    swipe: true,
    touchMove: true,
    draggable: true,
    accessibility: false,
    afterChange: setCurrentSlide,
  };

  const slides = React.Children.map(children, (child, index) => (
    <div
      key={index}
      aria-hidden={index !== currentSlide}
      onClick={() => handleSlideClick(index)}
      onPointerDown={handleSlidePointerDown}
      onPointerUp={handleSlidePointerUp}
      className="group relative !h-full !flex items-center justify-center cursor-zoom-in [&>span]:w-full [&>img]:w-full"
    >
      {child}
      <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center">
        <span className="bg-black/45 text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn className="w-5 h-5" />
        </span>
      </div>
    </div>
  ));

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full [&_.slick-track]:!flex [&_.slick-slide]:!flex [&_.slick-slide]:!h-auto [&_.slick-slide>div]:!w-full">
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="图片轮播"
          className="overflow-hidden"
        >
          <Slider ref={sliderRef} {...settings}>
            {slides}
          </Slider>
        </div>

        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {lightboxIndex !== null && (
                <Lightbox
                  key="lightbox"
                  images={images}
                  index={lightboxIndex}
                  onChange={changeLightboxIndex}
                  onClose={() => setLightboxIndex(null)}
                />
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </MotionConfig>
  );
}

export default Carousel;
