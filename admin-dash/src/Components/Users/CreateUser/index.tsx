"use client"; // Ajoutez cela en haut
import { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import UserTabs from "./UserTabs";

const CreateUser = () => {
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <UserTabs />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateUser;
