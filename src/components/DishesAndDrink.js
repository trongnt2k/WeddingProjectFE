import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import APIS, { endpoints } from "../configs/APIS"
import { Container, Row , Col, Card, Button} from "react-bootstrap"
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";
import _ from 'lodash';
import CartContext from "../CartProvider/CartContext";
import { addMenuToCart } from "../reducers/actions";

export default function DishesAndDrink(){
    let [dishesanddrink, setDishesanddrink] = useState([])
    let [menuDetail, setMenuDetail] = useState([])
    let [menuPrice, setMenuPrice] = useState()
    let  { menuId } = useParams()
    const [state, dispatch] = useContext(CartContext)
    const menuObj = {
        menu_id: menuDetail.id,
        menu_name: menuDetail.name,
        menu_price: menuDetail.total_money,
        menu_image: menuDetail.menu_images
    }

        const bookMenu = () => {
            if(!!localStorage.getItem("access_token")){
                if(_.isEmpty(state.menu)){
                    dispatch(addMenuToCart(menuObj))
                    swal({
                        title: `Đặt thưc đơn ${menuDetail.name}!`,
                        text: "Thành công!",
                        icon: "success",
                        button: "Đồng ý",
                    })
                }else if(_.isEqual(state.menu, menuObj)){
                    swal({
                        title: `Đã đặt thực đơn này !`,
                        text: "Thất bại!",
                        icon: "warning",
                        button: "Đồng ý",
                    })
                }
                else{
                    dispatch(addMenuToCart(menuObj))
                    swal({
                        title: `Đổi thực đơn ${menuDetail.name} thành công !`,
                        text: "Thành công!",
                        icon: "success",
                        button: "Đồng ý",
                    })
                }
            }
            else{
                if(window.confirm("Đăng nhập để thực hiện đặt thực đơn ?") === true)
                    window.location.href= "/login"
            }
        }

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