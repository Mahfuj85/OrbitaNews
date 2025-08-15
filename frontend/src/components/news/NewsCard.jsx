import { RouteNewsDetails } from "@/helpers/RouteName";
import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ props }) => {
  return (
    <Link to={RouteNewsDetails(props.category.slug, props.slug)}>
      <div className="inline-block w-full h-40 relative text-white">
        <img
          src={props.featuredImage}
          alt={props.title}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute top-14 inset-0 flex flex-col justify-center px-1 md:px-2">
          <span className="inline-block self-start px-2 mb-2 text-sm md:text-sm font-semibold uppercase bg-red-500">
            {props.category.name}
          </span>
          <h2 className="text-base md:text-sm font-bold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
            {props.title}
          </h2>
          <p className="text-md md:text-sm">By {props.author.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
