import React from "react";
import {Button, Form, FormCheck, Image, ListGroupItem} from "react-bootstrap";
import logo from "../views/logo.png"

const GarageItem = (props) => {

    const [name, setName] = React.useState("");
    const [info, setInfo] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState("");


    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeInfo = (e) => {
        setInfo(e.target.value);
    };

    const onChangeTags = (e) => {
        setTags([...tags, e.target.value]);
    };

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    };

    const onChangeImage = (e) => {
        setImage(e.target.value);
    };

    return (
        <ListGroupItem className="d-inline-flex align-items-center justify-content-between" style={{borderColor: "#85A582"}}>
            <FormCheck
                type="checkbox"
                id="item-checkbox"
                style={{marginInline:17, marginRight:30}}
            />
            <div
                className="img-container d-flex align-items-center"
                style={{width:100, height:100, textAlign:"center", marginRight:30}}
            >
                <Image
                    className="item-image"
                    onChange={onChangeImage}
                    src={image}
                    fluid
                />
            </div>
            <div className="name-and-tags flex-fill">
                <div className="item-name"
                     type="name"
                     fullWidth
                     value={name}
                     onChange={onChangeName}
                     required
                />
                <div className="item-tags text-black-50" style={{fontSize:14}}
                     type="name"
                     fullWidth
                     value={tags.map(tag => {return "#"+tag})}
                     onChange={onChangeTags}
                     required
                />
            </div>
            <div className="justify-content-end d-inline-flex align-items-center justify-content-end">
                <Button
                    className='btn'
                    variant="dark"
                    style={{backgroundColor: "#85A582", width: 80, marginRight: 10}}
                >
                    Edit
                </Button>
                <Button
                    className='btn'
                    variant="dark"
                    style={{backgroundColor: "#85A582", width: 80}}
                >
                    Remove
                </Button>
            </div>
        </ListGroupItem>
    );
};

export default GarageItem;