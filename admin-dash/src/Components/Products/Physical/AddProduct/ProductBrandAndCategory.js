import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';

const ProductBrandAndCategory = ({ onChange, categories }) => {
  const handleCategoryChange = (e) => {
    onChange(e);  // Directly pass the event to onChange
  };

  return (
    <>
      <Col md="6">
        <FormGroup>
          <Label htmlFor="brand">Brand</Label>
          <Input
            type="text"
            name="brand"
            id="brand"
            placeholder="Brand Name"
            onChange={onChange} // Ensure the onChange type matches
          />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Input
            type="select"
            name="categoryId"
            id="category"
            onChange={handleCategoryChange} // Call the handler for select changes
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
    </>
  );
};

export default ProductBrandAndCategory;
