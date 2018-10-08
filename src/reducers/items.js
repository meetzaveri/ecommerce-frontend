export function itemsHaveError(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAVE_ERROR':
      return action.hasError;

    default:
      return state;
  }
}

export function itemsAreLoading(state = false, action) {
  switch (action.type) {
    case 'ITEMS_ARE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items;

    case 'LOAD_MORE_ITEMS_SUCCESS':
      return action.items;

    default:
      return state;
  }
}

export function filterItemsInProcess(state = [], action) {
  switch (action.type) {
    case 'FILTER_ITEMS_IN_PROCESS':
      return action.isFilterLoading;

    default:
      return state;
  }
}

export function filteredItems(state = [], action) {
  switch (action.type) {
    case 'FILTER_ITEMS_SUCCESS':
      return action.filteredItems;

    default:
      return state;
  }
}
