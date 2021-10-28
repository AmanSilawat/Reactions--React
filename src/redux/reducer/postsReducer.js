const initialState = [
    {
        id: 1,
        title: "User Content 1",
        img: 'https://picsum.photos/seed/picsum/500/200'
    },
    {
        id: 2,
        title: "User Content 2",
        img: 'https://picsum.photos/500/200?grayscale'
    },
];

const postsReducer = (state = initialState, action) => {
    return state
}

export default postsReducer;
