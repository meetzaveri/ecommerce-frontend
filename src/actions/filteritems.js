import { itemsFetchData } from './items';
import API from '../api/api';

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
    dispatch(filterItemsInProcess(true));
    // console.log('items in filteritems action',items);
    console.log(
      'filterProductRequestArr',
      filterProductRequestArr,
      items,
      filterCategory
    );
    let dataToFilter = Object.assign({}, items);
    if (filterProductRequestArr.length === 0) {
      dispatch(itemsFetchData(API.getData));
    } else {
      let newArr = dataToFilter.data.filter(item => {
        let matchedItem = null;
        filterProductRequestArr.forEach(prod => {
          if (prod === item[filterCategory]) {
            console.log('Product is matched');
            matchedItem = item;
          }
        });
        if (matchedItem) {
          return matchedItem;
        }
      });
      console.log('newArr', newArr);
      dataToFilter.data = newArr;
      // console.log('dataToFilter',dataToFilter);
    }

    dispatch(filterItemsInProcess(false));
    dispatch(filteredItems(dataToFilter));
  };
}

export function filterGeneralItems(items, filterProductRequestArr) {
  return dispatch => {
    console.log('items in filter general', items, filterProductRequestArr);
    let filterpass1ForBrand = [];
    let filterpass1ForColors = [];

    // filter pass 1 for brand
    items.data.forEach(item => {
      filterProductRequestArr.brand.forEach(i => {
        if (item.brand === i) {
          filterpass1ForBrand.push(item);
        }
      });
    });

    // filter pass 1 for colors
    items.data.forEach(item => {
      filterProductRequestArr.primaryColor.forEach(i => {
        if (item.primaryColor === i) {
          filterpass1ForColors.push(item);
        }
      });
    });

    console.log(
      'Filter pass 1 results',
      filterpass1ForBrand,
      filterpass1ForColors
    );

    let filterpass2ForBrands = [];
    let filterpass2ForColors = [];

    // filter pass 2 for brands filtering with colors
    filterpass1ForBrand.forEach(item => {
      filterProductRequestArr.primaryColor.forEach(i => {
        if (item.primaryColor === i) {
          filterpass2ForBrands.push(item);
        }
      });
    });

    // filter pass 2 for colors filtering with brands
    filterpass1ForColors.forEach(item => {
      filterProductRequestArr.brand.forEach(i => {
        if (item.brand === i) {
          filterpass2ForColors.push(item);
        }
      });
    });

    console.log(
      'Filter pass 2 results',
      filterpass2ForBrands,
      filterpass2ForColors
    );
  };
}
