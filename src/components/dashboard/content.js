import React, { Fragment, Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../common/productCard';
import PropTypes from 'prop-types';

const Content = props => {
  console.log('Props in content.js', props);
  return (
    <Fragment>
      {props.items.data &&
        props.items.data.map((item, index) => (
          <React.Fragment key={item.productId}>
            <Col xs={4} md={4}>
              <ProductCard
                img={item.img}
                brand={item.brand}
                productName={item.product}
                price={item.price}
              />
            </Col>
          </React.Fragment>
        ))}
    </Fragment>
  );
};

Content.propTypes = {
  items: PropTypes.shape({
    data: PropTypes.array
  })
};

export default Content;
