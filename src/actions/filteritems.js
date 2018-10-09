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
    items.filterSuccess = true;
    console.log('filteredDataFromServer', filteredDataFromServer, items);
    dispatch(filterItemsInProcess(false));
    dispatch(filteredItems(items));
  };
}

export function sortItems(sortParams) {
  return async (dispatch, getState) => {
    dispatch(filterItemsInProcess(true));
    let obj = getState();
    let items = Object.assign({}, obj.items);
    let sortedDataFromServer = null;
    // console.log('items in filter general', productData, filterRequestArr);
    let rawSortItemReqObj = {
      maxLimit: sortParams.maxLimit,
      minLimit: sortParams.minLimit
    };

    let sortItemReq = JSON.stringify(rawSortItemReqObj);

    await axios
      .post(API.sortData, {
        sortItemReq
      })
      .then(responseJson => {
        // console.log('AFTER POST API CALL sort items', responseJson);
        sortedDataFromServer = responseJson.data;
      });

    items.data = sortedDataFromServer.data;
    console.log('sortedDataFromServer', sortedDataFromServer, items);
    dispatch(filterItemsInProcess(false));
    dispatch(filteredItems(items));
  };
}
