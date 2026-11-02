import React, { useEffect, useState } from "react";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import Chart from "react-google-charts";
import { Card, CardBody, Col, Row } from "reactstrap";
import axios from "axios";

const SalesStatus = () => {
  const [ordersByCity, setOrdersByCity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/dashboard-data");
        const orders = response.data.orders;
        
        // Calculate the number of orders per city
        const cityCounts = orders.reduce((acc, order) => {
          const city = order.city;
          if (acc[city]) {
            acc[city]++;
          } else {
            acc[city] = 1;
          }
          return acc;
        }, {});

        // Convert cityCounts to an array format suitable for the chart
        const totalOrders = orders.length;
        const cityData = Object.entries(cityCounts).map(([city, count]) => ({
          city,
          count,
          percentage: ((count / totalOrders) * 100).toFixed(2),
        }));

        // Prepare chart data
        const chartData = [
          ['City', 'Percentage'],
          ...cityData.map(item => [item.city, parseFloat(item.percentage)]),
        ];

        setOrdersByCity(chartData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    title: 'Orders by City',
    pieHole: 0.4,
    pieSliceText: 'label',
  };

  return (
    <Col sm="12">
      <Card>
        <CommonCardHeader title="Sales Status" />
        <CardBody>
          <Row>
            <Col xl="6 " className="xl-100">
              <div className="order-graph xl-space">
                <h6>Orders by City</h6>
                <div className="ct-4 flot-chart-container">
                  <Chart
                    width={"100%"}
                    height={"300px"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={ordersByCity}
                    options={chartOptions}
                    legend_toggle
                  />
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalesStatus;
