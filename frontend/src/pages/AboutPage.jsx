import { RouteNewsByCategory } from "@/helpers/RouteName";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data.category || []))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About OrbitaNews</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Your trusted source for breaking news, in-depth analysis, and
            real-time updates from around the globe.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          At <span className="font-semibold">OrbitaNews</span>, our mission is
          simple: to deliver accurate, unbiased, and timely news that empowers
          our readers to make informed decisions. We believe in the power of
          journalism to shape perspectives, spark conversations, and bring
          communities together.
        </p>
      </section>

      {/* What We Cover */}
      <section className="bg-white py-12 border-t border-b">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            What We Cover
          </h2>
          <p className="text-gray-700 mb-6">
            From breaking headlines to detailed reports, we cover stories that
            matter most to you:
          </p>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={RouteNewsByCategory(category.slug)}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <span className="font-semibold">{category.name}</span>
              </Link>
            ))}
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Meet Our Team
        </h2>
        <p className="text-gray-700 mb-6">
          OrbitaNews is powered by a dedicated team of{" "}
          <b>experienced journalists, editors, and digital storytellers</b>. We
          combine the principles of traditional journalism with modern digital
          storytelling to create content that is{" "}
          <b>credible, engaging, and easy to consume</b>.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "Editor-in-Chief" },
            { name: "Mark Thompson", role: "Senior Political Reporter" },
            { name: "Emma Davis", role: "Technology Correspondent" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-center">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Stay Informed with OrbitaNews
          </h2>
          <p className="mb-6 text-blue-100">
            Join thousands of readers who rely on us for trustworthy news every
            day.
          </p>
          <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-100 transition">
            Subscribe Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
