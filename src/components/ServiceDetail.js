import { useEffect, useState, useContext } from "react"
import { ListGroup , Row, Col, Container, Image, Button} from "react-bootstrap"
import { useParams } from "react-router"
import APIS, { endpoints } from "../configs/APIS"
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";
import CartContext from "../CartProvider/CartContext";
import { addServiceToCart } from "../reducers/actions";

export default function ServiceDetail(){
    let [service, setService] = useState([])
    let { serviceId } = useParams()
    const [state, dispatch] = useContext(CartContext)
    const serviceObj = {
        service_id: service.id,
        service_name: service.name,
        service_price: service.price,
        service_image: service.service_images
    }
    const rentServices = () => {
        if(!!localStorage.getItem("access_token")){
            if(!state.services.some(service => { return service.service_id === serviceObj.service_id })){
                dispatch(addServiceToCart(serviceObj))
                swal({
                    title: `Thuê dịch vụ ${service.name}!`,
                    text: "Thành công!",
                    icon: "success",
                    button: "Đồng ý",
                })
            }
            else{
                swal({
                    title: `Đã thuê dịch vụ này !`,
                    text: "Thất bại!",
                    icon: "warning",
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
            let res = await APIS.get(endpoints['serviceDetail'](serviceId))
            setService(res.data)
        } catch(ex) {
            console.error(ex)
        }
    }, [])

    return(
        <Container>
            <Row>
            <Col xs={6} md={6}>
                <Image src = {service.service_images} thumbnail/>
            </Col>
            <Col>
                <h2 className="text-center text-danger">Dịch vụ cưới</h2>
                <ListGroup>
                    <ListGroup.Item>Tên dịch vụ: {service.name}</ListGroup.Item>
                    <ListGroup.Item>Mô tả: {service.description}</ListGroup.Item>
                    <ListGroup.Item className="text-danger">Giá thuê: <CurrencyFormat 
                    value={service.price}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'}/>
                    </ListGroup.Item>
                    <ListGroup.Item><Button variant="success" onClick={rentServices}>Thuê dịch vụ</Button></ListGroup.Item>
                </ListGroup>
            </Col>
            </Row>
        </Container>
    )
}