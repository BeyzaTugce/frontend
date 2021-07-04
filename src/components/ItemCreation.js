import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    Col,
    Container,
    FormCheck,
    FormGroup,
    FormLabel,
    FormControl,
    ListGroup,
    ListGroupItem, Nav,
    Row, TabContent, TabPane, TabContainer
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {PlusLg} from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import FileBase from "react-file-base64";
import GarageItem from "./GarageItem";


const ItemCreation = (props) => {
    const history = useHistory();

    const [itemTitle, setItemTitle] = React.useState("");
    const [itemInfo, setItemInfo] = React.useState("");
    const [itemTags, setItemTags] = React.useState([]);
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemImage, setItemImage] = React.useState([]);

    const extractItem = () => {
        if (!props.item) {
            return;
        }
    }

    const onChangeItemTitle = (e) => {
        setItemTitle(e.target.value);
    };

    const onChangeItemInfo = (e) => {
        setItemInfo(e.target.value);
    };

    const onChangeItemTags = (e) => {
        setItemTags(e.target.value);
    };

    const onChangeItemPrice = (e) => {
        setItemPrice(e.target.value);
    };

    const onChangeItemImage = (e) => {
        setItemImage(e.target.value);
    };


    const packItem = () => {
        let back = {
            ...props.item,
        };

        back.name = itemTitle;
        back.price = itemPrice;
        back.tags = itemTags;
        back.info = itemInfo;
        back.image = itemImage;

        return back;
    };

    // indicates whether the item can be changed
    const [editMode, setEditMode] = React.useState(null);

    useEffect(() => {
        if (!props.new) {
            extractItem();
        }
    }, [props.item, props.new]);

    // triggers when the new parameter is changed and setts the edit mode to true
    useEffect(() => {
        if (props.new) {
            setEditMode(true);
        }
    }, [props.new]);


    const onSave = () => {
        if (props.new) {
            props.onCreate(packItem());
        } else {
            setEditMode(false);
            props.onSave(packItem());
        }
    };

    return(
        <div className="d-inline-block" style={{paddingRight: 40, width: 600}}>
            <Button className="button-rounded"
                    onClick={onSave}
                    type="save"
            >
                <PlusLg></PlusLg>

            </Button>
            <FormLabel className="frame">Add Item</FormLabel>
            <ListGroup>
                <ListGroupItem className="d-flex align-items-start">
                    <TabContainer id="left-tabs-example" defaultActiveKey="info">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="item">Item Title</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="info">General Information</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="price">Price</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="tag">Tags</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="image">Upload Image</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <TabContent>
                                    <TabPane eventKey="item">
                                        <FormControl type="title" placeholder="Enter item title"
                                                     fullWidth
                                                     value={itemTitle}
                                                     onChange={onChangeItemTitle}
                                                     required
                                                     style={{marginLeft:15}}/>
                                    </TabPane>
                                    <TabPane eventKey="info">
                                        <FormControl type="info" placeholder="Write about your item"
                                                     fullWidth
                                                     value={itemInfo}
                                                     onChange={onChangeItemInfo}
                                                     required
                                                     style={{marginLeft:15, marginTop:75}}/>
                                    </TabPane>
                                    <TabPane eventKey="price">
                                        <FormControl type="price" placeholder="Enter item price"
                                                     fullWidth
                                                     value={itemPrice}
                                                     onChange={onChangeItemPrice}
                                                     style={{marginLeft:15, marginTop:130}}/>
                                    </TabPane>
                                    <TabPane eventKey="tag">
                                        <FormControl type="tag" placeholder="Enter some tags"
                                                     fullWidth
                                                     value={itemTags.map(tag => {return "#"+tag})}
                                                     onChange={onChangeItemTags}
                                                     style={{marginLeft:15, marginTop:170}}/>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </TabContainer>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}

ItemCreation.propTypes = {
    item: PropTypes.object,
    name: PropTypes.string,
    new: PropTypes.bool,
    onCreate: PropTypes.func,
    onSave: PropTypes.func,
};
// withRouter() allows accessing the necessary functionality to navigate from this component
export default withRouter(ItemCreation);