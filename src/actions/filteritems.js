import { itemsFetchData } from './items';
import API from '../api/api';
import axios from 'axios';

export function filterItemsInProcess(bool) {
  return {
    type: 'FILTER_ITEMS_IN_PROCESS',
    isFilterLoading: bool
  };
}

export function filteredItems(filteredItems) {
  return {
    type: 'FILTER_ITEMS_SUCCESS',
    filteredItems
  };
}

export function filterItemsAction(
  items,
  filterCategory,
  filterProductRequestArr
) {
  return dispatch => {
    // dispatch(filterItemsInProcess(true));
    // // console.log('items in filteritems action',items);
    // console.log(
    //   'filterProductRequestArr',
    //   filterProductRequestArr,
    //   items,
    //   filterCategory
    // );
    // let dataToFilter = Object.assign({}, items);
    // if (filterProductRequestArr.length === 0) {
    //   dispatch(itemsFetchData(API.getData));
    // } else {
    //   let newArr = dataToFilter.data.filter(item => {
    //     let matchedItem = null;
    //     filterProductRequestArr.forEach(prod => {
    //       if (prod === item[filterCategory]) {
    //         console.log('Product is matched');
    //         matchedItem = item;
    //       }
    //     });
    //     if (matchedItem) {
    //       return matchedItem;
    //     }
    //   });
    //   console.log('newArr', newArr);
    //   dataToFilter.data = newArr;
    //   // console.log('dataToFilter',dataToFilter);
    // }
    // dispatch(filterItemsInProcess(false));
    // dispatch(filteredItems(dataToFilter));
  };
}

export function filterGeneralItems(
  productData,
  filterRequestArr,
  currentFilterCategory
) {
  return async dispatch => {
    dispatch(filterItemsInProcess(true));
    let items = Object.assign({}, productData);
    let filteredDataFromServer = null;
    // console.log('items in filter general', productData, filterRequestArr);
    let rawfilterProductRequestArr = {
      primaryColor: filterRequestArr.primaryColor.join(','),
      brands: filterRequestArr.brand.join(',')
    };

    let filterReq = JSON.stringify(rawfilterProductRequestArr);

    await axios
      .post(API.filterData, {
        filterReq,
        currentFilterCategory
      })
      .then(responseJson => {
        // console.log('AFTER POST API CALL data', responseJson);
        filteredDataFromServer = responseJson.data;
      });
    items.data = filteredDataFromServer;
    dispatch(filterItemsInProcess(false));
    dispatch(filteredItems(items));
  };
}
