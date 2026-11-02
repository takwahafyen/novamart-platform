import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

interface ProductCodeAndPriceProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductCodeAndPrice: React.FC<ProductCodeAndPriceProps> = ({ onChange }) => {
  return (
    <>
      <Col md="6">
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <Input type="text" name="name" id="name" placeholder="Product Name" onChange={onChange} />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <Label htmlFor="code">Product Code</Label>
          <Input type="text" name="code" id="code" placeholder="Product Code" onChange={onChange} />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input type="number" name="price" id="price" placeholder="Price" onChange={onChange} />
        </FormGroup>
      </Col>
    </>
  );
};

export default ProductCodeAndPrice;
