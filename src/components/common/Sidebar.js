import React, { Component, Fragment } from 'react';
import '../main.css';
import { Col, Nav, NavItem } from 'react-bootstrap';
import { checkboxes } from '../../utils/utils';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map(),
      checkedItemsForBrands: [],
      checkedItemsForColors: []
    };
  }

  handleToggleForBrand = e => {
    console.log('e.target.name', e.target.name);
    const item = e.target.name;
    const isChecked = e.target.checked;

    const checkedItemsForBrands = [...this.state.checkedItemsForBrands];
    checkedItemsForBrands.push(item);
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
    this.props.onFilterBrand(finalProducts);
    this.props.filterGeneral(
      {
        primaryColor: [...this.state.checkedItemsForColors],
        brand: finalProducts
      },
      finalProducts
    );
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      checkedItemsForBrands: finalProducts
    }));
  };

  handleToggleForColor = e => {
    console.log('e.target.name', e.target.name);
    const item = e.target.name;
    const isChecked = e.target.checked;

    const checkedItemsForColors = [...this.state.checkedItemsForColors];
    checkedItemsForColors.push(item);
    let finalColorObj = {};
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
    this.props.onFilterColor(finalProducts);
    this.props.filterGeneral(
      {
        brand: [...this.state.checkedItemsForBrands],
        primaryColor: finalProducts
      },
      finalProducts
    );
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      checkedItemsForColors: finalProducts
    }));
    console.log('this.state.checkedItemsforcolor');
  };

  render() {
    return (
      <Fragment>
        <div id="main_sidebar">
          <div className="checkbox-container">
            {/* For selecting brand */}
            <h2> Brand</h2>
            {this.props.items.brands &&
              this.props.items.brands.map(item => (
                <div key={item.key}>
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
              this.props.items.colors.map(item => (
                <div key={item.key}>
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
            {/* For selecting Color */}
            Price
            {checkboxes.map(item => (
              <div key={item.key}>
                <label>
                  {item.name}
                  <Checkbox
                    name={item.name}
                    checked={this.state.checkedItems.get(item.name)}
                    onChange={this.handleToggleForColor}
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

export default Sidebar;
