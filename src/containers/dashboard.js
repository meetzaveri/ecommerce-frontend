import React, { Component } from 'react';
import Dashboard from '../components/dashboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { itemsFetchData, loadMoreItems } from '../actions/items';
import { filterGeneralItems } from '../actions/filteritems';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchData('http://localhost:8000?pagination=0');
  }
  loadDataViaPagination = pagination => {
    this.props.loadMoreItems(
      'http://localhost:8000?pagination=' + pagination,
      this.props.items
    );
  };

  filterGeneral = (filterProdRequest, currentFilterCategory) => {
    console.log(
      'this.props.items products for filter prod req',
      this.props.items
    );
    this.props.filterGeneral(
      this.props.items,
      filterProdRequest,
      currentFilterCategory
    );
  };
  render() {
    console.log('this.props.items', this.props.items);
    console.log('this.props.filteredItems', this.props.filteredItems);
    const { items, filteredItems } = this.props;
    const { loadDataViaPagination } = this;
    const actions = { loadDataViaPagination };
    return (
      <div>
        {filteredItems.data && filteredItems.data.length >= 0 ? (
          <Dashboard
            items={filteredItems}
            filterGeneral={this.filterGeneral}
            filterFlag={true}
            actions={actions}
          />
        ) : (
          <Dashboard
            items={items}
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
  filteredItems: PropTypes.object
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
    filterGeneral: (items, filterProductRequest, currentFilterCategory) =>
      dispatch(
        filterGeneralItems(items, filterProductRequest, currentFilterCategory)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
