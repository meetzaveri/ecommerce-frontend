import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProductCard = props => {
  return (
    <Fragment>
      <div style={{ padding: '20px' }}>
        <img
          alt="shirt"
          style={{ width: '200px', height: '100%' }}
          src={props.img}
        />
        <h3 style={{ padding: '0px', margin: '5px' }}>{props.brand}</h3>
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
