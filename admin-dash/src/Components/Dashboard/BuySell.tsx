import React, { useState, useEffect } from "react";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import { Line } from "react-chartjs-2";
import { Card, CardBody, Col } from "reactstrap";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const BuySell = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/dashboard-data");
        const data = await response.json();

        const orders = data.orders;
        const labels = orders.map(order => new Date(order.createdAt).toLocaleDateString());
        const totals = orders.map(order => order.cartTotal);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Order Totals',
              data: totals,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Total: $${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Amount'
        }
      }
    }
  };

  return (
    <Col sm="12">
      <Card>
        <CommonCardHeader title="Buy/Sell" />
        <CardBody className="sell-graph">
          {chartData && <Line data={chartData} options={options} width={700} height={350} />}
        </CardBody>
      </Card>
    </Col>
  );
};

export default BuySell;
