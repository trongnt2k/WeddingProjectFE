import { useState, useContext } from "react"
import { Container , Col, Row, Button ,Form, Card} from "react-bootstrap"
import APIS, { endpoints } from "../configs/APIS"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment";
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";
import CartContext from "../CartProvider/CartContext";
import { delMenuCartItem, delServiceCartItem, delWeddingHallCartItem } from "../reducers/actions";

export default function CreateWedding(){
    let [description, setDescription] = useState("")
    let [desk, setDesk] = useState(1)
    let [date, setDate] = useState("")
    const [dispatch] = useContext(CartContext)
    let totalPrice = 0;
    let weddinghallId = ""
    let weddinghallRent = []
    let menuId = ""
    let menuRent = []
    let services = []
    let servicesId = []

    if(localStorage.getItem("weddinghall")){
        weddinghallId = JSON.parse(localStorage.getItem("weddinghall")).weddinghall_id
        totalPrice += JSON.parse(localStorage.getItem("weddinghall")).weddinghall_price
        weddinghallRent.push(
            <>
                <h2 className="text-danger">Sảnh cưới thuê</h2>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={JSON.parse(localStorage.getItem("weddinghall")).weddinghall_image} />
                    <Card.Body>
                        <Card.Title>{JSON.parse(localStorage.getItem("weddinghall")).weddinghall_name}</Card.Title>
                        <Card.Text className="text-danger">Giá thuê: <CurrencyFormat 
                            value={JSON.parse(localStorage.getItem("weddinghall")).weddinghall_price}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'₫'}/>
                        </Card.Text>
                        <Row>
                            <Col>
                                <Button 
                                variant="danger"
                                onClick={() => dispatch(delWeddingHallCartItem())}>Hủy thuê</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={()=>{window.location.href=`/weddinghalls/${JSON.parse(localStorage.getItem("weddinghall")).weddinghall_id}`}}>Chi tiết</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                    </Card>
            </>
        )
    }

    if(localStorage.getItem("menu")){
        menuId = JSON.parse(localStorage.getItem("menu")).menu_id
        totalPrice += JSON.parse(localStorage.getItem("menu")).menu_price * desk
        menuRent.push(
            <>
                <h2 className="text-danger">Thực đơn đặt</h2>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={JSON.parse(localStorage.getItem("menu")).menu_image} />
                    <Card.Body>
                        <Card.Title>{JSON.parse(localStorage.getItem("menu")).menu_name}</Card.Title>
                        <Card.Text className="text-danger">Giá : <CurrencyFormat 
                        value={JSON.parse(localStorage.getItem("menu")).menu_price}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'}/>
                        </Card.Text>
                        <Row>
                            <Col>
                                <Button 
                                variant="danger"
                                onClick={() => dispatch(delMenuCartItem())}>Hủy đặt</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={()=>{window.location.href=`/menus/${JSON.parse(localStorage.getItem("menu")).menu_id}/dishes-and-drink/`}}>Chi tiết</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
        )
    }
    if(localStorage.getItem("services")){
        JSON.parse(localStorage.getItem("services")).forEach(service => servicesId.push(service.service_id))
        JSON.parse(localStorage.getItem("services")).forEach(service => totalPrice += service.service_price)
        services.push(<h2 className="text-danger">Dịch vụ thuê</h2>)
        JSON.parse(localStorage.getItem("services")).forEach(service => services.push(
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={service.service_image} />
                    <Card.Body>
                        <Card.Title>{service.service_name}</Card.Title>
                        <Card.Text className="text-danger">Giá : <CurrencyFormat 
                            value={service.service_price}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'₫'}/>
                        </Card.Text>
                        <Row>
                            <Col>
                                <Button 
                                    variant="danger"
                                    onClick={() => {dispatch(delServiceCartItem(service.service_id))}}>Hủy thuê</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={()=>{window.location.href=`/services/${service.service_id}`}}>Chi tiết</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        ))
    }
    const payment = async() => {
        if(window.confirm("Bạn đồng ý thanh toán ?") === true){
            if(!!localStorage.getItem("access_token")){
                if((!!desk) && (!!date) && (parseInt(moment(date).format("YYYY"))<2040 && parseInt(moment(date).format("YYYY"))>2020)){
                    try{
                        let res = await APIS.post(endpoints['weddings-create'], {
                            "number_desk": desk,
                            "organize_date": moment(date).format("YYYY-MM-DD"),
                            "description": description,
                            "service_id": servicesId,
                            "menu_id": menuId,
                            "weddinghall_id": weddinghallId
                        } ,{
                            headers:{
                                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                            }
                        })
                        if(localStorage.getItem("weddinghall"))
                            localStorage.removeItem("weddinghall")
                        if(localStorage.getItem("menu"))
                            localStorage.removeItem("menu")
                        if(localStorage.getItem("services"))
                            localStorage.removeItem("services")
                        if(localStorage.getItem("count"))
                            localStorage.removeItem("count")     
                        swal({
                            title: "Thanh toán!",
                            text: "Thành công, chọn mục tiệc cưới để xem chi tiết!",
                            icon: "success",
                            button: "Đồng ý",
                        }).then(() => window.location.reload())
                    } catch(ex) {
                        console.error(ex)
                        swal({
                            title: "Thanh toán!",
                            text: "Thất bại",
                            icon: "warning",
                            button: "Đồng ý",
                        })
                    }
                }
                else{
                    swal({
                        title: "Lỗi!",
                        text: "Vui lòng nhập lại thông tin bắt buộc",
                        icon: "warning",
                        button: "Đồng ý",
                    })
                }
            }
            else
            {
                if(window.confirm("Đăng nhập để thực hiện thanh toán?")===true)
                    window.location.href= "/login"
                else{
                    swal({
                        title: "Thanh toán!",
                        text: "Thất bại",
                        icon: "warning",
                        button: "Đồng ý",
                    })
                }
            }
        }
    }
   
    return(
        <Container>
            <h1 className="text-center text-danger">ĐẶT TIỆC</h1>
            <h6 className="text-center">(Lưu ý: Những thông tin đánh dấu <i className="text-danger">*</i> không được bỏ trống)</h6>
            {weddinghallRent}
            {menuRent}
            <Row>{services}</Row>
            <Form>
                <Row>
                    <Col md={1}>
                        <Form.Group className="mb-3">
                            <Form.Label>Số bàn đặt<i className="text-danger">*</i></Form.Label>
                            <Form.Control type="number" 
                            placeholder="Bàn"
                            value={desk} 
                            onChange={(event) => setDesk(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày tổ chức<i className="text-danger">*</i></Form.Label>
                            <DatePicker
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Nhập ngày tổ chức tiệc"
                            selected={date}
                            onChange={(event) => setDate(event)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as="textarea"
                            rows={3} 
                            placeholder="Nhập mô tả"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row md={2}>
                    <Col>
                    <h5 className="text-danger">Tổng tiền:{" "}
                        <label><CurrencyFormat 
                        value={totalPrice}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'}/></label>
                    </h5>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={payment}>Thanh toán</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}