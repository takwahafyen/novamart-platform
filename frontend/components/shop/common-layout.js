import React from "react";
import Head from "next/head";
import HeaderOne from "../headers/header-one";
import MasterFooter from "../footers/common/MasterFooter";
import favicon from "../../public/assets/images/favicon/1.png";

const CommonLayout = ({ children, title, parent, subTitle }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - My Site` : "My Site"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={favicon.src} />
      </Head>
      <HeaderOne topClass="top-header" logoName="logo.png" />
      {/* Uncomment or remove if you don't have the Breadcrumbs component */}
      {/* <Breadcrumbs title={title} parent={parent} subTitle={subTitle} /> */}
      {children}
      <MasterFooter
        footerClass="footer-light"
        footerLayOut="light-layout upper-footer"
        footerSection="small-section border-section border-top-0"
        belowSection="section-b-space light-layout"
        newLatter={true}
      />
    </>
  );
};

export default CommonLayout;
