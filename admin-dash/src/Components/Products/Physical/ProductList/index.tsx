import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import CommonBreadcrumb from '@/CommonComponents/CommonBreadcrumb';
import { Href, ImagePath } from '@/Constants';
import { ColorVariant, ProductRating } from '@/Data/Product/Physical';
import { Edit, Trash2 } from 'react-feather';
import { Button, Card, CardBody, Col, Container, Row, Input, Label, FormGroup } from 'reactstrap';
import UpdateProduct from '../ProductList/UpdateProduct'; // Importer le nouveau composant UpdateProduct
import './ProductList.css'; // Assurez-vous d'importer votre fichier CSS pour les styles

interface Product {
  _id: string;
  name: string;
  images: string[];
  tag?: string;
  discount?: string;
  price: number;
  discount_price?: number;
}

interface Category {
  _id: string;
  name: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = (id: string) => {
    setSelectedProduct(id);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === '') {
      fetchProducts(); // Fetch all products if "All Categories" is selected
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    }
  };

  return (
    <Fragment>
      <CommonBreadcrumb title="Product List" parent="Physical" />
      <Container fluid>
        <Row className="mb-3">
          <Col>
            <FormGroup>
              <Label for="categorySelect">Filter by Category</Label>
              <Input
                type="select"
                name="select"
                id="categorySelect"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="products-admin ratio_asos">
          {products.map((item, i) => (
            <Col xl="3" sm="6" key={i}>
              <Card>
                <CardBody className="product-box">
                  <div className="img-wrapper">
                    <div className="lable-block">
                      {item.tag === "new" && <span className="lable3">{item.tag}</span>}
                      {item.discount === "on sale" && <span className="lable4">{item.discount}</span>}
                    </div>
                    <div className="front">
                      <a href={Href} className="bg-size">
                        <img
                          alt={item.name}
                          className="img-fluid blur-up bg-img lazyloaded"
                          src={item.images.length > 0 ? `http://localhost:5000${item.images[0]}` : `${ImagePath}default-image.jpg`}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail">
                    {ProductRating}
                    <a href={Href}>
                      <h6 className="product-name">{item.name}</h6>
                    </a>
                    <h4>
                    {item.price} DT {item.discount_price && <span>{item.discount_price} DT</span>}
                    </h4>

                    {ColorVariant}
                  </div>
                  <div className="product-actions">
                    <Button color="warning" onClick={() => handleUpdate(item._id)} className="action-btn">
                      <Edit className="edit-icon icon" />
                      <span className="btn-text">Update</span>
                    </Button>
                    <Button color="danger" onClick={() => handleDelete(item._id)} className="action-btn">
                      <Trash2 className="delete-icon icon" />
                      <span className="btn-text">Delete</span>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {selectedProduct && (
        <UpdateProduct productId={selectedProduct} isOpen={isModalOpen} toggle={toggleModal} />
      )}
    </Fragment>
  );
};

export default ProductList;
