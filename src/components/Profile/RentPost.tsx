"use client";
import { imageUrl } from "@/redux/api/api";
import {
  useCreateBookingPostMutation,
  useGetFacilitiesQuery,
  useUpdatePostMutation,
} from "@/redux/apiSlices/ClientProfileSlices";

import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { CalendarDays, ChevronDown, DollarSign } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";

interface IRentPostProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  rentData: any;
  updateInfo: any;
  refetchAllPost: any;
}

const RentPost: React.FC<IRentPostProps> = ({
  setOpen,
  rentData,
  updateInfo,
  refetchAllPost,
}) => {
  const { data: facilities, refetch } = useGetFacilitiesQuery(undefined);
  const [createBookingPost] = useCreateBookingPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [videoFile, setVideoFile] = useState<any[]>([]);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (updateInfo) {
      form.setFieldsValue({
        title: updateInfo?.title,
        address: updateInfo?.address,
        category: updateInfo?.category,
        price: updateInfo?.price,
        priceType: updateInfo?.priceType,
        description: updateInfo?.description,
        size: updateInfo?.size,
        decorationType: updateInfo?.decorationType,
        flore: updateInfo?.flore,
        propertyType: updateInfo?.propertyType,
        bedType: updateInfo?.bedType,
        bedrooms: updateInfo?.bedrooms,
        bathrooms: updateInfo?.bathrooms,
        kitchen: updateInfo?.kitchen,
        dining: updateInfo?.dining,
        moveOn: updateInfo?.moveOn ? moment(updateInfo.moveOn) : null,
        unavailableDay: updateInfo?.unavailableDay?.map((day: string) => {
          return moment(day, "YYYY-MM-DD") || [];
        }),
        allowedGender: updateInfo?.allowedGender,
        guestType: updateInfo?.guestType,
        occupation: updateInfo?.occupation,
        facilities: updateInfo?.facilities || [],
        propertyVideo: updateInfo?.propertyVideo
          ? [
              {
                uid: "-1",
                name: "property-video.mp4",
                status: "done",
                url: `${imageUrl}${updateInfo.propertyVideo}`,
              },
            ]
          : [],
      });

      if (updateInfo?.propertyVideo) {
        setVideoFile([
          {
            uid: "-1",
            name: "property-video.mp4",
            status: "done",
            url: `${imageUrl}${updateInfo.propertyVideo}`,
          },
        ]);
      } else {
        setVideoFile([]);
      }

      if (updateInfo?.propertyImages) {
        const imageFiles = updateInfo?.propertyImages?.map(
          (image: string, index: number) => ({
            uid: index,
            name: `image-${index + 1}.jpg`,
            status: "done",
            url: `${imageUrl}${image}`,
          })
        );
        setFileList(imageFiles);
      }
    }
  }, [updateInfo, form]);

  const handleSwitch = async (values: any) => {
    const formData = new FormData();
    const {
      propertyImages,
      unavailableDay,
      moveOn,
      propertyVideo,
      ...otherValues
    } = values;

    //console.log(propertyVideo);

    const propertyImagesFiles = fileList?.map(
      (file: any) => file?.originFileObj
    );
    if (propertyImagesFiles) {
      for (const image of propertyImagesFiles) {
        formData.append("propertyImages", image);
      }
    }

    const ownerShipImageList = rentData?.ownershipImages?.map(
      (file: any) => file?.originFileObj
    );
    //console.log(ownerShipImageList);

    if (ownerShipImageList) {
      for (const image of ownerShipImageList) {
        formData.append("ownershipImages", image);
      }
    }

    if (videoFile && videoFile[0]?.originFileObj) {
      formData.append("propertyVideo", videoFile[0].originFileObj);
    }

    const formattedUnavailableDays = unavailableDay.map((day: any) =>
      dayjs(day.$d).format("MM/DD/YYYY")
    );

    const formatMoveOn = dayjs(moveOn.$d).format("MM/DD/YYYY");

    const datas = {
      unavailableDay: formattedUnavailableDays,
      moveOn: formatMoveOn,
      ownerType: rentData?.ownerType,
      ownerNumber: rentData?.ownerNumber,
      ...otherValues,
    };

    formData.append("data", JSON.stringify(datas));

    const id = updateInfo?._id;

    if (id) {
      await updatePost({ id, formData }).then((res) => {
        handleResponse(res);
      });
    } else {
      await createBookingPost(formData).then((res) => {
        handleResponse(res);
      });
    }
  };

  const handleResponse = (res: any) => {
    if (res?.data?.success) {
      Swal.fire({
        text: res?.data?.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        setOpen(false);
        setVideoFile([]);
        setFileList([]);
        refetchAllPost();
        refetch();
        form.resetFields();
      });
    } else {
      Swal.fire({
        //@ts-ignore
        text: res?.error?.data?.message,
        icon: "error",
      });
    }
  };

  const facilitiesOptions = facilities?.data;

  return (
    <Form
      form={form}
      onFinish={handleSwitch}
      layout="vertical"
      className="h-[650px] flex flex-col "
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar-container pr-3">
        <div className=" grid overflow-y-auto grid-cols-12 gap-6">
          {/* property video   */}
          <Form.Item
            name="propertyVideo"
            
            getValueFromEvent={(e) => {
              e && setVideoFile(e.fileList);
            }}
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Property Video
              </p>
            }
            style={{ marginBottom: 0 }}
            className="col-span-4"
          >
            <Upload
              accept="video/*"
              maxCount={1}
              listType="picture-card"
              beforeUpload={(file) => {
                const isVideo = file?.type?.startsWith("video/");
                if (!isVideo) {
                  message.error(`${file.name} is not a video file`);
                }
                return isVideo;
              }}
              onChange={({ fileList }) => {
                setVideoFile(fileList);
              }}
              fileList={videoFile}
            >
              {videoFile.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>

          {/* property image  */}
          <Form.Item
            name="propertyImages"
            valuePropName="propertyImages"
            getValueFromEvent={(e) => e && setFileList(e.fileList)}
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Property Images (At least 4)
              </p>
            }
            rules={[
              {
                required: true,
                validator: () => {
                  if (fileList?.length === 0) {
                    return Promise.reject("Please Upload Property Images");
                  }
                  return Promise.resolve();
                },
              },
            ]}
            style={{ marginBottom: 0 }}
            className="col-span-8"
          >
            <Upload
              multiple
              maxCount={12}
              listType="picture-card"
              fileList={fileList}
            >
              {fileList.length < 12 && "+ Upload"}
            </Upload>
          </Form.Item>

          {/* property name */}
          <Form.Item
            name="title"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Property Name
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Property Name!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
          >
            <Input
              placeholder="Enter Property Name"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 24,
                background: "#FEFEFE",
              }}
              className=" placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            />
          </Form.Item>

          {/* property location */}
          <Form.Item
            name="address"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Address
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Property Address!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
          >
            <Input
              suffix={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <FaMapLocationDot size={24} color="#00809E" />
                </div>
              }
              placeholder="Enter Property Address"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 24,
                background: "#FEFEFE",
                padding: "4px 4px 4px 11px",
              }}
              className=" placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            />
          </Form.Item>

          {/* category */}
          <Form.Item
            name="category"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Category
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Property Category",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Property Category
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="room-mate">Room Mate</Select.Option>
              <Select.Option value="flat-mate">Flate Mate</Select.Option>
              {/* <Select.Option value="whole-unit">Whole Unit</Select.Option>
              <Select.Option value="house">House</Select.Option> */}
            </Select>
          </Form.Item>

          {/* property price */}
          <Form.Item
            name="price"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Price
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Property Price!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
            // getValueFromEvent={(e) => {
            //   const value = e.target.value;
            //   return value ? parseInt(value, 10) : '';
            // }}
          >
            <Input
              placeholder="Enter Property Price!"
              // type="number"
              prefix={<DollarSign size={24} color="#A1A1A1" />}
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 24,
                background: "#FEFEFE",
              }}
              className=" placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            />
          </Form.Item>

          {/* price type */}
          <Form.Item
            name="priceType"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Price Type
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Property Price Type",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Price Type
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="day">Per day</Select.Option>
              <Select.Option value="week">Per week</Select.Option>
              <Select.Option value="month">Per month</Select.Option>
              <Select.Option value="year">Per year</Select.Option>
            </Select>
          </Form.Item>

          {/* property description */}
          <Form.Item
            name="description"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                About Accommodation
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Property Details!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="col-span-12"
          >
            <Input.TextArea
              placeholder="Enter Property Details!"
              style={{
                width: "100%",
                height: 150,
                resize: "none",
                boxShadow: "none",
                outline: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 8,
                background: "#FEFEFE",
              }}
              className=" placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            />
          </Form.Item>

          {/* size */}
          <Form.Item
            name="size"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Size
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Property Size!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Property Size
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="room_size">Room Size</Select.Option>
              <Select.Option value="bed_size">Bed Size</Select.Option>
            </Select>
          </Form.Item>

          {/* property decorated */}
          <Form.Item
            name="decorationType"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Decorated
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Property Decoration",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Property Decoration
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="furnished">Furnished</Select.Option>
              <Select.Option value="unfurnished">Unfurnished</Select.Option>
            </Select>
          </Form.Item>

          {/* floor */}
          <Form.Item
            name="flore"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Floor
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Floor number!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
            getValueFromEvent={(e) => {
              const value = e.target.value;
              return value ? parseInt(value, 10) : "";
            }}
          >
            <Input
              placeholder="Enter Floor number!"
              type="number"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 24,
                background: "#FEFEFE",
              }}
              className=" placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6"
            />
          </Form.Item>

          {/* property type */}
          <Form.Item
            name="propertyType"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Property Type
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Property Type",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Property Type
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="flat">Flat</Select.Option>
              <Select.Option value="house">House</Select.Option>
              <Select.Option value="villa">Villa</Select.Option>
              <Select.Option value="house">House</Select.Option>
            </Select>
          </Form.Item>

          {/* bed type */}
          <Form.Item
            name="bedType"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Bed Type
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Bed Type",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Bed Type
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="sofa">Sofa</Select.Option>
              <Select.Option value="sofa-bed">Sofa Bed</Select.Option>
              <Select.Option value="single-bed">Single bed</Select.Option>
              <Select.Option value="double-bed">Double bed</Select.Option>
            </Select>
          </Form.Item>

          {/* bed rooms */}
          <Form.Item
            name="bedrooms"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Bedrooms
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Bedrooms number!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
          >
            <Select
              placeholder="Enter Bedrooms number"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                borderRadius: 24,
                background: "#FEFEFE",
              }}
            >
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
            </Select>
          </Form.Item>

          {/* bathroom */}
          <Form.Item
            name="bathrooms"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Bathroom
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Bathroom number!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
          >
            <Select
              placeholder="Enter Bathroom number"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                borderRadius: 24,
                background: "#FEFEFE",
              }}
            >
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
            </Select>
          </Form.Item>

          {/* Kitchen */}
          <Form.Item
            name="kitchen"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Kitchen
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Kitchen number!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
          >
            <Select
              placeholder="Enter Kitchen"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                borderRadius: 24,
                background: "#FEFEFE",
              }}
            >
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
            </Select>
          </Form.Item>

          {/* Dining */}
          <Form.Item
            name="dining"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Living Room
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Enter Living!",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12"
          >
            <Select
              placeholder="Enter Living"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                borderRadius: 24,
                background: "#FEFEFE",
              }}
            >
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
            </Select>
          </Form.Item>

          {/* entry date */}
          <Form.Item
            name="moveOn"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Move on
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Move on Date",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <DatePicker
              suffixIcon={
                <div
                  style={{
                    background: "#E6F2F5",
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarDays
                    className="cursor-pointer"
                    color="#00809E"
                    size={24}
                  />
                </div>
              }
              placeholder="Select Move on Date"
              style={{
                width: "100%",
                height: 48,
                boxShadow: "none",
                outline: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 24,
                background: "#FEFEFE",
                padding: "4px 4px 4px 11px",
              }}
            />
          </Form.Item>

          {/* leave date */}
          <Form.Item
            name="unavailableDay"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Unavailable Dates
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Property Decoration",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <DatePicker
              multiple
              suffixIcon={
                <div
                  style={{
                    background: "#E6F2F5",
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarDays
                    className="cursor-pointer"
                    color="#00809E"
                    size={20}
                  />
                </div>
              }
              placeholder="Select Move on Date"
              style={{
                height: 48,
                width: "100%",
                boxShadow: "none",
                outline: "none",
                border: "1px solid #E0E0E0",
                borderRadius: 24,
                background: "#FEFEFE",
                padding: "4px 4px 4px 11px",
              }}
            />
          </Form.Item>

          {/* allowed gender */}
          <Form.Item
            name="allowedGender"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Allowed Gender
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Allowed Gender",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Allowed Gender
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item>

          {/* guest type */}
          <Form.Item
            name="guestType"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Guest Type
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Guest Type",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="lg:col-span-6 col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Guest Type
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Others">All</Select.Option>
            </Select>
          </Form.Item>

          {/* Occupation */}
          <Form.Item
            name="occupation"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Occupation
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Select Occupation",
              },
            ]}
            style={{ marginBottom: 0 }}
            className="col-span-12 customSelect"
          >
            <Select
              placeholder={
                <p className="text-[#818181] text-[16px] font-normal leading-6">
                  Occupation
                </p>
              }
              style={{
                height: 48,
                borderRadius: 24,
              }}
              suffixIcon={
                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                  <ChevronDown size={24} color="#00809E" />
                </div>
              }
            >
              <Select.Option value="any">All</Select.Option>
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="professional">Professional</Select.Option>
              <Select.Option value="professional">Others</Select.Option>
            </Select>
          </Form.Item>

          {/* facilities */}
          <Form.Item
            name="facilities"
            label={
              <p className="font-medium text-[16px] leading-6 text-[#636363]">
                Facilities
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please Choose Taken Facilities",
              },
            ]}
            className="col-span-12"
          >
            <Checkbox.Group className="style-checkbox flex items-center flex-wrap">
              {facilitiesOptions?.map((option: any) => (
                <Checkbox
                  key={option?._id}
                  value={option?._id}
                  style={{
                    background: "#F3F3F3",
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                    padding: "0 12px",
                    borderRadius: "8px",
                    color: "red",
                  }}
                  className="flex text-primary items-center justify-center rounded-xl"
                >
                  <p className="text-[#333333] font-medium text-[14px] leading-6">
                    {option.name}
                  </p>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[#767676] text-sm leading-[24px] font-normal">
          We will verify your all documents for security purpose, Your post will
          be published within 24 hours of verification.
        </p>
        <Form.Item
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            width: "100%",
            marginBottom: 0,
          }}
        >
          <Button
            htmlType="submit"
            style={{
              width: 102,
              height: 40,
              background: "#00809E",
              color: "#ffffff",
              border: "none",
              borderRadius: 24,
              outline: "none",
              boxShadow: "none",
              fontWeight: 700,
            }}
          >
            New Post
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default RentPost;
