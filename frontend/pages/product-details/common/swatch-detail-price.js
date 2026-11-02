import React, { useState, useContext } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false);
  const currencyContext = useContext(CurrencyContext);
  const symbol = currencyContext.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const cartContext = useContext(CartContext);
  const { stock, plusQty, minusQty, quantity } = cartContext;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const uniqueColors = [];
  const uniqueSizes = [];

  const changeQty = (e) => {
    setCurrentQuantity(parseInt(e.target.value));
  };

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.title} </h2>
        <h4>
          <del>
            {symbol}
            {product.price}
          </del>
          <span>{product.discount}% off</span>
        </h4>
        <h3>
          {symbol}
          {product.price - (product.price * product.discount) / 100}
        </h3>
        {product.variants.forEach((vari) => {
          if (!uniqueColors.some((color) => color.color === vari.color)) {
            uniqueColors.push(vari);
          }
          if (!uniqueSizes.includes(vari.size)) {
            uniqueSizes.push(vari.size);
          }
        })}
        {changeColorVar === undefined ? (
          uniqueColors.length > 0 && (
            <ul className="color-variant">
              {uniqueColors.map((vari, i) => (
                <li className={vari.color} key={i} title={vari.color}></li>
              ))}
            </ul>
          )
        ) : (
          uniqueColors.length > 0 && (
            <ul className="color-variant">
              {uniqueColors.map((vari, i) => (
                <li
                  className={vari.color}
                  key={i}
                  title={vari.color}
                  onClick={() => changeColorVar(i)}
                ></li>
              ))}
            </ul>
          )
        )}
        <div className="product-description border-product">
          {uniqueSizes.length > 0 && (
            <>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a href="#" onClick={toggle}>
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media src={sizeChart.src} alt="size" className="img-fluid" />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSizes.map((size, i) => (
                    <li key={i}>
                      <a href="#">{size}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <span className="instock-cls">{stock}</span>
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={minusQty}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={currentQuantity}
                onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={() => plusQty(product)}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <a
            href="#"
            className="btn btn-solid"
            onClick={() => cartContext.addToCart(product, currentQuantity)}
          >
            add to cart
          </a>
          <Link
            href={`/page/account/checkout`}
            className="btn btn-solid"
            onClick={() => cartContext.addToCart(product, currentQuantity)}
          >
            buy now
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.description}</p>
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
