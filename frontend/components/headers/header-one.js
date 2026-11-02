import React, { useEffect } from "react";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import Cart from "../containers/Cart";
import CartContainer from "../containers/CartContainer";
import TopBarDark from "./common/topbar-dark";
import { Media, Container, Row, Col } from "reactstrap";
import LogoImage from "./common/logo";
import search from "../../public/assets/images/icon/search.png";
import settings from "../../public/assets/images/icon/setting.png";
import cart from "../../public/assets/images/icon/cart.png";
import Currency from "./common/currency";
import { useRouter } from "next/router";
import SearchOverlay from "./common/search-overlay";

const HeaderOne = ({
  logoName,
  headerClass,
  topClass,
  noTopBar,
  direction,
}) => {
  const router = useRouter();

  /*=====================
     Pre loader
     ==========================*/
  useEffect(() => {
    setTimeout(() => {
      const loaderWrapper = document.querySelector(".loader-wrapper");
      if (loaderWrapper) {
        loaderWrapper.style.display = "none";
      }
    }, 2000);

    if (router.asPath !== "/layouts/Christmas") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.asPath]);

  const handleScroll = () => {
    const stickyElement = document.getElementById("sticky");
    if (!stickyElement) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop >= 300) {
      if (window.innerWidth < 581) {
        stickyElement.classList.remove("fixed");
      } else {
        stickyElement.classList.add("fixed");
      }
    } else {
      stickyElement.classList.remove("fixed");
    }
  };

  const openNav = () => {
    const openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  };

  const openSearch = () => {
    const searchOverlay = document.getElementById("search-overlay");
    if (searchOverlay) {
      searchOverlay.style.display = "block";
    }
  };

  return (
    <div>
      <header id="sticky" className={`sticky ${headerClass}`}>
        <div className="mobile-fix-option"></div>
        {/* Top Header Component */}
        {!noTopBar && <TopBarDark topClass={topClass} />}

        <Container>
          <Row>
            <Col>
              <div className="main-menu">
                <div className="menu-left">
                  <div className="navbar">
                    <a href={null} onClick={openNav}>
                      <div className="bar-style">
                        <i
                          className="fa fa-bars sidebar-bar"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </a>
                    {/* SideBar Navigation Component */}
                    <SideBar />
                  </div>
                  <div className="brand-logo">
                    <LogoImage logo={logoName} />
                  </div>
                </div>
                <div className="menu-right pull-right">
                  {/* Top Navigation Bar Component */}
                  <NavBar />

                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                          
                            
                          </div>
                        </li>
                        {/* Header Cart Component */}
                        {direction === undefined ? (
                          <CartContainer layout={direction} icon={cart.src} />
                        ) : (
                          <Cart layout={direction} icon={cart.src} />
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <SearchOverlay />
    </div>
  );
};

export default HeaderOne;
