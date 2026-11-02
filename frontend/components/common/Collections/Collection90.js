import React, { useState, useEffect, useContext } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Col, Container, Media, Row } from "reactstrap";
import axios from 'axios';
import PostLoader from "../PostLoader";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { useRouter } from "next/router";

const TabContent = ({ products, loading, clickProductDetail }) => {
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  return (
    <Row className="product-tab">
      {loading ? (
        <>
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </>
      ) : (
        products.map((item, i) => (
          <div className="tab-box" key={i}>
            <div className="product-box2">
              <div className="media">
                <a onClick={() => clickProductDetail(item)}>
                  <Media
                    className="img-fluid blur-up lazyload"
                    src={`http://localhost:5000${item.images[0]}`}
                    alt={item.name}
                  />
                </a>
                <div className="media-body align-self-center">
                  <div className="rating">
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>
                  </div>
                  <a onClick={() => clickProductDetail(item)}>
                    <h6>{item.name}</h6>
                  </a>
                  <h4>
                    {currency.symbol}
                    {(item.price * currency.value).toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </Row>
  );
};

const TabCollection = ({ bgClass }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/category/T-shirt');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
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
    <div className={bgClass}>
      <section className="p-0">
        <Container fluid={true}>
          <Row>
            <Col>
              <div className="title4">
                <h2 className="title-inner4">Trending Products</h2>
                <div className="line">
                  <span></span>
                </div>
              </div>
              <Tabs className="theme-tab">
                <TabList className="tabs tab-title">
                  <Tab className="active">
                    Trending T-shirts
                  </Tab>
                </TabList>
                <div className="tab-content-cls">
                  <TabPanel className="tab-content active default">
                    <TabContent
                      products={products}
                      loading={loading}
                      clickProductDetail={clickProductDetail}
                    />
                  </TabPanel>
                </div>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default TabCollection;
