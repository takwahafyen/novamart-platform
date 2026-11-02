import React, { useEffect, useState, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import Slider from "react-slick";
import { Container, Row, Col, Media } from "reactstrap";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";

const GET_SINGLE_PRODUCTS = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        sku
        size
        color
        image_id
      }
      images {
        alt
        src
      }
    }
  }
`;

const LeftSidebarPage = ({ pathId }) => {
  const { loading, data, error } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: { id: pathId },
  });

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details: {error.message}</p>;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current?.slickGoTo(img_id);
  };

  const products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };

  const sliderNav = {
    slidesToShow: data?.product?.images?.length || 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    focusOnSelect: true,
  };

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter" id="filter">
              <Filter />
              <Service />
              <NewProduct />
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col xl="12" className="filter-col">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i> filter
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6" className="product-thumbnail">
                    <Slider {...products} asNavFor={nav2} ref={slider1} className="product-slick">
                      {data.product.images.map((vari, index) => (
                        <div key={index}>
                          <ImageZoom image={vari} />
                        </div>
                      ))}
                    </Slider>
                    {data.product.variants.length > 1 && (
                      <Slider className="slider-nav" {...sliderNav} asNavFor={nav1} ref={slider2}>
                        {data.product.images.map((item, i) => (
                          <div key={i}>
                            <Media src={item.src} alt={item.alt} className="img-fluid" />
                          </div>
                        ))}
                      </Slider>
                    )}
                  </Col>
                  <Col lg="6" className="rtl-text product-ps">
                    <DetailsWithPrice item={data.product} changeColorVar={changeColorVar} />
                  </Col>
                </Row>
              </Container>
              <ProductTab />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebarPage;
