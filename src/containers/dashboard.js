import React, { Component } from 'react';
import Dashboard from '../components/dashboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { itemsFetchData } from '../actions/items';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchData('http://localhost:8000/');
  }
  filterBrand = () => {
    this.props.filterBrand();
  };
  render() {
    console.log('this.props.items', this.props.items);
    return (
      <div>
        <Dashboard items={this.props.items} onFilterBrand={this.filterBrand} />
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  fetchData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
