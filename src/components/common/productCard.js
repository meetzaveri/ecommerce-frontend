import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProductCard = props => {
  return (
    <Fragment>
      <div style={{ padding: '10px 0px', height: '400px' }}>
        <img
          alt="shirt"
          className="img-responsive"
          style={{ width: '200px' }}
          src={props.img}
        />
        <h3>{props.brand}</h3>
        <span>{props.productName}</span>
        <br />
        <span>{props.price}</span>
      </div>
    </Fragment>
  );
};

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default ProductCard;
