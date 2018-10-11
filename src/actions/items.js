import axios from 'axios';
import _ from 'lodash';
import { filteredItems } from './filteritems';

export function itemsHaveError(bool) {
  return {
    type: 'ITEMS_HAVE_ERROR',
    hasError: bool
  };
}

export function itemsAreLoading(bool) {
  return {
    type: 'ITEMS_ARE_LOADING',
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}

export function loadMoreItemsSuccess(items, prevStateItems) {
  let prevStateData = prevStateItems.data;
  let itemData = items.data;
  let finalArr = [...itemData, ...prevStateData];
  console.log('items', items, 'prevstatedata', prevStateItems, finalArr);

  items.data = finalArr;

  return {
    type: 'LOAD_MORE_ITEMS_SUCCESS',
    items
  };
}

// export function sortItemsWithPriceSuccess(items, prevStateItems) {
//   let prevStateData = prevStateItems.data;
//   let itemData = items.data;
//   let finalArr = [...itemData, ...prevStateData];
//   console.log('items', items, 'prevstatedata', prevStateItems, finalArr);

//   items.data = finalArr;

//   return {
//     type: 'SORTED_ITEMS_SUCCESS',
//     items
//   };
// }

export function loadMoreItemsHasError(bool) {
  return {
    type: 'LOAD_MORE_ITEMS_ERROR',
    hasError: bool
  };
}

export function resetFilter() {
  return {
    type: 'RESET_FILTER'
  };
}

export function itemsFetchData(url) {
  return dispatch => {
    dispatch(itemsAreLoading(true));

    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        console.log('response', response);
        dispatch(itemsAreLoading(false));
        return response;
      })
      .then(response => {
        dispatch(itemsFetchDataSuccess(response.data));
        dispatch(resetFilter());
      })
      .catch(() => dispatch(itemsHaveError(true)));
  };
}

export function sortItemswithPrice(sortFlag, filterFlag) {
  return (dispatch, getState) => {
    let obj = getState();
    let items = null;
    if (filterFlag) {
      items = obj.filteredItems.data;
    } else {
      items = obj.items.data;
    }
    console.log('items getState', items, sortFlag);
    dispatch(itemsAreLoading(true));
    const sortedArr = _.sortBy(items, i => i.price);
    let finalDataToPaginate = null;
    if (sortFlag == 1) {
      finalDataToPaginate = sortedArr;
    } else if (sortFlag == 2) {
      finalDataToPaginate = sortedArr.reverse();
    }
    let finalData = Object.assign({}, obj.items);
    finalData.data = finalDataToPaginate;
    console.log('finalData', finalData);
    dispatch(itemsAreLoading(false));
    if (filterFlag) {
      dispatch(filteredItems(finalData));
    } else {
      dispatch(itemsFetchDataSuccess(finalData));
    }

    // axios
    //   .get(url)
    //   .then(response => {
    //     if (response.status !== 200) {
    //       throw Error(response.statusText);
    //     }
    //     console.log('response', response);
    //     dispatch(itemsAreLoading(false));
    //     return response;
    //   })
    //   .then(response => {
    //     if (pagination == 0) {
    //       dispatch(itemsFetchDataSuccess(response.data));
    //     } else if (pagination > 0) {
    //       dispatch(sortItemsWithPriceSuccess(response.data, obj.items));
    //     }
    //   })
    //   .catch(() => dispatch(itemsHaveError(true)));
  };
}

export function loadMoreItems(url, prevData) {
  return (dispatch, getState) => {
    dispatch(itemsAreLoading(true));
    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        console.log('response', response);
        dispatch(itemsAreLoading(false));
        return response;
      })
      .then(response => dispatch(loadMoreItemsSuccess(response.data, prevData)))
      .catch(() => dispatch(loadMoreItemsHasError(true)));
  };
}
