import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media } from "reactstrap";
import axios from "axios";

const TopDashboardCards = () => {
  const [dashboardData, setDashboardData] = useState({
    orderCount: 0,
    productCount: 0,
    userCount: 0,
    categoryCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/dashboard-data");
        setDashboardData({
          orderCount: response.data.orderCount,
          productCount: response.data.productCount,
          userCount: response.data.userCount,
          categoryCount: response.data.categoryCount,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    {
      type: "Orders",
      count: dashboardData.orderCount,
      label: "Orders",
      icon: <i className="icon-orders" />, // Replace with appropriate icon
      bgColor: "bg-primary",
    },
    {
      type: "Products",
      count: dashboardData.productCount,
      label: "Products",
      icon: <i className="icon-products" />, // Replace with appropriate icon
      bgColor: "bg-success",
    },
    {
      type: "Users",
      count: dashboardData.userCount,
      label: "Users",
      icon: <i className="icon-users" />, // Replace with appropriate icon
      bgColor: "bg-warning",
    },
    {
      type: "Categories",
      count: dashboardData.categoryCount,
      label: "Categories",
      icon: <i className="icon-categories" />, // Replace with appropriate icon
      bgColor: "bg-danger",
    }
  ];

  return (
    <>
      {cardData.map((item, i) => (
        <Col key={i} xl="3 xl-50" md="6">
          <Card className="o-hidden widget-cards">
            <CardBody className={`text-white ${item.bgColor}`}>
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">{item.icon}</div>
                </div>
                <Media body className="col-8">
                  <span className="m-0">{item.type}</span>
                  <h3 className="mb-0">
                    $ <CountUp className="counter" end={item.count} />
                    <small> {item.label}</small>
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default TopDashboardCards;
