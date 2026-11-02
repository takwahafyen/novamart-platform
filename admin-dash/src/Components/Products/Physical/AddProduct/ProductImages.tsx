import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

interface ProductImagesProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ onImageChange }) => {
  return (
    <Col xl="3">
      <FormGroup>
        <Label htmlFor="images">Images</Label>
        <Input type="file" name="images" id="images" multiple onChange={onImageChange} />
      </FormGroup>
    </Col>
  );
};

export default ProductImages;
