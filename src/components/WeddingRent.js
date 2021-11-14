import { useEffect, useState } from "react"
import { Card, Container, Row , Col, Button} from "react-bootstrap"
import { useParams } from "react-router"
import APIS, { endpoints } from "../configs/APIS"
import { Link } from "react-router-dom"
import CurrencyFormat from 'react-currency-format';

export default function WeddingWeddinghall(){
    let [weddingweddinghall, setWeddingWeddinghall] = useState([])
    let [weddingmenu, setWeddingMenu] = useState([])
    let [weddingservices, setWeddingService] = useState([])
    let { weddingId } = useParams()
    useEffect( async() => {
        try{
            let weddingWeddinghallRes = await APIS.get(endpoints['weddings-weddinghall'](weddingId))
            setWeddingWeddinghall(weddingWeddinghallRes.data)

            let weddingmenuRes = await APIS.get(endpoints['weddings-menu'](weddingId))
            setWeddingMenu(weddingmenuRes.data)

            let weddingServicesRes = await APIS.get(endpoints['weddings-services'](weddingId))
            setWeddingService(weddingServicesRes.data)
        }catch(ex){
            console.error(ex)
        }
    }, [])

    let weddinghallRent =[]
    if(weddingweddinghall.name !== "")
    {
        weddinghallRent.push(<h2 className="text-danger">Sảnh cưới</h2>)
        weddinghallRent.push(
            <Col md={4}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={weddingweddinghall.wedding_hall_images} />
                    <Card.Body>
                        <Card.Title>{weddingweddinghall.name}</Card.Title>
                        <Card.Text>Buổi: {weddingweddinghall.time_wedding}</Card.Text>
                        <Card.Text>Địa điểm: {weddingweddinghall.location}</Card.Text>
                        <Card.Text class="text-danger">Giá: <CurrencyFormat 
                        value={weddingweddinghall.wedding_hall_price}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'}/>
                        </Card.Text>
                        <Button variant="primary" onClick={()=>{window.location.href=`/weddinghalls/${weddingweddinghall.id}/`}}>Chi tiết</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    let menuRent =[]
    if(weddingmenu.name !== "")
    {
        let path = `/menus/${weddingmenu.id}/dishes-and-drink/`
        menuRent.push(<h2 className="text-danger">Thực đơn</h2>)
        menuRent.push(
            <Col md={4}>
                <Card style={{ width: '18rem' }}>
                    <Link to={path}>
                        <Card.Img variant="top" src={weddingmenu.menu_images} />
                    </Link>
                    <Card.Body>
                        <Card.Title>{weddingmenu.name}</Card.Title>
                        <Card.Text class="text-danger">Giá: <CurrencyFormat 
                        value={weddingmenu.total_money}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'}/>
                        </Card.Text>
                        <Button variant="primary" onClick={()=>{window.location.href=`/menus/${weddingmenu.id}/dishes-and-drink/`}}>Chi tiết</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    let servicesRent =[]
    if(weddingservices.length !==0)
    {
        servicesRent.push(<h2 className="text-danger">Dịch vụ</h2>)
        servicesRent.push(
            weddingservices.map(ws => <Col md={4}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={ws.service_images} />
                    <Card.Body>
                        <Card.Title>{ws.name}</Card.Title>
                        <Card.Text className="text-danger">Giá: <CurrencyFormat 
                        value={ws.price}
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'}/>
                        </Card.Text>
                        <Button variant="primary" onClick={()=>{window.location.href=`/services/${ws.id}/`}}>Chi tiết</Button>
                    </Card.Body>
                </Card>
            </Col>)
        )
    }
    return(
        <Container>
            <h1 className="text-danger text-center">CÁC DỊCH VỤ SỬ DỤNG</h1>
            <Row>
                {weddinghallRent}
            </Row>
            <Row>
                {menuRent}
            </Row>
            <Row>
                {servicesRent}
            </Row>
        </Container>
    )
}