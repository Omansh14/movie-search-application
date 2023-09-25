const initialState = {
    user: {
        auth: {},
    },
    app:{
        movieList: [],
        loadingState: 'UNINITIALIZED',
        error: '',
    },
    wishList: {
        wishItems: [],
    },
};

export default initialState;