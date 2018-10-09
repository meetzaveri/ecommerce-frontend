import React, { Component, Fragment } from 'react';
import '../main.css';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';
import { checkboxes } from '../../utils/utils';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map(),
      checkedItemsForBrands: [],
      checkedItemsForColors: [],
      checkedItemsForPrice: []
    };
  }

  handleToggleForBrand = e => {
    // console.log('e.target.name', e.target.name);
    const item = e.target.name;
    const isChecked = e.target.checked;

    const checkedItemsForBrands = [...this.state.checkedItemsForBrands];
    checkedItemsForBrands.push(item);

    // DEDUPLICATION
    let finalBrandObj = {};
    let duplicateItems = checkedItemsForBrands;
    duplicateItems.forEach(i => {
      if (item === i) {
        if (isChecked) {
          finalBrandObj[i] = i;
        } else {
          delete finalBrandObj[i];
        }
      } else {
        finalBrandObj[i] = i;
      }
    });
    let finalProducts = Object.keys(finalBrandObj);
    console.log('checkedItemsForBrands', checkedItemsForBrands, finalProducts);
    this.props.filterGeneral(
      {
        primaryColor: [...this.state.checkedItemsForColors],
        brand: finalProducts
      },
      finalProducts.length > 0 ? 'brand' : 'primaryColor'
    );
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      checkedItemsForBrands: finalProducts
    }));
  };

  handleToggleForColor = e => {
    // console.log('e.target.name', e.target.name);
    const item = e.target.name;
    const isChecked = e.target.checked;

    const checkedItemsForColors = [...this.state.checkedItemsForColors];
    checkedItemsForColors.push(item);
    let finalColorObj = {};

    // DEDUPLICATION
    let duplicateItems = checkedItemsForColors;
    duplicateItems.forEach(i => {
      if (item === i) {
        if (isChecked) {
          finalColorObj[i] = i;
        } else {
          delete finalColorObj[i];
        }
      } else {
        finalColorObj[i] = i;
      }
    });
    let finalProducts = Object.keys(finalColorObj);
    console.log('checkedItemsForColors', checkedItemsForColors, finalProducts);
    this.props.filterGeneral(
      {
        brand: [...this.state.checkedItemsForBrands],
        primaryColor: finalProducts
      },
      finalProducts.length > 0 ? 'primaryColor' : 'brand'
    );
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      checkedItemsForColors: finalProducts
    }));
    console.log('this.state.checkedItemsforcolor');
  };

  handleSortingForPrice = e => {
    console.log('e.target.name', e.target.name);
    const item = e.target.name;
    const isChecked = e.target.checked;
    const checkedItemsForPrice = [...this.state.checkedItemsForPrice];
    checkedItemsForPrice.push(item);
    let finalPriceObj = {};

    // DEDUPLICATION
    let duplicateItems = checkedItemsForPrice;
    duplicateItems.forEach(i => {
      if (item === i) {
        if (isChecked) {
          finalPriceObj[i] = i;
        } else {
          delete finalPriceObj[i];
        }
      } else {
        finalPriceObj[i] = i;
      }
    });
    console.log('finalPriceObj', finalPriceObj);
    let finalProducts = Object.keys(finalPriceObj);

    // End product/result that to customize and set max and min limits
    let maxLimit = null;
    let minLimit = null;
    let minSlot = [];
    let maxSlot = [];
    finalProducts.forEach((item, index) => {
      let i_split = item.split(',');
      let i_0 = parseInt(i_split[0]);
      let i_1 = parseInt(i_split[1]);
      minSlot.push(i_0);
      maxSlot.push(i_1);
    });
    maxLimit = Math.max(...maxSlot);
    minLimit = Math.min(...minSlot);
    let finalizedObj = {
      maxLimit,
      minLimit
    };
    console.log('checkedItemsForPrice', checkedItemsForPrice, finalizedObj);
    this.props.actions.sortItems(finalizedObj);

    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      checkedItemsForPrice: finalProducts
    }));
  };

  render() {
    return (
      <Fragment>
        <div id="main_sidebar">
          <div className="checkbox-container">
            {/* For selecting brand */}
            <h2> Brand</h2>
            {this.props.items.brands &&
              this.props.items.brands.map((item, index) => (
                <div key={index}>
                  <label>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.state.checkedItems.get(item)}
                      onChange={this.handleToggleForBrand}
                    />
                  </label>
                </div>
              ))}
          </div>
          <div className="checkbox-container">
            {/* For selecting Color */}
            <h2>Color</h2>
            {this.props.items.colors &&
              this.props.items.colors.map((item, index) => (
                <div key={index}>
                  <label>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.state.checkedItems.get(item)}
                      onChange={this.handleToggleForColor}
                    />
                  </label>
                </div>
              ))}
          </div>
          <div className="checkbox-container">
            Price
            {checkboxes.map((item, index) => (
              <div key={index}>
                <label>
                  {item.label}
                  <Checkbox
                    name={item.name}
                    checked={this.state.checkedItems.get(item.name)}
                    onChange={this.handleSortingForPrice}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

Sidebar.propTypes = {
  filterGeneral: PropTypes.func,
  actions: PropTypes.shape({
    sortItems: PropTypes.func
  })
};

export default Sidebar;
