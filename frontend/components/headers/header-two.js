import React, { useEffect, useState } from "react";
import cart from "../../public/assets/images/icon/cart.png";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import Cart from "../containers/Cart";
import CartContainer from "../containers/CartContainer";
import TopBar from "./common/topbar-dark";
import { Media, Container, Row, Col } from "reactstrap";
import LogoImage from "./common/logo";
import search from "../../public/assets/images/icon/search.png";
import settings from "../../public/assets/images/icon/setting.png";
import Currency from "./common/currency";
import SearchOverlay from "./common/search-overlay";

const HeaderTwo = ({ logoName, headerClass, topClass, direction }) => {
  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display:none";
    }, 2000);
  }, []);

  const openNav = () => {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  };
  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  return (
    <div>
      <header id="sticky" className={`${headerClass}`}>
        <div className="mobile-fix-option"></div>
        {/*Top Header Component*/}
        <TopBar topClass={topClass} />

        <Container>
          <Row>
            <Col>
              <div className="main-menu border-section border-top-0">
                <div className="menu-left">
                  <div className="navbar">
                   
                     
                </div>
                </div>
                <div className="brand-logo layout2-logo">
                  <LogoImage logo={logoName} />
                </div>
                <div className="menu-right pull-right">
                  <div>
                      
                    
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <div className="main-nav-center">
                <NavBar />
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <SearchOverlay />
    </div>
  );
};

export default HeaderTwo;
