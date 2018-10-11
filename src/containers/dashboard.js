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
    const sortedItemsCounter = this.state.sortedItemsCounter;
    console.log('filterFlag', filterFlag);
    this.setState({ selectedValueForSortPrice: value });
    this.props.sortWithPrice(value, filterFlag);
    // if (value == 1 || value == 2) {
    //   this.props.sortWithPrice(
    //     API.sortPrice +
    //       '?sortFlag=' +
    //       value +
    //       '&pagination=' +
    //       sortedItemsCounter,
    //     sortedItemsCounter
    //   );
    // }
  };

  filterGeneral = (filterProdRequest, currentFilterCategory) => {
    console.log(
      'this.props.items products for filter prod req',
      this.props.items
    );
    this.setState({ selectedValueForSortPrice: 0, sortedItemsCounter: 0 });
    this.props.filterGeneral(
      this.props.items,
      filterProdRequest,
      currentFilterCategory
    );
  };
  sortItems = finalizedObj => {
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
      sortItems,
      handleOnChangeForSorting,
      resetFilter
    } = this;
    const actions = {
      loadDataViaPagination,
      sortItems,
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
  loadDataViaPagination: PropTypes.func
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
    filterGeneral: (items, filterProductRequest, currentFilterCategory) =>
      dispatch(
        filterGeneralItems(items, filterProductRequest, currentFilterCategory)
      ),
    sortWithPrice: (value, filterFlag) =>
      dispatch(sortItemswithPrice(value, filterFlag))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
