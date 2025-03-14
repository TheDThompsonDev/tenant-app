import React from "react";
import ReuseableButton from "./ReuseableButton";
import LABELS from "../constants/labels";
import Link from "next/link";

const FooterData = {
  apartmentName: "Willow Creek Apartments",
  address: "1250 Willow Creek Dr, Brookdale, Tx 75201",

  website: "https://www.mywillowcreekapartment.com/",
  phone: "(555)-867-3412",
  footerButton: "Sign In",
  logoName: "tenant",
};

const Footer = () => {
  return (
    <div className="bg-alternate-light-gray md:bg-secondary-blue flex justify-between p-8">

      <div className=" md:text-alternate-light-gray md:block hidden">
        <p className="text-3xl py-2">{FooterData.apartmentName}</p>
        <p className="tracking-wider">Address: {FooterData.address}</p>
        <div className="flex justify-center gap-1 tracking-wider">
          <p className="">Website:</p>
          <Link className="underline" href={`${FooterData.website}`}>
            {FooterData.website}
          </Link>
        </div>
        <p className="tracking-wider">Phone: {FooterData.phone}</p>
      </div>

      <div className="flex items-center gap-10">
        <ReuseableButton 
        href={LABELS.buttons.FooterSignUp.href}
        label={LABELS.buttons.FooterSignUp.label}
        style={LABELS.buttons.FooterSignUp.style}
        />
        <h1 className="text-3xl md:text-2xl font-semibold text-primary-black md:text-alternate-light-gray uppercase">
          {FooterData.logoName}
        </h1>
      </div>
    </div>
  );
};

export default Footer;
