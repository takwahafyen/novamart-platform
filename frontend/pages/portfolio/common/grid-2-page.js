import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Media, Container, Row } from "reactstrap";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import PostLoader from "../../../components/common/PostLoader";
import Lightbox from "react-18-image-lightbox";

const GET_PRODUCTS = gql`
  query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
    products(type: $type, indexFrom: $indexFrom, limit: $limit) {
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        sale
        stock
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

// Use fallback string path objects to avoid webpack failure on missing template assets
const defaultImg = { default: { src: "/assets/images/empty-search.jpg" } };
const images = Array(8).fill(defaultImg);
const fashionImages = Array(8).fill(defaultImg);
const bagImages = Array(8).fill(defaultImg);
const shoesImages = Array(8).fill(defaultImg);
const watchImages = Array(8).fill(defaultImg);

const GridTwoPage = ({ colClass, limit }) => {
  const l = parseInt(limit);
  const [activeTab, setActiveTab] = useState("pets");
  const initilindex = { index: 0, isOpen: false };
  const [photoIndex, setPhotoIndex] = useState(initilindex);

  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: activeTab,
      indexFrom: 0,
      limit: parseInt(l),
    },
  });

  const MasterTabPannel = ({ img }) => {
    return (
      <>
        {!data || !data.products || data.products.items.length === 0 || loading ? (
          <PostLoader />
        ) : (
          <>
            {data &&
              data.products.items.map((product, index) => (
                <div className={`isotopeSelector filter fashion ${colClass}`} key={index}>
                  <div className="overlay">
                    <div className="border-portfolio">
                      <a>
                        <div
                          className="overlay-background"
                          onClick={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: index,
                              isOpen: true,
                            })
                          }>
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <Media src={product.images[0].src} className="img-fluid blur-up lazyload bg-img" />
                      </a>
                      {photoIndex.isOpen && (
                        <Lightbox
                          mainSrc={img[photoIndex.index].default.src}
                          nextSrc={img[(photoIndex.index + 1) % img.length].default.src}
                          prevSrc={images[(photoIndex.index + img.length - 1) % img.length].default.src}
                          imageTitle={photoIndex.index + 1 + "/" + img.length}
                          onCloseRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              isOpen: false,
                            })
                          }
                          onMovePrevRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: (photoIndex.index + img.length - 1) % img.length,
                            })
                          }
                          onMoveNextRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: (photoIndex.index + 1) % img.length,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </>
    );
  };

  return (
    <section className="portfolio-section grid-portfolio ratio2_3 portfolio-padding">
      <Container>
        <Tabs>
          <TabList align="center" id="form1">
            <Tab className={`filter-button project_button ${activeTab == "pets" ? "active" : ""}`} onClick={() => setActiveTab("pets")} data-filter="all">
              Pets
            </Tab>
            <Tab className={`filter-button project_button ${activeTab == "fashion" ? "active" : ""}`} onClick={() => setActiveTab("fashion")} data-filter="fashion">
              Fashion
            </Tab>
            <Tab className={`filter-button project_button ${activeTab == "bags" ? "active" : ""}`} onClick={() => setActiveTab("bags")} data-filter="bags">
              Bags
            </Tab>
            <Tab className={`filter-button project_button ${activeTab == "shoes" ? "active" : ""}`} onClick={() => setActiveTab("shoes")} data-filter="shoes">
              Shoes
            </Tab>
            <Tab className={`filter-button project_button ${activeTab == "watch" ? "active" : ""}`} onClick={() => setActiveTab("watch")} data-filter="watch">
              Watch
            </Tab>
          </TabList>
          <div className="zoom-gallery">
            <TabPanel className="row">
              <MasterTabPannel img={images} />
            </TabPanel>
            <TabPanel className="row">
              <MasterTabPannel img={fashionImages} />
            </TabPanel>
            <TabPanel className="row">
              <MasterTabPannel img={bagImages} />
            </TabPanel>
            <TabPanel className="row">
              <MasterTabPannel img={shoesImages} />
            </TabPanel>
            <TabPanel className="row">
              <MasterTabPannel img={watchImages} />
            </TabPanel>
          </div>
        </Tabs>
      </Container>
    </section>
  );
};

export default GridTwoPage;
