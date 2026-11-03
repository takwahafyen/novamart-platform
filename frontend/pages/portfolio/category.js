import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';

const Category = () => {
    return (
        <CommonLayout parent="home" title="elements" subTitle="category">
            <section className="section-b-space">
                <Container>
                    <Row>
                        <Col sm="12" className="text-center">
                            <h2>Product Categories</h2>
                            <p>Explore our wide collection of fashion, accessories, and shoes.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    );
};

export default Category;