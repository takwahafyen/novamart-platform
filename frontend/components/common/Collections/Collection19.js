import React, { Fragment, useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { Media, Container, Col, Row } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import axios from 'axios';

const ProductSlider = () => {
  const { state: currency } = useContext(CurrencyContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/category/carte%20de%20visite');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const clickProductDetail = (product) => {
    router.push({
      pathname: `/product-details/${product._id}`,
    });
  };

  return (
    <Fragment>
      <section className="section-b-space">
        <Container>
          <Row className="multiple-slider">
            {products.length > 0 && products.map((product, index) => (
              <Col lg="3" sm="6" key={index}>
                <div className="theme-card">
                  <h5 className="title-border">Nouveaux Produits</h5>
                  <Slider className="offer-slider slide-1">
                    <div className="media">
                      <a onClick={() => clickProductDetail(product)}>
                        <Media
                          className="img-fluid blur-up lazyload"
                          src={`http://localhost:5000${product.images[0]}`}
                          alt={product.name}
                        />
                      </a>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <a onClick={() => clickProductDetail(product)}>
                          <h6>{product.name}</h6>
                        </a>
                        <h4>
                          {currency.symbol}
                          {(product.price * currency.value).toFixed(2)}
                          <del>
                            <span className="money">
                              {currency.symbol}
                              {(product.price * currency.value).toFixed(2)}
                            </span>
                          </del>
                        </h4>
                      </div>
                    </div>
                  </Slider>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductSlider;
