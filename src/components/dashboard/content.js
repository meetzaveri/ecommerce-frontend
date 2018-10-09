import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../common/productCard';
import PropTypes from 'prop-types';

let paginationCounter = 0;

const Content = props => {
  console.log('Props in content.js', props);
  return (
    <Fragment>
      <Row>
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
      </Row>
      <Row>
        <Col style={{ textAlign: 'center' }} xs={12} md={12}>
          {paginationCounter < 4 && !props.filterFlag ? (
            <button
              onClick={() => {
                ++paginationCounter;
                console.log('paginationCounter', paginationCounter);
                props.actions.loadDataViaPagination(paginationCounter);
              }}
            >
              Load More
            </button>
          ) : (
            <div>No more products</div>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

Content.propTypes = {
  items: PropTypes.shape({
    data: PropTypes.array
  }),
  actions: PropTypes.shape({
    loadDataViaPagination: PropTypes.func
  }),
  filterFlag: PropTypes.bool
};

export default Content;
