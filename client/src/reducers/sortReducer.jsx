export const initialSortState = {
    booksSorting: {
        sortCriteria: '',
        sortDirection: ''
    },
    commentsSorting: {
        sortCriteria: '',
        sortDirection: ''
    },
    ordersSorting: {
        sortCriteria: '',
        sortDirection: ''
    },
}

const setSortSettings = (state) => {
    localStorage.setItem('sortSettings', JSON.stringify(state));
}

const getSortSettings = () => {
    const storageData = localStorage.getItem('sortSettings');
    if (storageData) {
        const sortSettings = JSON.parse(storageData);
        return sortSettings;
    } else {
        setSortSettings(initialSortState);
    }
}

export const sortReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_SORT_FROM_STORAGE':
            state.booksSorting.sortCriteria = action.payload.criteria;
            state.booksSorting.sortDirection = action.payload.direction;
            return state;

        case 'SORT':
            state.booksSorting.sortCriteria = action.payload.criteria;
            state.booksSorting.sortDirection = action.payload.direction;
            // console.log(state.sortedBooks);
            setSortSettings(state);
            return state;

        default:
            return state;
    }
};