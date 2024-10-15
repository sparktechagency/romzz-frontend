"use client";
import Heading from "@/components/shared/Heading";
import React, { useState } from "react";
import photo from "../../../assets/news.png";
import Image from "next/image";
import { Pagination } from "antd";
import Link from "next/link";
import { useGetBlogsQuery } from "@/redux/features/web/api/blogApi";
import NoContent from "@/components/shared/NoContent";
import { TBlog } from "@/types/common";
import { imageUrl } from "@/redux/api/api";

const NewsClient = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetBlogsQuery([
    { name: "limit", value: 8 },
    { name: "page", value: page },
  ]);
  if (isLoading) return <p>Loading...</p>;

  const handlePageChange = (page: number) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="container py-10">
      {/* heading  */}
      <Heading style="font-normal text-[32px]  leading-[48px] text-[#3E3E3E] mb-6">
        <span className="text-primary">Romzz</span> News
      </Heading>

      {/* news container */}

      {data?.data?.length > 0 ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {data?.data?.map((news: TBlog, index: number) => {
            return (
              <div
                key={index}
                className="flex relative bg-red-200 items-end group overflow-hidden cursor-pointer"
              >
                <Image
                  alt="news"
                  src={`${imageUrl}${news?.image}`}
                  width={1300}
                  height={300}
                />

                <div className="absolute w-full left-0  p-4">
                  <div className="translate-y-[86px]  transition-all duration-500 group-hover:translate-y-0">
                    <Heading
                      name={news.title}
                      style="font-semibold lg:text-[24px] text-[21px] leading-[32px] mb-6 text-[#FAFAFA]"
                    />
                    <p className="text-[#FAFAFA]">
                      {news.description.slice(0, 100)}
                    </p>
                    <Link href={`/newsDetails/${news._id}`}>
                      <div className="text-[#FAFAFA] flex items-center gap-2 underline">
                        <p>Visit Now</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoContent
          title="No News Contend Found"
          desc="Please news from admin dashboard"
        />
      )}

      {/* pagination */}
      <div className="flex items-center justify-center mt-6">
        <Pagination
          onChange={handlePageChange}
          current={page}
          pageSize={data?.meta.limit}
          total={data?.meta.total}
        />
      </div>
    </div>
  );
};

export default NewsClient;
