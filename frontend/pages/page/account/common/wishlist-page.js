import React, { useContext } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { WishlistContext } from "../../../../helpers/wishlist/WishlistContext";
import CartContext from "../../../../helpers/cart/index";
import { useRouter } from "next/router";
import Link from "next/link";

const WishlistPage = () => {
  const router = useRouter();
  const context = useContext(WishlistContext);
  const cartContext = useContext(CartContext);

  const wishlist = context.wishlistItems;
  const removeFromWish = context.removeFromWish;
  const addCart = cartContext.addToCart;

  const checkOut = () => {
    router.push("/page/account/checkout");
  };

  return (
    <>
      {wishlist.length > 0 ? (
        <section className="wishlist-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <Table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">image</th>
                      <th scope="col">product name</th>
                      <th scope="col">price</th>
                      <th scope="col">availability</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  {wishlist.map((product, i) => (
                    <tbody key={i}>
                      <tr>
                        <td>
                          <Link href={`/left-sidebar/product/${product.id}`}>
                            <img
                              src={`http://localhost:5000${product.images[0]}`}
                              alt={product.name}
                              style={{ maxWidth: "100px" }}
                            />
                          </Link>
                        </td>
                        <td>
                          <Link href={`/left-sidebar/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </td>
                        <td>
                          <h2 className="td-color">{product.price}</h2>
                        </td>
                        <td>
                          <p>en stock</p>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="icon"
                            onClick={() => removeFromWish(product)}>
                            <i className="fa fa-times"></i>
                          </a>
                          <a
                            href="#"
                            className="cart"
                            onClick={() => addCart(product)}>
                            <i className="fa fa-shopping-cart"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Col>
            </Row>
            <Row className="wishlist-buttons">
              <Col xs="6">
                <Link href={`/shop/left_sidebar`} className="btn btn-solid">
                  continue shopping
                </Link>
              </Col>
              <Col xs="6">
                <a href="#" className="btn btn-solid" onClick={checkOut}>
                  check out
                </a>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="wishlist-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    
                    <h3>
                      <strong>Your Wishlist is Empty</strong>
                    </h3>
                    <h4>Explore more and shortlist some items.</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default WishlistPage;
