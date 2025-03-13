import React from "react";
import CompanyLogo from "./CompanyLogo";
import Link from "next/link";

const FooterData = {
  apartmentName: "Willow Creek Apartments",
  address: "1250 Willow Creek Dr, Brookdale, Tx 75201",

  website: "https://www.mywillowcreekapartment.com/",
  phone: "(555)-867-3412",
  footerButton: "Admin login",
  logoName: "TENANT",
};

const Footer = () => {
  return (
    <div className="bg-secondary-blue flex justify-between p-8">

      <div className="text-alternate-light-gray md:block hidden">
        <p className="text-3xl py-2">{FooterData.apartmentName}</p>
        <p className="tracking-wider">Address: {FooterData.address}</p>
        <div className="flex justify-center gap-1 tracking-wider">
          <p className="">Website:</p>
          <Link className="underline" href={`${FooterData.website}`}>{FooterData.website}</Link>
        </div>
        <p className="tracking-wider">Phone: {FooterData.phone}</p>

      </div>

      <div className="flex items-center gap-10">
        <button className="bg-primary-green rounded-md p-3 text-alternate-light-gray text-lg hover:translate-0.5">
          {FooterData.footerButton}
        </button>
        <h1 className="text-2xl font-semibold text-alternate-light-gray">
          {FooterData.logoName}
        </h1>
      </div>
    </div>
  );
};

export default Footer;
