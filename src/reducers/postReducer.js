import {DELETE_POST, FETCH_POSTS, NEW_POST, UPDATE_POST} from "../actions/type";

const initialState = {
    items: [],
    item: {},
    itemId: 0
}
export default function (state = initialState, action) {

    console.log("state item:" + state.item);
    console.log("state items:" + state.items);
    console.log("state payload:" + action.payload);

    switch (action.type) {
        case FETCH_POSTS:
            console.log('reducer fetch posts');
            return {
                ...state,
                items: action.payload
            };
        case NEW_POST:
            console.log('reducer create post');
            return {
                ...state,
                item: action.payload
            };
        case DELETE_POST:
            console.log('reducer delete post');
            return {
                ...state,
                itemId: action.payload
            };
        case UPDATE_POST:
            console.log('reducer update post');
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;

    }

}