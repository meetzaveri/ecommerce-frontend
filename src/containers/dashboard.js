import React, { Component } from 'react';
import Dashboard from '../components/dashboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  itemsFetchData,
  loadMoreItems,
  sortItemswithPrice
} from '../actions/items';
import { filterGeneralItems, sortItems } from '../actions/filteritems';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedValueForSortPrice: 0, sortedItemsCounter: 0 };
  }
  componentDidMount() {
    this.props.fetchData('http://localhost:8000?pagination=0');
  }
  resetFilter = () => {
    this.props.fetchData('http://localhost:8000?pagination=0');
  };

  loadDataViaPagination = pagination => {
    this.setState({ selectedValueForSortPrice: 0, sortedItemsCounter: 0 });
    this.props.loadMoreItems(
      'http://localhost:8000?pagination=' + pagination,
      this.props.items
    );
  };

  handleOnChangeForSorting = (e, filterFlag) => {
    const value = e.target.value;
    console.log('filterFlag', filterFlag, value);
    this.setState({ selectedValueForSortPrice: value });
    if (value == 1 || value == 2) {
      this.props.sortWithPrice(value, filterFlag);
    }
  };

  filterGeneral = (filterProdRequest, currentFilterCategory) => {
    console.log(
      'this.props.items products for filter prod req',
      this.props.items
    );
    const sortPriceValue = this.state.selectedValueForSortPrice;
    if (sortPriceValue == 1 || sortPriceValue == 2) {
      this.props.filterGeneral(
        this.props.items,
        filterProdRequest,
        currentFilterCategory,
        sortPriceValue
      );
    } else {
      this.props.filterGeneral(
        this.props.items,
        filterProdRequest,
        currentFilterCategory
      );
    }
  };
  filterItemsForPrice = finalizedObj => {
    console.log('finalizedObj', finalizedObj);
    if (finalizedObj.minLimit === Infinity) {
      console.log('Actuall null value');
      this.props.fetchData('http://localhost:8000?pagination=0');
    } else {
      this.props.sortItems(finalizedObj);
    }
  };
  render() {
    console.log('this.props.items', this.props.items);
    console.log('this.props.filteredItems', this.props.filteredItems);
    const { items, filteredItems } = this.props;
    const {
      loadDataViaPagination,
      filterItemsForPrice,
      handleOnChangeForSorting,
      resetFilter
    } = this;
    const actions = {
      loadDataViaPagination,
      filterItemsForPrice,
      resetFilter,
      handleOnChangeForSorting
    };
    return (
      <div>
        {filteredItems.data && filteredItems.data.length >= 0 ? (
          <Dashboard
            items={filteredItems}
            state={this.state}
            filterGeneral={this.filterGeneral}
            filterFlag={true}
            actions={actions}
          />
        ) : (
          <Dashboard
            items={items}
            state={this.state}
            filterGeneral={this.filterGeneral}
            filterFlag={false}
            actions={actions}
          />
        )}
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  fetchData: PropTypes.func,
  loadDataViaPagination: PropTypes.func,
  filteredItems : PropTypes.array,
  items : PropTypes.object
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
    loadMoreItems: (url, prevStateData) =>
      dispatch(loadMoreItems(url, prevStateData)),
    sortItems: sortParams => dispatch(sortItems(sortParams)),
    filterGeneral: (
      items,
      filterProductRequest,
      currentFilterCategory,
      sortPriceValue
    ) =>
      dispatch(
        filterGeneralItems(
          items,
          filterProductRequest,
          currentFilterCategory,
          sortPriceValue
        )
      ),
    sortWithPrice: (value, filterFlag) =>
      dispatch(sortItemswithPrice(value, filterFlag))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
