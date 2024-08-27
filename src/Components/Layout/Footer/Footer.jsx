import React from "react";

const Footer = () => {
  const Link = {
    title: "Company",
    links: [
      { name: "Home", link: "/" },
      { name: "About Us", link: "/about-us" },
      { name: "Contact Us", link: "/contact-us" },
      { name: "Movies", link: "/movies" },
    ],
  };
  return (
    <div className="bg-blue-800 py-4 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap7 py-10 justify-between"></div>
      </div>
    </div>
  );
};

export default Footer;
