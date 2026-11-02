import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonBreadcrumb from "@/CommonComponents/CommonBreadcrumb";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import ProductCodeAndPrice from "./ProductCodeAndPrice";
import ProductImages from "./ProductImages";
import ProductSizeAndDescription from "./ProductSizeAndDescription";
import TotalProducts from "./TotalProducts";
import ProductBrandAndCategory from "./ProductBrandAndCategory";

interface Category {
  _id: string;
  name: string;
}

interface ProductData {
  name: string;
  images: File[];
  price: string;
  quantity: number;
  size: string;
  description: string;
  brand: string;
  categoryId: string;
  code: string;
}

const AddProduct: React.FC = () => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    images: [],
    price: '',
    quantity: 1,
    size: '',
    description: '',
    brand: '',
    categoryId: '',
    code: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error('Failed to fetch categories.');
      }
    };
    fetchCategories();
  }, []);

  const handleValidSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      console.log("Submitting product data:", productData);  // Debug log
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log("Product added:", response.data);
        toast.success('Product added successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Failed to add product.');
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error('Failed to add product.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData(prevData => ({ ...prevData, [name]: value }));
    console.log(`Field changed: ${name} = ${value}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      console.log('Files selected:', filesArray);
      setProductData(prevData => ({ ...prevData, images: filesArray }));
    }
  };

  return (
    <Fragment>
      <CommonBreadcrumb title="Add Product" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title="Add Product" />
              <CardBody>
                <Row className="product-adding">
                  <ProductImages onImageChange={handleImageChange} />
                  <Col xl="7">
                    <form className="needs-validation add-product-form" onSubmit={handleValidSubmit}>
                      <ProductCodeAndPrice onChange={handleChange} />
                      <TotalProducts onChange={handleChange} />
                      <ProductSizeAndDescription onChange={handleChange} />
                      <ProductBrandAndCategory onChange={handleChange} categories={categories} />
                      <div className="offset-xl-3 offset-sm-4">
                        <Button type="submit" color="primary">
                          Add
                        </Button>
                      
                      </div>
                    </form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default AddProduct;
