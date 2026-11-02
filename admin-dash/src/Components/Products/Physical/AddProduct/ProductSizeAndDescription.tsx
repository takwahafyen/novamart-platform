import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

interface ProductSizeAndDescriptionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProductSizeAndDescription: React.FC<ProductSizeAndDescriptionProps> = ({ onChange }) => {
  return (
    <>
      <Col md="6">
        <FormGroup>
          <Label htmlFor="quantity">Quantity</Label>
          <Input type="number" name="quantity" id="quantity" placeholder="Quantity" onChange={onChange} />
        </FormGroup>
      </Col>
      <Col md="6">
      <FormGroup>
  <Label htmlFor="size">Size</Label>
  <Input
    type="text"
    name="size"
    id="size"
    placeholder="Enter Size"
    onChange={onChange}
  />
</FormGroup>

      </Col>
      <Col md="12">
        <FormGroup>
          <Label htmlFor="description">Product Description</Label>
          <Input type="textarea" name="description" id="description" placeholder="Product Description" onChange={onChange} />
        </FormGroup>
      </Col>
    </>
  );
};

export default ProductSizeAndDescription;
