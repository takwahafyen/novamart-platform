import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CommonLayout from '../../components/shop/common-layout';
import AccordianExample from '../../pages/product-details/common/accordian_exple';
import styles from './ProductDetails.module.css';
//import DetailsWithPrice from '../../pages/product-details/common/detail-price';

import { Col, Container, Row } from "reactstrap";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import CartContext from "../../helpers/cart";
import { WishlistContext } from "../../helpers/wishlist/WishlistContext";
import ImageZoom from '../../pages/product-details/common/image-zoom';
import ProductSection from '../../pages/product-details/common/product_section';
import MasterSocial from '../../pages/product-details/common/master_social';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currencyContext = useContext(CurrencyContext);
  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/products/${id}`);
          setProduct(response.data);
          setLoading(false);
        } catch (err) {
          setError("Error loading product details");
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <CommonLayout parent="Home" title={product.name}>
      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <ImageZoom image={{ src: `http://localhost:5000${product.images[0]}`, alt: product.name }} />
            </Col>
            <Col lg="6">
              <div className={styles.productDetails}>
                <h2>{product.name}</h2>
                <div className={styles.productRating}>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className="fa fa-star" />
                    ))}
                  </div>
                  <button
                    className={styles.wishlistBtn}
                    onClick={() => wishlistContext.addToWish(product)}>
                    <i className="fa fa-heart" />
                    <span className="title-font">Add to Wishlist</span>
                  </button>
                </div>
                <h4>{product.price} {currencyContext.state.symbol}</h4>
                <AccordianExample product={product} />
                <MasterSocial />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <ProductSection />
            </Col>
          </Row>
        </Container>
      </section>
      <style jsx>{`
        .section-b-space {
          padding-top: 30px;
          padding-bottom: 30px;
        }
      `}</style>
    </CommonLayout>
  );
};

export default ProductDetails;
