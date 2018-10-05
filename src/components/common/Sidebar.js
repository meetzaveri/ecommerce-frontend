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
    const updatedBrands = this.state.checkedItemsForBrands;
    updatedBrands.push(item);
    let finalBrandObj = {};
    let duplicateItems = this.state.checkedItemsForBrands;
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
    console.log(
      'this.state.checkedItemsForBrands',
      this.state.checkedItemsForBrands,
      finalProducts
    );
    this.props.onFilterBrand();
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      checkedItemsForBrands: finalProducts
    }));
  };

  handleToggleForColor = e => {
    console.log('e.target.name', e.target.name);
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      checkedItemsForColors: prevState.checkedItemsForColors.set(
        item,
        isChecked
      )
    }));
    console.log('this.state.checkedItemsforcolor');
  };

  render() {
    return (
      <Fragment>
        <div id="main_sidebar">
          <div className="checkbox-container">
            {/* For selecting brand */}
            Brand
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
            Color
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
