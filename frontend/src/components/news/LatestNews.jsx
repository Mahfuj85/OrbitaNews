import React, { useState, useEffect, useRef } from "react";
import Loading from "../../components/Loading";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { RouteNewsDetails } from "@/helpers/RouteName";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = news.length;
  const slideRef = useRef(null);

  // Fetch news on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/latest`)
      .then((res) => res.json())
      .then((data) => setNews(data.news || []))
      .catch(console.error);
  }, []);

  //  console.log(news);

  // Auto slide interval
  useEffect(() => {
    if (totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Reset index if out of bounds
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalSlides]);

  // Handlers for prev/next
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  if (news.length === 0) return <Loading />;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center gap-2">
        <span className="bg-red-500 w-1 h-7 -mt-[5px]"></span>
        <h3 className="text-2xl font-bold mb-1 capitalize text-black">
          Latest News
        </h3>
      </div>
      <div
        ref={slideRef}
        className="whitespace-nowrap transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {news.map((item) => (
          <Link
            key={item._id}
            to={RouteNewsDetails(item.category.name.toLowerCase(), item.slug)}
            className="inline-block w-full relative text-white h-[343.5px]"
          >
            <img
              src={item.featuredImage}
              alt={item.title}
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute top-28 inset-0 flex flex-col justify-center px-6 md:px-12">
              <span className="inline-block self-start px-2 mb-2 text-sm md:text-base font-semibold uppercase bg-red-500">
                {item.category.name}
              </span>
              <h2 className="text-xl md:text-3xl font-bold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                {item.title}
              </h2>
              <p className="text-sm md:text-lg">By {item.author.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-16 left-3 -translate-y-1/2 bg-white hover:bg-opacity-70 text-black rounded-full"
        aria-label="Previous Slide"
      >
        <MdKeyboardArrowLeft className="w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-16 right-3 -translate-y-1/2 bg-white hover:bg-opacity-70 text-black rounded-full"
        aria-label="Next Slide"
      >
        <MdKeyboardArrowRight className="w-8" />
      </button>
    </div>
  );
};

export default LatestNews;

// MAIN CODE
// import React, { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const LatestNews = () => {
//   const [news, setNews] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BACKEND_URL}/news/latest`)
//       .then((res) => res.json())
//       .then((data) => {
//         setNews(data.news || []);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   if (news.length === 0) return <Loading />;

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));
//   };

//   const currentNews = news[currentIndex];

//   //if (loading) return <Loading />;

//   return (
//     <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
//       {/* Background image */}
//       <div
//         className="h-64 md:h-96 bg-cover bg-center transition-all duration-500"
//         style={{ backgroundImage: `url(${currentNews.featuredImage})` }}
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-6 md:px-12 text-white">
//         <span className="inline-block self-start text-sm md:text-base font-semibold uppercase mb-2 bg-red-500 text-white px-2">
//           {currentNews.category.name}
//         </span>
//         <h2 className="text-xl md:text-3xl font-bold mb-2">
//           {currentNews.title}
//         </h2>
//         <p className="text-sm md:text-lg">By {currentNews.author.name}</p>
//       </div>

//       {/* Navigation buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute top-8 left-3 -translate-y-1/2 bg-white  hover:bg-opacity-70 text-black rounded-full"
//         aria-label="Previous Slide"
//       >
//         <MdKeyboardArrowLeft className="w-8" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-8 right-3 -translate-y-1/2 bg-white hover:bg-opacity-70 text-black rounded-full"
//         aria-label="Next Slide"
//       >
//         <MdKeyboardArrowRight className="w-8" />
//       </button>
//     </div>
//   );
// };

// export default LatestNews;
