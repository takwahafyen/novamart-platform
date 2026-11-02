import React, { useContext, useState } from "react";
import { Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import axios from 'axios';

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [payment, setPayment] = useState("cod");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const checkhandle = (value) => {
    setPayment(value);
  };

  const onSubmit = async (data) => {
    try {
      // Validate and structure order data
      const orderData = {
        ...data,
        cartItems: cartItems.map(item => ({
          title: item.title || 'Unknown',  // Ensure title is provided
          qty: item.qty || 1,              // Default quantity if missing
          total: item.total || 0           // Default total if missing
        })),
        cartTotal,
        paymentMethod: payment,
        orderStatus: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Adjusted API endpoint
      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        router.push({
          pathname: "/page/order-success",
          state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
        });
      } else {
        alert('Order submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error.response ? error.response.data : error.message);
      alert('Order submission failed. Please try again.');
    }
  };

  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Billing Details</h3>
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">First Name</div>
                      <input
                        type="text"
                        className={`${errors.first_name ? "error_border" : ""}`}
                        {...register("first_name", { required: true })}
                      />
                      <span className="error-message">
                        {errors.first_name && "First name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Last Name</div>
                      <input
                        type="text"
                        className={`${errors.last_name ? "error_border" : ""}`}
                        {...register("last_name", { required: true })}
                      />
                      <span className="error-message">
                        {errors.last_name && "Last name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Phone</div>
                      <input
                        type="text"
                        className={`${errors.phone ? "error_border" : ""}`}
                        {...register("phone", { required: true, pattern: /^\d{8}$/ })}
                      />
                      <span className="error-message">
                        {errors.phone && "Please enter a valid 10-digit phone number."}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Email Address</div>
                      <input
                        className={`${errors.email ? "error_border" : ""}`}
                        type="email"
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      />
                      <span className="error-message">
                        {errors.email && "Please enter a valid email address."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Country</div>
                      <select {...register("country", { required: true })}>
                        <option>Tunisia</option>
                        <option>India</option>
                        <option>South Africa</option>
                        <option>United States</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Address</div>
                      <input
                        className={`${errors.address ? "error_border" : ""}`}
                        type="text"
                        {...register("address", { required: true, minLength: 5, maxLength: 120 })}
                        placeholder="Street address"
                      />
                      <span className="error-message">
                        {errors.address && "Please enter your address."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Town/City</div>
                      <input
                        type="text"
                        className={`${errors.city ? "error_border" : ""}`}
                        {...register("city", { required: true })}
                      />
                      <span className="error-message">
                        {errors.city && "Please enter your city"}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">State / County</div>
                      <input
                        type="text"
                        className={`${errors.state ? "error_border" : ""}`}
                        {...register("state", { required: true })}
                      />
                      <span className="error-message">
                        {errors.state && "Please enter your state"}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Postal Code</div>
                      <input
                        type="text"
                        className={`${errors.pincode ? "error_border" : ""}`}
                        {...register("pincode", { required: true, pattern: /^\d{4}$/ })}
                      />
                      <span className="error-message">
                        {errors.pincode && "Please enter a valid postal code"}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>Product <span>Total</span></div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item, index) => (
                            <li key={index}>{item.title || 'Unknown'} × {item.qty || 1} <span>{symbol}{item.total || 0}</span></li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>Subtotal <span className="count">{symbol}{cartTotal}</span></li>
                          <li>Shipping
                            <div className="shipping">
                              <div className="shopping-option">
                                <input type="checkbox" name="free-shipping" id="free-shipping" />
                                <label htmlFor="free-shipping">Free Shipping</label>
                              </div>
                              <div className="shopping-option">
                                <input type="checkbox" name="local-pickup" id="local-pickup" />
                                <label htmlFor="local-pickup">Local Pickup</label>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <ul className="total">
                          <li>Total <span className="count">{symbol}{cartTotal}</span></li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-2"
                                    defaultChecked={payment === 'stripe'}
                                    onClick={() => checkhandle('stripe')}
                                  />
                                  <label htmlFor="payment-2">Stripe</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option paypal">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-1"
                                    defaultChecked={payment === 'paypal'}
                                    onClick={() => checkhandle('paypal')}
                                  />
                                  <label htmlFor="payment-1">PayPal</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-3"
                                    defaultChecked={payment === 'cod'}
                                    onClick={() => checkhandle('cod')}
                                  />
                                  <label htmlFor="payment-3">Cash On Delivery</label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="text-end">
                          <button type="submit" className="btn-solid btn">Place Order</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>No items in cart.</p>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
