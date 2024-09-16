/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

const NoContent = ({
  title = "  No Content Found",
  desc = "  Looks like there haven't' any data yet.",
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className="text-center my-12 min-h-[60vh] flex justify-center items-center">
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
        <p className="text-gray-500 mb-6">{desc}</p>

        <Link href="/">
          <button className="mt-6 px-6 py-2 bg-primary text-white rounded-md">
            Explore Romzz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoContent;
