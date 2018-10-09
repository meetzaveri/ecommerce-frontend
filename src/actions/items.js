import axios from 'axios';

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

export function loadMoreItemsHasError(bool) {
  return {
    type: 'LOAD_MORE_ITEMS_ERROR',
    hasError: bool
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
      .then(response => dispatch(itemsFetchDataSuccess(response.data)))
      .catch(() => dispatch(itemsHaveError(true)));
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
