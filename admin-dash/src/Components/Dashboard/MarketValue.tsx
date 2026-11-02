import React, { useEffect, useState } from "react";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import { Bar } from "react-chartjs-2";
import { Card, CardBody, Col } from "reactstrap";
import axios from "axios";

const MarketValue = () => {
  const [data, setData] = useState({ productCountsByCategory: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/dashboard-data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: data.productCountsByCategory.map(item => item.category), // Category names as labels
    datasets: [{
      label: 'Products per Category',
      data: data.productCountsByCategory.map(item => item.count), // Product counts
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Col xl="6 xl-100">
      <Card>
        <CommonCardHeader title="Market Value" />
        <CardBody>
          <div className="market-chart">
            <Bar data={chartData} options={chartOptions} width={778} height={308} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MarketValue;
