import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonBreadcrumb from '@/CommonComponents/CommonBreadcrumb';
import CommonCardHeader from '@/CommonComponents/CommonCardHeader';
import { Button, Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ProductCodeAndPrice from '../AddProduct/ProductCodeAndPrice';
import ProductImages from '../AddProduct/ProductImages';
import ProductSizeAndDescription from '../AddProduct/ProductSizeAndDescription';
import TotalProducts from '../AddProduct/TotalProducts';
import ProductBrandAndCategory from '../AddProduct/ProductBrandAndCategory';

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

const UpdateProduct: React.FC<{ productId: string; isOpen: boolean; toggle: () => void; }> = ({ productId, isOpen, toggle }) => {
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
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories.');
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const { name, price, quantity, size, description, brand, category, code, images } = response.data;
        setProductData({
          name,
          images: [], // Images will be handled separately
          price,
          quantity,
          size,
          description,
          brand,
          categoryId: category,
          code,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product.');
      }
    };

    fetchCategories();
    fetchProduct();
  }, [productId]);

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
      const response = await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Product updated successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProductData(prevData => ({ ...prevData, images: filesArray }));
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Update Product</ModalHeader>
      <ModalBody>
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                <CommonCardHeader title="Update Product" />
                <CardBody>
                  <Row className="product-adding">
                    <ProductImages onImageChange={handleImageChange} />
                    <Col xl="7">
                      <form className="needs-validation add-product-form" onSubmit={handleValidSubmit}>
                        <ProductCodeAndPrice onChange={handleChange} />
                        <TotalProducts onChange={handleChange} />
                        <ProductSizeAndDescription onChange={handleChange} />
                        <ProductBrandAndCategory onChange={handleChange} categories={categories} />
                        <div className="d-flex justify-content-end mt-3">
                          <Button type="submit" color="primary" className="me-2">
                            Update
                          </Button>
                          <Button color="light" onClick={toggle}>Discard</Button>
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
      </ModalBody>
    </Modal>
  );
};

export default UpdateProduct;
