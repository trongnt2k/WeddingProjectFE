import { useEffect, useState } from "react"
import { Container, Row , Col, CardImg, Button, Card, Form, Pagination} from "react-bootstrap"
import APIS, { endpoints } from "../configs/APIS"
import CurrencyFormat from 'react-currency-format';
import { useHistory, useLocation } from "react-router";

export default function Menus(){
    let [menus, setMenus] = useState([])
    const [page, setPage] = useState(1)
    let [count, setCount] = useState(0)
    let [filterPrice, setFilterPrice] = useState("")
    let [filterName, setFilterName] = useState("")
    let location = useLocation()
    let history = useHistory()

    useEffect(async () => {
        let query = location.search
        if(query === "")
            query = `?page=${page}`
        else
            query += `&page=${page}`
        try{
            let res = await APIS.get(`${endpoints['menus']}${query}`)
            setMenus(res.data.results)
            setCount(res.data.count)
        } catch(ex) {
            console.error(ex)
        }
    }, [page, location.search])

    let items =[]
    for(let i=0; i < Math.ceil(count/6); i++)
    {
        items.push(<Pagination.Item onClick={()=>setPage(i+1)}>{i+1}</Pagination.Item>)
    }
    const filter = () => {
        if(filterPrice!=="")
        {
            if(filterName!=="")
                history.push(`/menus/?p=${filterPrice}&s=${filterName}`)
            if(filterName==="")
                history.push(`/menus/?p=${filterPrice}`)
        }
        if(filterPrice==="")
        {
            if(filterName!=="")
                history.push(`/menus/?s=${filterName}`)
            if(filterName==="")
                history.push("/menus/")
        }     
    }

    return(
        <Container>
            <h1 className="text-center text-danger">THỰC ĐƠN CƯỚI</h1>
            <Form.Control size="sm" type="text" placeholder="Nhập tên thực đơn" style={{width:"20%"}}
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}/>
            <input type="radio" name="price" onClick={()=>setFilterPrice("asc")}/> Giá tăng{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("des")}/>  Giá giảm{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("")}/>  Mặc định
            <br></br>
            <Button variant="primary" onClick={filter}>Lọc</Button>
            <br></br>
            <br></br>
            <Pagination>
                <Pagination.First onClick={()=>setPage(1)}/>
                {items}
                <Pagination.Last onClick={()=>setPage(Math.ceil(count/6))}/>
            </Pagination>
            <Row>
                {menus.map(m => <Amenu menu={m} />)}
            </Row>
        </Container>
    )
}

function Amenu(props){
    return(
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.menu.menu_images} />
                <Card.Body>
                    <Card.Title>{props.menu.name}</Card.Title>
                    <Card.Text className="text-danger">Giá: <CurrencyFormat 
                    value={props.menu.total_money}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'}/>
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{window.location.href=`/menus/${props.menu.id}/dishes-and-drink/`}}>Chi tiết</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}