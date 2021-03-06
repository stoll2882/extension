/*global chrome*/
import React, {useEffect, useState} from "react";
import {Container, Form, Button, Row, Col} from "react-bootstrap";
import { addPost } from "./actions/post";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCategory, loadUser, uploadPostPicture } from './actions/auth';
import validator from 'validator';
import CreatableSelect from 'react-select/creatable';
import "./NewPost.css";
import tempPic from './placeholder-image.jpg';
import { logout } from './actions/auth';


function NewPost({addPost, addCategory, logout, uploadPostPicture, auth: { user }}){
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({})
    const [selectedOptions, setSelectedOptions] = useState([])
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState(null);

    // on submit updateFormData inside useEffect dependent on cahnges from my values
    const findFormErrors = () => {
        const newErrors = {}
        // keywords errors
        console.log("reading title: "+ formData.title)
        if ( formData.title.length === 0) {
        newErrors.title = "Post must have a title."
        }
        if ( formData.url.length === 0 ){
            newErrors.url = "URL cannot be blank."
        }

        console.log("category: " + formData.category)
        if (formData.category.length === 0){
            newErrors.category = "Please select a category or create a new one."
        }

        console.log("validating url: " + formData.url)
        
        if (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(formData.url)){
            console.log("url validation")
        }
       
        if (!validator.isURL(formData.url)){
            newErrors.url = "Invalid URL."
        }

        return newErrors
    }

    // set if user is validated from MyRead or not
    function validate(){
        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
            setValidated(false)
            return false
        }
        else {
            setErrors({})
            setValidated(true)
            return true
        }
    }

    const options = user != undefined && user.categories.length !== 0? user.categories.map(category => ({value: category, label: category})): [];
    
    // initialize form data to empty strings, changes on user input
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    picture: '',
    category: '',
    });

    function handleSelections(newOption) {  
        console.log("setting options...")
        console.log(newOption !== undefined && newOption.length != 0 ? newOption[0].value : "")
        setSelectedOptions(selectedOptions => [...selectedOptions, newOption]);
        setFormData(formData => ({...formData, category: newOption != undefined && newOption.length !== 0 ? newOption[0].value : ""}))
    }

    // upload link and photo data on submission
    async function submit(event){
        event.preventDefault();
        if (validate()){
            var validForm = formData
            if (!formData.url.includes('www.')){
                console.log("adding www.")
                validForm.url = "www." + validForm.url
            }
            if (validForm.url.startsWith('www')){
                console.log("adding http://")
                validForm.url = "http://" + validForm.url
            }
            if (!user.categories.includes(validForm.category)){
                await addCategory(validForm.category)
            }
            console.log(validForm)
            
            setFormData(formData => ({...formData, picture: ""}))
            console.log(images[0])
            const res = await addPost(validForm)
            await uploadPostPicture(images[0], res._id)
            
            // console.log(res).then(res => (
            //     uploadPostPicture(images[0], res._id)
            // ))

            setFormData({
                title: '',
                description: '',
                url: '',
                picture: '',
                category: '',
                })
        }
 
    }

    // set photo
    async function onImageChange(e){
        console.log(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0]);
        await setImages([e.target.files[0]])
        setPreview(url);
    }

    // get current url of active tab
    useEffect(() => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                let url = tabs[0].url;
                // use `url` here inside the callback because it's asynchronous!
                setFormData({
                    url: url
                    })
            });
    }, []);
    
    
    return(
        <div>
                <h1 className="my-h1">MyRead</h1>
                <Row className="text-center">Curate a new post</Row>
                <Form>
                <Form.Group style={{marginTop:"0.5rem"}}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={formData.title} placeholder="Enter Title" onChange={(e) => setFormData(formData => ({...formData, title: e.target.value}))} isInvalid={ !!errors.title }/>
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group style={{marginTop:"0.5rem"}}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" value={formData.description} as="textarea" placeholder="Enter Description" onChange={(e) => setFormData(formData => ({...formData, description: e.target.value}))} />
                </Form.Group>
                <Form.Group style={{marginTop:"0.5rem"}}>
                    <Form.Label>Link</Form.Label>
                    <Form.Control name="url" value={formData.url} type="url" placeholder="Enter URL" onChange={(e) => setFormData(formData => ({...formData, url: e.target.value}))}  isInvalid={ !!errors.url }/>
                    <Form.Control.Feedback type="invalid">{errors.url}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group style={{marginTop:"0.5rem"}}>
                    <Form.Label>Category</Form.Label>
                    <CreatableSelect
                        name="category"
                        isMulti
                        options={options}
                        onChange={handleSelections}
                    />
                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                        <Row style={{marginTop:"0.5rem", marginLeft:"0.5rem"}}><Form.Label>Upload Picture</Form.Label></Row>
                        <Col >
                            <img style={{height:"85px", width:"135px", objectFit:"cover", marginBottom:"1rem"}} src = {preview != null? preview : tempPic} />
                        </Col>
                            <input type="file" accept="image/*" onChange={e=> {onImageChange(e)}} />
                    </Form.Group>
                <Button style={{marginTop:"1rem"}} className="rounded-pill" type = "primary" onClick={e => submit(e)}>Save Post</Button>
                <Button style={{marginTop:"1rem"}} className="rounded-pill" type = "primary" onClick={e => logout()}>Log Out</Button>
                </Form>
                <Row>

                </Row>
            </div>
    )
}

NewPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    addCategory: PropTypes.func.isRequired,
    uploadPostPicture: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
  });


export default connect(mapStateToProps,{addPost, addCategory, logout, loadUser, uploadPostPicture})(NewPost);