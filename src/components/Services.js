import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Pagination, Form} from "react-bootstrap"
import APIS, { endpoints } from "../configs/APIS"
import CurrencyFormat from 'react-currency-format';
import { useHistory, useLocation } from "react-router";

export default function Services() {
    let [services, setServices] = useState([])
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
            let res = await APIS.get(`${endpoints['services']}${query}`)
            setServices(res.data.results)
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
                history.push(`/services/?p=${filterPrice}&s=${filterName}`)
            if(filterName==="")
                history.push(`/services/?p=${filterPrice}`)
        }
        if(filterPrice==="")
        {
            if(filterName!=="")
                history.push(`/services/?s=${filterName}`)
            if(filterName==="")
                history.push("/services/")
        }     
    }

    return(
        <Container>
            <h1 className="text-center text-danger">DỊCH VỤ CƯỚI</h1>
            <Form.Control size="sm" type="text" placeholder="Nhập tên dịch vụ" style={{width:"20%"}}
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
                {services.map(s => <Aservice service={s} />)}
            </Row>
        </Container>
    )
}

function Aservice(props){
    return(
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.service.service_images} />
                <Card.Body>
                    <Card.Title>{props.service.name}</Card.Title>
                    <Card.Text className="text-danger">Giá thuê: <CurrencyFormat 
                    value={props.service.price}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'}/>
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{window.location.href=`/services/${props.service.id}/`}}>Chi tiết</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}