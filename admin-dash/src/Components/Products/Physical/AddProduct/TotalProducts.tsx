import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

interface TotalProductsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TotalProducts: React.FC<TotalProductsProps> = ({ onChange }) => {
  return (
    <>
      <Col md="6">
        <FormGroup>
          <Label htmlFor="quantity">Total Products</Label>
          <Input type="number" name="quantity" id="quantity" placeholder="Total Products" onChange={onChange} />
        </FormGroup>
      </Col>
    </>
  );
};

export default TotalProducts;
