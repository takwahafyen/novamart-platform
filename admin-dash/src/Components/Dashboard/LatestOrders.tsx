import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import { Button, Card, CardBody, Col, Table } from "reactstrap";

const LatestOrders = () => {
  return (
    <Col xl="6 xl-100">
      <Card>
        <CommonCardHeader title="Latest Orders" />
        <CardBody>
          <div className="user-status table-responsive latest-order-table">
            <Table borderless>
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Order Total</th>
                  <th scope="col">Product</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="digits">120.00 DT</td>
                  <td className="font-danger">T-shirt kids</td>
                  <td className="digits">On Way</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="digits">90.00 DT</td>
                  <td className="font-secondary">T-shirt</td>
                  <td className="digits">Delivered</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="digits">24.00 DT</td>
                  <td className="font-warning">Carte de visite</td>
                  <td className="digits">Delivered</td>
                </tr>
                
              </tbody>
            </Table>
            <Button color="primary">View All Orders</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LatestOrders;
