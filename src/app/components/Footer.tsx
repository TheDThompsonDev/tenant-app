"use client";

import React from "react";
import Button from "./Button";
import LABELS from "../constants/labels";
import Link from "next/link";
import { useState, useEffect } from "react";
import LogoutBtn from "./LogoutBtn";
import { getCurrentUser } from "@/lib/appwrite";
import CompanyLogo from "./CompanyLogo";

const FooterData = {
  apartmentName: "Willow Creek Apartments",
  address: "1250 Willow Creek Dr, Brookdale, Tx 75201",

  website: "https://www.mywillowcreekapartment.com/",
  phone: "(555)-867-3412",
  footerButton: "Sign In",
  logoName: "tenant",
};

const buttonStyles = {
  signUp: "bg-primary-green text-white ",
  logout: "bg-primary-green text-white ",
};

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const result = await getCurrentUser();
        setIsLoggedIn(result.success);
      } catch (error) {
        console.error("Error checking Footer auth status:", error);
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <div className="bg-secondary-blue flex justify-between p-8 items-center">
      <div className="text-alternate-light-gray hidden md:block w-1/2">
        <p className="text-3xl py-2">{FooterData.apartmentName}</p>
        <p className="tracking-wider">Address: {FooterData.address}</p>
        <div className="flex gap-1 tracking-wider">
          <p className="">Website:</p>
          <Link className="underline" href={FooterData.website}>
            {FooterData.website}
          </Link>
        </div>
        <p className="tracking-wider">Phone: {FooterData.phone}</p>
      </div>

      <div className="flex items-center  gap-4 text-white ml-auto">
        {isLoggedIn ? (
          <LogoutBtn bgColor="bg-primary-green" />
        ) : (
          <Button
            href={LABELS.buttons.FooterLogin.href}
            label={LABELS.buttons.FooterLogin.label}
            style={buttonStyles.signUp}
          />
        )}

        <CompanyLogo isFooter />
      </div>
    </div>
  );
};

export default Footer;
