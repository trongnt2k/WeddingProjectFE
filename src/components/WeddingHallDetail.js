import { useContext, useEffect, useState } from "react"
import { ListGroup , Row, Col, Container, Image, Button} from "react-bootstrap"
import { useParams } from "react-router"
import APIS, { endpoints } from "../configs/APIS"
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";
import CartContext from "../CartProvider/CartContext";
import { addWeddingHallToCart } from "../reducers/actions";
import _ from 'lodash';

export default function WeddingHallDetail(){
    let [weddinghall, setWeddingHall] = useState([])
    let { weddinghallId } = useParams()
    const [state, dispatch] = useContext(CartContext)
    const weddinghallObj = {
        weddinghall_id: weddinghall.id,
        weddinghall_name: weddinghall.name,
        weddinghall_price: weddinghall.wedding_hall_price,
        weddinghall_image: weddinghall.wedding_hall_images
    }
    const rentWeddinghall = () => {
        if(!!localStorage.getItem("access_token")){
            if(_.isEmpty(state.weddingHall)){
                dispatch(addWeddingHallToCart(weddinghallObj))
                swal({
                    title: `Thuê sảnh ${weddinghall.name}!`,
                    text: "Thành công!",
                    icon: "success",
                    button: "Đồng ý",
                })
            }
            else if(_.isEqual(state.weddingHall, weddinghallObj)){
                swal({
                    title: `Đã thuê sảnh này !`,
                    text: "Thất bại!",
                    icon: "warning",
                    button: "Đồng ý",
                })
            }
            else{
                dispatch(addWeddingHallToCart(weddinghallObj))
                swal({
                    title: `Đổi sảnh thuê ${weddinghall.name} thành công !`,
                    text: "Thành công!",
                    icon: "success",
                    button: "Đồng ý",
                })
            }
        }
        else{
            if(window.confirm("Đăng nhập để thực hiện thuê sảnh cưới ?") === true)
                window.location.href= "/login"
        }
    }

    useEffect( async() => {
        try{
            let res = await APIS.get(endpoints['weddinghallDetail'](weddinghallId))
            setWeddingHall(res.data)
        } catch(ex) {
            console.error(ex)
        }
    }, [])

    return(
        <Container>
            <Row>
            <Col xs={6} md={6}>
                <Image src = {weddinghall.wedding_hall_images} thumbnail/>
            </Col>
            <Col>
                <h2 className="text-center text-danger">Sảnh cưới</h2>
                <ListGroup>
                    <ListGroup.Item>Tên sảnh: {weddinghall.name}</ListGroup.Item>
                    <ListGroup.Item>Buổi: {weddinghall.time_wedding}</ListGroup.Item>
                    <ListGroup.Item>Địa điểm: {weddinghall.location}</ListGroup.Item>
                    <ListGroup.Item>Mô tả: {weddinghall.description}</ListGroup.Item>
                    <ListGroup.Item className="text-danger">Giá thuê: <CurrencyFormat 
                    value={weddinghall.wedding_hall_price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'}/>
                    </ListGroup.Item>
                    <ListGroup.Item><Button variant="success" onClick={rentWeddinghall}>Thuê sảnh</Button></ListGroup.Item>
                </ListGroup>
            </Col>
            </Row>
        </Container>
    )
}