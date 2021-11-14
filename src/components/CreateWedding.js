import { useState } from "react"
import { Container , Col, Row, Button ,Form, Card} from "react-bootstrap"
import APIS, { endpoints } from "../configs/APIS"
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Cookies from "js-cookie";
import moment from "moment";
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";

export default function CreateWedding(){
    let [description, setDescription] = useState("")
    let [desk, setDesk] = useState(1)
    let [date, setDate] = useState("")
    let count = 0
    let services =[]
    let servicesId =[]
    let menuId = ""
    let weddinghallId = ""
    let servicePrice = 0
    let weddinghallPrice = 0
    let menuPrice = 0
    if(!!Cookies.get("menu_id"))
        menuId = Cookies.get("menu_id")
    if(!!Cookies.get("weddinghall_id"))
        weddinghallId = Cookies.get("weddinghall_id")
    if(!!Cookies.get("weddinghall_price"))
        weddinghallPrice = parseInt(Cookies.get("weddinghall_price"))
    if(!!Cookies.get("menu_price"))
        menuPrice = parseInt(Cookies.get("menu_price")) * desk
    if(!!sessionStorage.getItem("count"))
        count = sessionStorage.getItem("count")
    if(count!=0)
    {
        services.push(<h2 className="text-danger">Dịch vụ thuê</h2>)
        for(let i=1; i<=10; i++){
            if(!!sessionStorage.getItem(`service_${i}`))
            {
                servicesId.push(sessionStorage.getItem(`service_${i}`))
                servicePrice += parseInt(`${sessionStorage.getItem(`service_${i}_price`)}`)
                services.push(
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={sessionStorage.getItem(`service_${i}_service_images`)} />
                            <Card.Body>
                                <Card.Title>{sessionStorage.getItem(`service_${i}_name`)}</Card.Title>
                                <Card.Text className="text-danger">Giá : <CurrencyFormat 
                                value={sessionStorage.getItem(`service_${i}_price`)}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'₫'}/>
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Button 
                                        variant="danger"
                                        onClick={() => {
                                            sessionStorage.removeItem(`service_${i}_service_images`)
                                            sessionStorage.removeItem(`service_${i}_name`)
                                            sessionStorage.removeItem(`service_${i}_price`)
                                            sessionStorage.removeItem(`service_${i}`)
                                            sessionStorage.setItem("count", count-1)
                                            swal({
                                                title: "Hủy thuê",
                                                text: "Thành công!",
                                                icon: "success",
                                                button: "Đồng ý",
                                            }).then(function(){
                                                window.location.reload()
                                            })
                                        }}>Hủy thuê</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="primary" onClick={()=>{window.location.href=`/services/${sessionStorage.getItem(`service_${i}`)}`}}>Chi tiết</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            }
        }
    }
    
    let weddinghallRent =[]
    if(!!Cookies.get("weddinghall_id"))
        {weddinghallRent.push(
            <>
                <h2 className="text-danger">Sảnh cưới thuê</h2>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={Cookies.get("weddinghall_image")} />
                    <Card.Body>
                        <Card.Title>{Cookies.get("weddinghall_name")}</Card.Title>
                        <Card.Text className="text-danger">Giá thuê: <CurrencyFormat 
                        value={Cookies.get("weddinghall_price")}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'}/>
                        </Card.Text>
                        <Row>
                            <Col>
                                <Button 
                                variant="danger"
                                onClick={() => {
                                    Cookies.remove("weddinghall_id")
                                    Cookies.remove("weddinghall_name")
                                    Cookies.remove("weddinghall_price")
                                    Cookies.remove("weddinghall_image")
                                    swal({
                                        title: "Hủy thuê",
                                        text: "Thành công!",
                                        icon: "success",
                                        button: "Đồng ý",
                                    }).then(function(){
                                        window.location.reload()
                                    })
                                }}>Hủy thuê</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={()=>{window.location.href=`/weddinghalls/${Cookies.get("weddinghall_id")}`}}>Chi tiết</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
        )}
    
    let menuRent =[]
    if(!!Cookies.get("menu_id"))
        {menuRent.push(
            <>
                <h2 className="text-danger">Thực đơn đặt</h2>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={Cookies.get("menu_image")} />
                    <Card.Body>
                        <Card.Title>{Cookies.get("menu_name")}</Card.Title>
                        <Card.Text className="text-danger">Giá : <CurrencyFormat 
                        value={Cookies.get("menu_price")}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'}/>
                        </Card.Text>
                        <Row>
                            <Col>
                                <Button 
                                variant="danger"
                                onClick={() => {
                                    Cookies.remove("menu_id")
                                    Cookies.remove("menu_name")
                                    Cookies.remove("menu_price")
                                    Cookies.remove("menu_image")
                                    swal({
                                        title: "Hủy đặt",
                                        text: "Thành công!",
                                        icon: "success",
                                        button: "Đồng ý",
                                    }).then(function(){
                                        window.location.reload()
                                    })
                                }}>Hủy đặt</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={()=>{window.location.href=`/menus/${Cookies.get("menu_id")}/dishes-and-drink/`}}>Chi tiết</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
        )}
        
    const payment = async() => {
        if(window.confirm("Bạn đồng ý thanh toán ?") == true){
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
                        sessionStorage.clear()
                        if(!!Cookies.get("weddinghall_id"))
                        {
                            Cookies.remove("weddinghall_id")
                            Cookies.remove("weddinghall_image")
                            Cookies.remove("weddinghall_name")
                            Cookies.remove("weddinghall_price")
                        }
                        if(!!Cookies.get("menu_id"))
                        {
                            Cookies.remove("menu_id")
                            Cookies.remove("menu_image")
                            Cookies.remove("menu_name")
                            Cookies.remove("menu_price")
                        }
                        swal({
                            title: "Thanh toán!",
                            text: "Thành công, chọn mục tiệc cưới để xem chi tiết!",
                            icon: "success",
                            button: "Đồng ý",
                        })
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
                if(window.confirm("Đăng nhập để thực hiện thanh toán?")==true)
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
                        value={weddinghallPrice+menuPrice+servicePrice}
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