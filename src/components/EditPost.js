import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {connect} from "react-redux";
import {updatePost} from "../actions/postActions";

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editPostTitle: this.props.postToEdit.title,
            editPostBody: this.props.postToEdit.body
        }
        this.onChange = this.onChange.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.showModal();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    updatePost(e) {
        e.preventDefault();
        const updatePost =
            {
                id: this.props.postToEdit.id,
                userId: this.props.postToEdit.userId,
                title: this.state.editPostTitle,
                body: this.state.editPostBody
            };
        this.props.updatePost(updatePost);
        this.toggle();
    }

    render() {
        return (
            <Modal isOpen={true} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>EDIT POST</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label for="exampleText" sm={2}>Title</Label>
                        <Col sm={10}>
                            <Input type="text" name="editPostTitle" id="editPostTitle"
                                   defaultValue={this.props.postToEdit.title}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleText" sm={2}>Body</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="editPostBody" id="editPostBody"
                                   defaultValue={this.props.postToEdit.body}
                                   onChange={this.onChange}/>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.updatePost}>Update Post</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

EditPost.propTypes = {
    postToEdit: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

const mapDispatchToProps = {
    updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);