"use client"; // Ajoutez cela en haut
import { FC, ChangeEvent } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

interface AccountDetailsProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AccountDetails: FC<AccountDetailsProps> = ({ user, handleChange }) => {
  return (
    <Form className="needs-validation user-add" noValidate>
      <h4>Account Details</h4>
      <FormGroup>
        <Row>
          <Col xl="3" md="4">
            <Label>* First Name</Label>
          </Col>
          <Col xl="8" md="7">
            <Input
              id="validationCustom0"
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col xl="3" md="4">
            <Label>* Last Name</Label>
          </Col>
          <Col xl="8" md="7">
            <Input
              id="validationCustom1"
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col xl="3" md="4">
            <Label>* Email</Label>
          </Col>
          <Col xl="8" md="7">
            <Input
              id="validationCustom2"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col xl="3" md="4">
            <Label>* Password</Label>
          </Col>
          <Col xl="8" md="7">
            <Input
              id="validationCustom3"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default AccountDetails;
