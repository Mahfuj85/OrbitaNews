import React from "react";
import LatestNews from "../components/news/LatestNews";
import CategoryNews from "@/components/news/CategoryNews";
import PopularNews from "@/components/news/PopularNews";
import SportsNews from "@/components/news/SportsNews";
import EducationNews from "@/components/news/EducationNews";
import HealthNews from "@/components/news/HealthNews";
import AlsoRead from "@/components/news/AlsoRead";

const HomePage = () => {
  return (
    <main className="flex flex-col space-y-4">
      {/* 1st row */}
      <div className="bg-slate-50">
        <div className="px-1 md:px-4 py-8">
          <div className="flex flex-wrap gap-7">
            <div className="w-full lg:w-[48%]">
              <LatestNews />
            </div>
            <div className="w-full lg:w-[48%]">
              <CategoryNews category="technology" />
            </div>
          </div>
        </div>
      </div>

      {/* 2nd row */}
      <div className="bg-slate-50">
        <div className="px-1 md:px-4 py-8">
          <PopularNews />
        </div>
      </div>

      {/* 3rd row */}
      <div className="bg-slate-50">
        <div className="px-1 md:px-4 py-8">
          <div className="flex flex-wrap gap-5">
            <div className="w-full lg:w-[68%]">
              <SportsNews category="sports" />
            </div>
            <div className="w-full lg:w-[28%]">
              <EducationNews category="education" />
            </div>
          </div>
        </div>
      </div>

      {/* 4th row */}
      <div className="bg-slate-50">
        <div className="px-1 md:px-4 py-8">
          <div className="flex flex-wrap gap-5">
            <div className="w-full lg:w-[63%]">
              <HealthNews category="health" />
            </div>
            <div className="w-full lg:w-[33%]">
              <AlsoRead />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
