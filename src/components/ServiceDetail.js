import { useEffect, useState } from "react"
import { ListGroup , Row, Col, Container, Image, Button} from "react-bootstrap"
import { useParams } from "react-router"
import APIS, { endpoints } from "../configs/APIS"
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";

export default function ServiceDetail(){
    let [service, setService] = useState([])
    let { serviceId } = useParams()

    useEffect( async() => {
        try{
            let res = await APIS.get(endpoints['serviceDetail'](serviceId))
            setService(res.data)
        } catch(ex) {
            console.error(ex)
        }
    }, [])
    const rentServices = () => {
        let servicesId = []
        let count = 0
        if(!!sessionStorage.getItem("count"))
            count = sessionStorage.getItem("count")
        for(let i=0; i<count ; i++){
            servicesId.push(sessionStorage.getItem(`service_${i+1}`))
        }
        console.info(servicesId)
        if(!!localStorage.getItem("access_token")){
            if((servicesId.includes(`${service.id}`) == false) && (count<10)){
                count++
                sessionStorage.setItem(`service_${count}`, service.id)
                sessionStorage.setItem(`service_${count}_name`, service.name)
                sessionStorage.setItem(`service_${count}_price`, service.price)
                sessionStorage.setItem(`service_${count}_service_images`, service.service_images)
                sessionStorage.setItem("count", count)
                swal({
                    title: `Thuê dịch vụ ${service.name}!`,
                    text: "Thành công!",
                    icon: "success",
                    button: "Đồng ý",
                }).then(function(){
                    window.location.reload()
                })
            }
            else{
                if(servicesId.includes(`${service.id}`) == true)
                {
                    swal({
                        title: "Dịch vụ đã thuê!",
                        text: "Chọn dịch vụ khác!",
                        icon: "warning",
                        button: "Đồng ý",
                    })
                }
                if(count>10)
                {
                    swal({
                        title: "Lỗi!",
                        text: "Không được thuê quá 10 dịch vụ cho tiệc cưới!",
                        icon: "warning",
                        button: "Đồng ý",
                    })
                }
            }
        }
        else
            if(window.confirm("Đăng nhập để thực hiện thuê dịch vụ ?") == true)
                window.location.href= "/login"
    }
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