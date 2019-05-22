import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from 'reactstrap';
import {connect} from "react-redux";
import {deletePost, fetchPosts, updatePost} from "../actions/postActions";
import EditPost from "./EditPost";


class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deletedPostIDs: [],
            showModal: false,
            editPost: {
                id: "",
                userId: "",
                title: "",
                body: ""
            }
        }

        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.toggle = this.toggle.bind(this);
        this.changeModalState = this.changeModalState.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    deletePost(e, post) {
        this.props.deletePost(post);
        this.setState(state => {
            state.deletedPostIDs.push(post.id-1);
        });
    }

    editPost(e, index) {
        const thePost = this.props.posts[index];
        this.setState({editPost: thePost})
        this.toggle();
    }


    changeModalState(){
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }
    render() {
        const postItems = this.props.posts
        //must fake deleted posts since web service is also faking
            .filter(post => !this.state.deletedPostIDs.includes(post.id))
            .filter(post => post)
            .map(post =>
                <tr key={post.id}>
                    <th scope="row">{post.id}</th>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td><Button color="danger" onClick={(e) => this.editPost(e, post.id - 1)}>EDIT</Button></td>
                    <td><Button color="danger" onClick={(e) => this.deletePost(e, post)}>DELETE</Button></td>
                </tr>
            )



        return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>UserId</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                {postItems}
                </tbody>

                {this.state.showModal &&
                    <EditPost showModal= {this.changeModalState} postToEdit={this.state.editPost}/>}
                }
            </Table>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    deletedPostIDs: PropTypes.array,
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

const mapDispatchToProps = {
    fetchPosts,
    updatePost,
    deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);