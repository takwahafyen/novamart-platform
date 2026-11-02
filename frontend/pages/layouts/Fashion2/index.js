import React from "react";
import ModalComponent from "../../../components/common/Modal";
import HeaderTen from "../../../components/headers/header-two";
import Collection from "./Component/Collection";
import HomeSlider from "./Component/Home";
//import SpecialProducts from "../../../components/common/Collections/TabCollection1";
import ProductSlider from "../../../components/common/Collections/Collection90";
import { Product4 } from "../../../services/script";
import Instagram from "../../../components/common/instagram/instagram3";
import MasterParallaxBanner from "../Fashion/Components/MasterParallaxBanner";
import MasterFooterTwo from "../../../components/footers/common/MasterFooterTwo";

const Fashion2 = () => {
  return (
    <>
      <ModalComponent />
      <HeaderTen logoName={"logo/12.png"} topClass="top-header" />
      <HomeSlider />
      <Collection first />
      <Collection />
      
      <MasterParallaxBanner
        bg="parallax-banner13"
        parallaxClass="text-center p-left"
        title="2024"
        subTitle1="fashion trends"
        subTitle2="special offer"
      />
      <ProductSlider type="fashion" />
      <Instagram type="fashion" />
      <MasterFooterTwo
        footerSection=" border-b"
        footerLogoClass="text-center"
        logoName={"logo/f3.png"}
        logoImg={true}
        myAccount={true}
        layoutClass={"darker-subfooter"}
      />
    </>
  );
};

export default Fashion2;
