import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Topbar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format day, date, and time
  const formattedDay = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString();

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-600 text-white text-sm transition-transform duration-300 z-50">
      <div className="max-w-8xl mx-auto px-4 md:px-10 py-2 flex items-center justify-between">
        {/* Left: Date and Time */}
        <div>
          <h1 className="text-xs md:text-base">
            {formattedDay}, {formattedDate} | {formattedTime}
          </h1>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center space-x-4">
          <Link to="#" className="hover:text-blue-500">
            <FaFacebookF className="size-4" />
          </Link>
          <Link to="#" className="hover:text-sky-400">
            <FaTwitter className="size-4" />
          </Link>
          <Link to="#" className="hover:text-pink-500">
            <FaInstagram className="size-4" />
          </Link>
          <Link to="#" className="hover:text-red-500">
            <FaYoutube className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
