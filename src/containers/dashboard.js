import React, { Component } from 'react';
import Dashboard from '../components/dashboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { itemsFetchData } from '../actions/items';
import { filterItemsAction, filterGeneralItems } from '../actions/filteritems';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/');
  }
  filterBrand = filterProdRequest => {
    console.log('finalProducts for brand', filterProdRequest, this.props.items);
    this.props.filterBrand(this.props.items, filterProdRequest);
  };
  filterColor = filterProdRequest => {
    console.log('finalProducts for color', filterProdRequest, this.props.items);
    this.props.filterColor(this.props.items, filterProdRequest);
  };
  filterGeneral = filterProdRequest => {
    this.props.filterGeneral(this.props.items, filterProdRequest);
  };
  render() {
    console.log('this.props.items', this.props.items);
    return (
      <div>
        {this.props.filteredItems.data &&
        this.props.filteredItems.data.length > 0 ? (
          <Dashboard
            items={this.props.filteredItems}
            onFilterBrand={this.filterBrand}
            onFilterColor={this.filterColor}
            filterGeneral={this.filterGeneral}
          />
        ) : (
          <Dashboard
            items={this.props.items}
            onFilterBrand={this.filterBrand}
            onFilterColor={this.filterColor}
            filterGeneral={this.filterGeneral}
          />
        )}
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  fetchData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    items: state.items,
    filteredItems: state.filteredItems,
    filterItemsInProcess: state.filterItemsInProcess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
    filterBrand: (items, filterProductRequest) =>
      dispatch(filterItemsAction(items, 'brand', filterProductRequest)),
    filterColor: (items, filterProductRequest) =>
      dispatch(filterItemsAction(items, 'primaryColor', filterProductRequest)),
    filterGeneral: (items, filterProductRequest) =>
      dispatch(filterGeneralItems(items, filterProductRequest))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
