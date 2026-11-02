import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import { Media, Container, Row, Col } from 'reactstrap';
import menu2 from '../../public/assets/images/mega-menu/2.jpg';
import Products from "../../components/common/Collections/Collection12";

const Metro = () => {
    return (
        <CommonLayout title="collection" parent="home" >
            <section className="">
                <div className="collection-wrapper">
                    <Container>
                        <Row>
                            <Col className="collection-content">
                                <div className="page-main-content">
                                    <div className="top-banner-wrapper">
                                        <a href={null}>
                                            <Media src={menu2.src} className="img-fluid blur-up lazyload" alt="" />
                                        </a>
                                        <div className="top-banner-content small-section pb-0">
                                            <h4>fashion</h4>
                                        </div>
                                    </div>
                                    <div className="collection-product-wrapper">
                                        <Products type="metro" col="metro" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </CommonLayout>
    )
}

export default Metro;