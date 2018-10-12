import React, { Fragment } from 'react';
import { Row, Col, Navbar } from 'react-bootstrap';
import ProductCard from '../common/productCard';
import PropTypes from 'prop-types';

let paginationCounter = 0;

const Content = props => {
  console.log('Props in content.js', props);
  return (
    <Fragment>
      <Navbar fixedTop style={{ width: 'inherit', left: '15%' }}>
        <Col style={{ padding: '20px' }}>
          <form>
            <select
              value={props.state.selectedValueForSortPrice}
              onChange={e =>
                props.actions.handleOnChangeForSorting(e, props.filterFlag)
              }
            >
              <option defaultValue="0">Select sorting</option>
              <option value="1">Price : Low to High</option>
              <option value="2">Price : High to Low</option>
            </select>
          </form>
        </Col>
      </Navbar>
      <Row style={{ marginTop: '5%' }}>
        {props.items.data &&
          props.items.data.map((item, index) => (
            <React.Fragment>
              <Col xs={4} sm={4} md={4} key={item.productId}>
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
      <Row style={{ padding: '20px' }}>
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
