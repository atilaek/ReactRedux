import {DELETE_POST, FETCH_POSTS, NEW_POST, UPDATE_POST} from "../actions/type";

export const fetchPosts = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_POSTS,
            payload: data
        }));
};

export const createPost = (postData) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => dispatch({
            type: NEW_POST,
            payload: data
        }));
};

export const deletePost = (post) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + (post.id-1),
        {
            method: 'DELETE'
        })
    //.then(res => console.log(res.json()))
        .then(res => res.json())
        .then(data => dispatch({
            type: DELETE_POST,
            payload: post
        }))
        .catch(error => console.error(error));
};

export const updatePost = (post) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            post
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(() => dispatch({
            type: UPDATE_POST,
            payload: post //data doesnt come filled up so we return the updated
        }))
        .catch(error => console.error(error));
};
