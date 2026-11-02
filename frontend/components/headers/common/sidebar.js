import React, { Fragment } from "react";
import { Row, Col, Media } from "reactstrap";
//import fashion from "../../../public/assets/images/mega-menu/fashion.jpg";

const SideBar = () => {
  const closeNav = () => {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  };

  const handleSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;
    if (event.target.nextElementSibling.classList.contains("opensub1"))
      event.target.nextElementSibling.classList.remove("opensub1");
    else {
      document.querySelectorAll(".opensub1").forEach((value) => {
        value.classList.remove("opensub1");
      });
      event.target.nextElementSibling.classList.add("opensub1");
    }
  };

  const handleSubTwoMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;
    if (event.target.nextElementSibling.classList.contains("opensub2"))
      event.target.nextElementSibling.classList.remove("opensub2");
    else {
      document.querySelectorAll(".opensub2").forEach((value) => {
        value.classList.remove("opensub2");
      });
      event.target.nextElementSibling.classList.add("opensub2");
    }
  };

  const handleSubThreeMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;
    if (event.target.nextElementSibling.classList.contains("opensub3"))
      event.target.nextElementSibling.classList.remove("opensub3");
    else {
      document.querySelectorAll(".opensub3").forEach((value) => {
        value.classList.remove("opensub3");
      });
      event.target.nextElementSibling.classList.add("opensub3");
    }
  };

  const handleSubFourMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;
    if (event.target.nextElementSibling.classList.contains("opensub4"))
      event.target.nextElementSibling.classList.remove("opensub4");
    else {
      document.querySelectorAll(".opensub4").forEach((value) => {
        value.classList.remove("opensub4");
      });
      event.target.nextElementSibling.classList.add("opensub4");
    }
  };

  const handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;
    if (event.target.nextElementSibling.classList.contains("opensidesubmenu"))
      event.target.nextElementSibling.classList.remove("opensidesubmenu");
    else {
      event.target.nextElementSibling.classList.add("opensidesubmenu");
    }
  };

  return (
    <Fragment>
      <div id="mySidenav" className="sidenav">
        <a href={null} className="sidebar-overlay" onClick={closeNav}></a>
        <nav>
          <a href={null} onClick={closeNav}>
            <div className="sidebar-back text-start">
              <i className="fa fa-angle-left pe-2" aria-hidden="true"></i> Back
            </div>
          </a>
          <ul id="sub-menu" className="sidebar-menu">
            <li>
              <a href="#" onClick={(e) => handleMegaSubmenu(e)}>
                clothing
                <span className="sub-arrow"></span>
              </a>
              <ul className="mega-menu clothing-menu">
                <li>
                  <Row m="0">
                    <Col xl="4">
                      <div className="link-section">
                        <h5>women's fashion</h5>
                        <ul>
                          <li>
                            <a href="#">dresses</a>
                          </li>
                          <li>
                            <a href="#">skirts</a>
                          </li>
                          <li>
                            <a href="#">western wear</a>
                          </li>
                          <li>
                            <a href="#">ethnic wear</a>
                          </li>
                          <li>
                            <a href="#">sport wear</a>
                          </li>
                        </ul>
                        <h5>men's fashion</h5>
                        <ul>
                          <li>
                            <a href="#">sports wear</a>
                          </li>
                          <li>
                            <a href="#">western wear</a>
                          </li>
                          <li>
                            <a href="#">ethnic wear</a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xl="4">
                      <div className="link-section">
                        <h5>accessories</h5>
                        <ul>
                          <li>
                            <a href="#">fashion jewellery</a>
                          </li>
                          <li>
                            <a href="#">caps and hats</a>
                          </li>
                          <li>
                            <a href="#">precious jewellery</a>
                          </li>
                          <li>
                            <a href="#">necklaces</a>
                          </li>
                          <li>
                            <a href="#">earrings</a>
                          </li>
                          <li>
                            <a href="#">wrist wear</a>
                          </li>
                          <li>
                            <a href="#">ties</a>
                          </li>
                          <li>
                            <a href="#">cufflinks</a>
                          </li>
                          <li>
                            <a href="#">pockets squares</a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xl="4">
                      <a href="#" className="mega-menu-banner">
                        <Media src={fashion.src} alt="" className="img-fluid" />
                      </a>
                    </Col>
                  </Row>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={(e) => handleSubmenu(e)}>
                bags
                <span className="sub-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="#">shopper bags</a>
                </li>
                <li>
                  <a href="#">laptop bags</a>
                </li>
                <li>
                  <a href="#">clutches</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => handleSubTwoMenu(e)}>
                    purses
                    <span className="sub-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">purses</a>
                    </li>
                    <li>
                      <a href="#">wallets</a>
                    </li>
                    <li>
                      <a href="#">leathers</a>
                    </li>
                    <li>
                      <a href="#">satchels</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={(e) => handleSubmenu(e)}>
                footwear
                <span className="sub-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="#">flats</a>
                </li>
                <li>
                  <a href="#">boots</a>
                </li>
                <li>
                  <a href="#">heels</a>
                </li>
                <li>
                  <a href="#">socks</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={(e) => handleSubmenu(e)}>
                accessories
                <span className="sub-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="#">fashion jewellery</a>
                </li>
                <li>
                  <a href="#">caps and hats</a>
                </li>
                <li>
                  <a href="#">precious jewellery</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => handleSubTwoMenu(e)}>
                    more...
                    <span className="sub-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">necklaces</a>
                    </li>
                    <li>
                      <a href="#">earrings</a>
                    </li>
                    <li>
                      <a href="#">wrist wear</a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => handleSubThreeMenu(e)}>
                        accessories
                        <span className="sub-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="#">ties</a>
                        </li>
                        <li>
                          <a href="#">cufflinks</a>
                        </li>
                        <li>
                          <a href="#">pockets squares</a>
                        </li>
                        <li>
                          <a href="#">helmets</a>
                        </li>
                        <li>
                          <a href="#">scarves</a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => handleSubFourMenu(e)}>
                            more...
                            <span className="sub-arrow"></span>
                          </a>
                          <ul>
                            <li>
                              <a href="#">belts & more</a>
                            </li>
                            <li>
                              <a href="#">wearable</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
