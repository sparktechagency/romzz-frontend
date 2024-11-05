"use client";
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import call from "@/assets/call.png";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { ImagePlus, Send, X } from "lucide-react";
import Logo from "@/assets/chat-logo.jpg";
import { useGetProfileQuery } from "@/redux/apiSlices/AuthSlices";
import { useRouter } from "next/navigation";
import {
  useCreateConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/apiSlices/ChatSlices";
import toast from "react-hot-toast";
import moment from "moment";
import { imageUrl } from "@/redux/api/api";
import { UserContext } from "@/app/provider/User";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string | undefined>("");
  const { socket } = useContext<any>(UserContext);
  const [userId, setUserId] = useState(null);
  const { data: userProfile } = useGetProfileQuery(undefined);
  const [createConversation] = useCreateConversationMutation();
  const [sendMessage] = useSendMessageMutation();
  const { data: getMessages } = useGetMessagesQuery(userId);
  const userMessages = getMessages?.data?.messages;
  console.log(userMessages);
  const [messageList, setMessageList] = useState<any>([]);

  const scrollRef = useRef<any>();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    setMessageList(userMessages);
  }, [userMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

  const handleConnection = useCallback(({ data }: any) => {
    console.log(data);
    setMessageList((prev: any) => [...prev, data]);
  }, []);

  useEffect(() => {
    const event = "messageReceived";
    socket.on(event, handleConnection);
    return () => {
      socket.off(event, handleConnection);
    };
  }, [socket, handleConnection]);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImage(event.target.files?.[0]);
    }
  };

  useEffect(() => {
    if (image) {
      form.setFieldsValue({ image: image });
    }
  }, [form, image]);

  const handleCreateConversion = async () => {
    if (userProfile?.data) {
      await createConversation(undefined).then((res) => {
        if (res?.data?.success) {
          setOpen(true);
          setUserId(res?.data?.data?._id);
        } else {
          setOpen(false);
          toast.error("something wrong");
        }
      });
    } else {
      setOpen(false);
      router.push("/login");
    }
  };

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    if (values?.image) {
      formData.append("image", values?.image);
    }
    if (values?.text) {
      formData.append("content", values?.text);
    }

    await sendMessage({ userId, formData }).then((result) => {
      form.resetFields();
      setImage(null);
    });
  };

  return (
    <div>
      <div
        className={`
                    w-[349px] overflow-hidden h-[451px] fixed right-[100px] bottom-[120px]
                    ${
                      open
                        ? "z-20 transition-all duration-200 "
                        : "-z-50 transition-all duration-200"
                    }
                `}
      >
        <div
          className={`
                        bg-white border-2 border-primary rounded-[13px]
                        ${
                          open
                            ? "translate-x-0 transition-all duration-200 "
                            : "translate-x-[360px] transition-all duration-200"
                        }
                    `}
        >
          {/* head */}
          <div className="bg-primary px-4 flex items-center justify-between h-[60px] w-full rounded-t-[9px]">
            <Image alt="Logo" src={Logo} width={100} height={50} />

            <div className="flex items-center gap-6">
              <input
                onChange={handleChangeImage}
                id="image"
                type="file"
                className="hidden"
              />
              <label
                htmlFor="image"
                className="w-10 h-10 cursor-pointer rounded-full bg-[#F7F7F7] flex items-center justify-center"
              >
                <ImagePlus size={24} color="#3399B1" />
              </label>

              <X
                className="cursor-pointer"
                onClick={() => setOpen(false)}
                color="#F7F7F7"
                size={24}
              />
            </div>
          </div>

          {/* body */}
          <div
            className="h-[325px] chat overflow-y-auto bg-white"
            ref={scrollRef}
          >
            {messageList?.map((message: any, index: number) => {
              // console.log(message);
              // console.log(userProfile?.data?._id);
              return (
                <div
                  key={index}
                  className={`flex p-2 ${
                    userProfile?.data?._id === message?.senderId?._id
                      ? "items-end justify-end"
                      : "items-start justify-start"
                  }`}
                >
                  <div>
                    {message?.attachments?.length > 0 ? (
                      <div>
                        {message?.attachments?.map(
                          (images: any, index: number) => (
                            <div
                              key={index}
                              className="bg-[#FFF5F1] p-2 rounded-lg"
                            >
                              <Image
                                src={`${imageUrl}${images}`}
                                alt="asd"
                                height={200}
                                width={200}
                                className=" w-[240] h-[120] p-2 rounded-lg"
                              />
                              <p className="text-[14px] text-right leading-4 text-[#767676] font-medium">
                                {message?.content}
                              </p>
                              <p className="text-right text-[13px] leading-6 text-[#A1A1A1] font-normal">
                                {moment(message?.createdAt).format("h:mm a")}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="bg-[#FFF5F1] w-[240px] p-2 rounded-lg">
                        <p className="text-[14px] leading-4 text-[#767676] font-medium">
                          {message?.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* footer  */}
          <div className="relative border-t-[1px] border-[#F0EFEF] p-2">
            <div
              style={{ display: image ? "block" : "none" }}
              className="absolute left-2 -top-16 border border-primary"
            >
              <div
                className="relative w-16 h-16"
                onClick={() => setImage(null)}
              >
                {image && (
                  <Image
                    alt="message-image"
                    src={URL?.createObjectURL(image)}
                    fill
                  />
                )}
              </div>
            </div>

            <Form
              form={form}
              onFinish={onSubmit}
              className="flex items-center justify-between"
            >
              <Form.Item style={{ marginBottom: 0 }} name={"image"}></Form.Item>

              <Form.Item
                style={{ marginBottom: 0 }}
                className="flex-1"
                name={"text"}
              >
                <Input
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Message...."
                  style={{
                    width: "100%",
                    border: "none",
                    background: "#F3F3F3",
                    borderRadius: 4,
                    outline: "none",
                    boxShadow: "none",
                    height: 40,
                  }}
                  className="placeholder:text-[#A1A1A1]"
                />
              </Form.Item>
              <Form.Item
                style={{
                  marginBottom: 0,
                  marginLeft: 10,
                  background: "#00809E",
                  width: 40,
                  height: 40,
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  htmlType="submit"
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    padding: 0,
                    borderRadius: 0,
                  }}
                >
                  <Send size={20} color="#F8F8F8" />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div className="z-20 fixed right-6 bottom-[120px] flex items-center">
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
          <BiSolidLeftArrow
            size={16}
            color="#FF9773"
            className={` ${
              open
                ? "translate-x-0 transition-all duration-200"
                : "translate-x-5 transition-all duration-200"
            }  `}
          />
        </div>
        <div
          onClick={() => {
            setOpen(!open), handleCreateConversion();
          }}
          className=" w-[50px] cursor-pointer flex items-center justify-center h-[50px] rounded-full border-2 p-2 border-primary"
        >
          <Image
            alt="call-center"
            src={call}
            width={35}
            height={35}
            className={``}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
