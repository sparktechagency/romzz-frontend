"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Logo from "@/assets/Logo.png";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { Badge, Drawer } from "antd";
import { Bell, Heart, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Languages from "../Languages";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetNotificationQuery,
  useUpdateMakeAsSeenMutation,
} from "@/redux/features/web/api/notification"; 

import { imageUrl } from "@/redux/api/api";
import { UserContext } from "@/app/provider/User";

const Navbar = () => {
  const wishlist = useAppSelector((state) => state.wishlist.properties);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [updateMakeAsSeen] = useUpdateMakeAsSeenMutation();
  const { data: Notifications, refetch: notificationFetch } =
    useGetNotificationQuery(undefined);
  const { user: userInfo } = useContext<any>(UserContext);

  const pathName = usePathname();
  const router = useRouter();
  const totalNotification = Notifications?.data?.result?.filter(
    (item: any) => item?.isSeen === false
  ).length;

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUpdateNotification = async () => {
    await updateMakeAsSeen(undefined).then((res) => {
      //console.log(res)
      notificationFetch();
      router.push("/notification");
    });
  };

  const profileImg = userInfo?.avatar.startsWith("https")
    ? userInfo?.avatar
    : `${imageUrl}${userInfo?.avatar}`;

  const item = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Services",
      path: "/services",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "News",
      path: "/news",
    },
    {
      label: "Supports",
      path: "/supports",
    },
  ];

  return (
    <div
      className={`
                sticky z-10 top-0 w-full left-0 transition-all duration-200
                ${
                  isScrolled
                    ? "bg-white bg-opacity-100"
                    : "bg-[#F3F3F3] bg-opacity-[80%]"
                }
            `}
    >
      <div className="container relative  flex items-center justify-between h-[96px]">
        {/* logo */}
        <Link href={"/"}>
          <Image alt="Logo" src={Logo} width={164} height={70} />
        </Link>

        {/* routes container */}
        <div className="hidden  lg:flex items-center">
          {item.map((menu, index) => {
            return (
              <Link
                key={index}
                className={`
                                         w-[86px] h-12 text-center flex items-center justify-center text-[16px] leading-5 
                                        ${
                                          menu.path === pathName
                                            ? "text-primary font-bold transition-all duration-200"
                                            : "text-base font-normal"
                                        }
                                    `}
                href={`${menu.path}`}
              >
                {menu.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden  lg:flex items-center gap-6">
          <div>
            <Languages />
          </div>
          <Link href={"/wishlist"}>
            <Badge count={wishlist?.length || 0} color="#FF9773">
              <Heart color="#767676" size={24} />
            </Badge>
          </Link>

          <div onClick={() => handleUpdateNotification()}>
            <Badge count={totalNotification} color="#FF9773">
              <Bell className="cursor-pointer" color="#767676" size={24} />
            </Badge>
          </div>

          {userInfo ? (
            <Link href="/profile" className=" ">
              <div className=" flex items-center gap-1 font-normal  text-[#767676]  text-[16px]">
                <Image
                  src={profileImg}
                  alt="Profile Image"
                  height={42}
                  width={42}
                  style={{ borderRadius: "100%" }}
                  unoptimized
                />
                <p>{userInfo?.fullName}</p>
              </div>
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="font-normal w-[120px] lg:w-auto px-4 h-12 rounded-[24px] bg-primary text-[#F3F3F3] hidden  lg:flex items-center justify-center gap-2 text-[16px] leading-6"
            >
              <AiOutlineUser size={20} color="#F3F3F3" /> Sign In
            </Link>
          )}
        </div>

        <div className="block lg:hidden">
          <Menu onClick={() => setOpenDrawer(true)} size={30} color="#555656" />
        </div>
      </div>

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <Image alt="Logo" src={Logo} width={100} height={60} />
            </Link>
            <X
              onClick={() => setOpenDrawer(false)}
              color="black"
              className="cursor-pointer"
              size={26}
            />
          </div>
        }
        placement={"left"}
        closable={false}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        key={"left"}
      >
        <div className="flex items-start justify-center flex-col gap-6 mb-6">
          {item.map((menu, index) => {
            return (
              <Link
                key={index}
                className={`
                                        h-[21px]
                                        text-[16px] leading-6 
                                        ${
                                          menu.path === pathName
                                            ? "text-primary font-bold transition-all duration-200"
                                            : "text-base font-normal"
                                        }
                                        border-[#D9D9D9]
                                        hover:text-primary
                                    `}
                onClick={() => setOpenDrawer(false)}
                href={`${menu.path}`}
              >
                {menu.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-6">
          <Link href={"/wishlist"}>
            <Badge count={wishlist?.length || 0} color="#FF9773">
              <Heart color="#767676" size={24} />
            </Badge>
          </Link>

          <div onClick={() => handleUpdateNotification()}>
            <Badge count={totalNotification} color="#FF9773">
              <Bell color="#767676" size={24} />
            </Badge>
          </div>

          {userInfo ? (
            <Link href="/profile" className=" ">
              <div className=" flex items-center gap-1 font-normal  text-[#767676]  text-[16px]">
                <Image
                  src={profileImg}
                  alt="asd"
                  height={42}
                  width={42}
                  style={{ borderRadius: "100%" }}
                />
                <p>{userInfo?.fullName}</p>
              </div>
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="font-normal w-[120px] lg:w-auto  h-12 rounded-[24px] bg-primary text-[#F3F3F3] flex items-center justify-center gap-2 text-[14px] leading-6"
            >
              <AiOutlineUser size={20} color="#F3F3F3" /> Sign In
            </Link>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
