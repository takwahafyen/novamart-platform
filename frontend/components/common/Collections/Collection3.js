import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import ProductItems from "../product-box/ProductBox1";
import { Row, Col, Container } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import PostLoader from "../PostLoader";
import { CompareContext } from "../../../helpers/Compare/CompareContext";

const TopCollection = ({
  title,
  subtitle,
  designClass,
  noSlider,
  cartClass,
  productSlider,
  titleClass,
  noTitle,
  innerClass,
  inner,
  backImage,
}) => {
  const context = useContext(CartContext);
  const contextWishlist = useContext(WishlistContext);
  const comapreList = useContext(CompareContext);
  const quantity = context.quantity;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/products/category/carte%20de%20visite'
        );
        console.log("API response:", response.data); // Log the full response to check its structure
        setProducts(response.data.items || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log("Fetched products:", products); // Log the products to check if they are being set correctly

  return (
    <section className={designClass}>
      <Container>
        {noTitle !== "null" && (
          <div className={innerClass}>
            {subtitle && <h4>{subtitle}</h4>}
            <h2 className={inner}>{title}</h2>
            {titleClass ? (
              <hr role="tournament6" />
            ) : (
              <div className="line">
                <span></span>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <Row className="mx-0 margin-default">
            {[...Array(4)].map((_, i) => (
              <Col xl="3" lg="4" col="6" key={i}>
                <PostLoader />
              </Col>
            ))}
          </Row>
        ) : error ? (
          <div className="col-12 text-center">
            <p>{error}</p>
          </div>
        ) : products.length > 0 ? (
          noSlider ? (
            <Row className="margin-default">
              {products.map((product, index) => (
                <Col xl="3" sm="6" key={index}>
                  <ProductItems
                    product={product}
                    backImage={backImage}
                    addCompare={() => comapreList.addToCompare(product)}
                    addWishlist={() => contextWishlist.addToWish(product)}
                    title={title}
                    cartClass={cartClass}
                    addCart={() => context.addToCart(product, quantity)}
                    imgSrc={`http://localhost:5000${product.images[0]}`} // Using the new img src
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Slider {...productSlider} className="product-m no-arrow">
              {products.map((product, i) => (
                <div key={i}>
                  <ProductItems
                    product={product}
                    title={title}
                    addWishlist={() => contextWishlist.addToWish(product)}
                    addCart={() => context.addToCart(product, quantity)}
                    addCompare={() => comapreList.addToCompare(product)}
                    cartClass={cartClass}
                    backImage={backImage}
                    imgSrc={`http://localhost:5000${product.images[0]}`} // Using the new img src
                  />
                </div>
              ))}
            </Slider>
          )
        ) : (
          <div className="col-12 text-center">
          </div>
        )}
      </Container>
    </section>
  );
};

export default TopCollection;
