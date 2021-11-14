import { useEffect, useState } from "react"
import { useParams } from "react-router"
import APIS, { endpoints } from "../configs/APIS"
import { Container, Row , Col, Card, Button} from "react-bootstrap"
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";
import Cookies from "js-cookie";

export default function DishesAndDrink(){
    let [dishesanddrink, setDishesanddrink] = useState([])
    let [menuDetail, setMenuDetail] = useState()
    let [menuPrice, setMenuPrice] = useState()
    let  { menuId } = useParams()

    useEffect( async () => {
        try{

        let res = await APIS.get(endpoints['dishes-and-drink'](menuId))
        setDishesanddrink(res.data)

        let menuDetailRes = await APIS.get(endpoints['menuDetail'](menuId))
        setMenuDetail(menuDetailRes.data)
        setMenuPrice(menuDetailRes.data.total_money)
        } catch(ex){
            console.error(ex)
        }
    }, [])

    const bookMenu = () => {
        if(!!localStorage.getItem("access_token")){
            Cookies.set("menu_id", menuDetail.id)
            Cookies.set("menu_name", menuDetail.name)
            Cookies.set("menu_price", menuDetail.total_money)
            Cookies.set("menu_image", menuDetail.menu_images)
            swal({
                title: `Đặt thực đơn ${menuDetail.name}!`,
                text: "Thành công!",
                icon: "success",
                button: "Đồng ý",
            }).then(function(){
                window.location.reload()
            })
        }
        else
            if(window.confirm("Đăng nhập để thực hiện đặt menu ?") == true)
                window.location.href= "/login"
    }

    return(
        <Container>
            <h1 className="text-center text-danger">DANH SÁCH MÓN ĂN</h1>
            <Row>
                {dishesanddrink.map(d => <Adishesanddrink dishesanddrink={d} />)}
            </Row>
            <br></br>
            <h5 className="text-danger">Tổng tiền:{" "}
                <label><CurrencyFormat 
                value={menuPrice}
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'₫'}/></label>
            </h5>
            <Button variant="success" onClick={bookMenu}>Đặt thực đơn</Button>
        </Container>
    )
}

function Adishesanddrink(props){
    return(
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.dishesanddrink.dishes_drinks_images} />
                <Card.Body>
                    <Card.Title>{props.dishesanddrink.name}</Card.Title>
                    <Card.Text className="text-danger">Giá: <CurrencyFormat 
                    value={props.dishesanddrink.price}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'}/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}