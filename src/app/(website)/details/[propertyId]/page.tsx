"use client";
import React from "react";
import DetailsClient from "../DetailsClient";
import OtherProperty from "./OtherProperty";
interface IProps {
  params: {
    propertyId: string;
  };
}

const page = ({ params: { propertyId } }: IProps) => {
  return (
    <React.Fragment>
      <DetailsClient id={propertyId} />
      <OtherProperty id={propertyId} />
    </React.Fragment>
  );
};

export default page;
