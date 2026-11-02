import React, { useState } from "react";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const ProductTab = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <section className="tab-product m-0">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => setActiveTab("1")}>
                    Description
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => setActiveTab("2")}>
                    Details
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "3" ? "active" : ""} onClick={() => setActiveTab("3")}>
                    video
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink className={activeTab === "4" ? "active" : ""} onClick={() => setActiveTab("4")}>
                    Write Review
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                <TabPane tabId="1">
                  
                </TabPane>
                <TabPane tabId="2">
                </TabPane>
                <TabPane tabId="3">
                </TabPane>
                <TabPane tabId="4">
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductTab;
