import { useEffect, useState } from "react"
import { Container, Row , Card, Col, Button, Form, Pagination} from "react-bootstrap"
import Moment from "react-moment"
import APIS, { endpoints } from "../configs/APIS"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment";
import { useHistory, useLocation } from "react-router";
import CurrencyFormat from 'react-currency-format';
import { Link } from "react-router-dom";

export default function Weddings(){
    let [weddings, setWeddings] = useState([])
    let [minDate, setMinDate] = useState("")
    let [maxDate, setMaxDate] = useState("")
    let [count, setCount] = useState(0)
    let [filterPrice, setFilterPrice] = useState("")
    const [page, setPage] = useState(1)
    const location = useLocation()
    let history = useHistory()

    useEffect( async() => {
        let query = location.search
        if(query === "")
            query = `?page=${page}`
        else
            query += `&page=${page}`
        try{
            let res = await APIS.get(`${endpoints['weddings']}${query}`)
            setWeddings(res.data.results)
            setCount(res.data.count)
        }catch(ex){
            console.error(ex)
        }
    }, [page, location.search])

    let items =[]
    for(let i=0; i < Math.ceil(count/6); i++)
    {
        items.push(<Pagination.Item onClick={()=>setPage(i+1)}>{i+1}</Pagination.Item>)
    }

    const search = () => {
        if((!!minDate) && (!!maxDate))
        {
            if(filterPrice==="")
                history.push(`/weddings/?dmin=${moment(minDate).format("YYYY-MM-DD")}&dmax=${moment(maxDate).format("YYYY-MM-DD")}`)
            if(filterPrice!=="")
                history.push(`/weddings/?dmin=${moment(minDate).format("YYYY-MM-DD")}&dmax=${moment(maxDate).format("YYYY-MM-DD")}&p=${filterPrice}`)
        }
        if((!!minDate) && (!maxDate))
        {
            if(filterPrice==="")
                history.push(`/weddings/?dmin=${moment(minDate).format("YYYY-MM-DD")}`)
            if(filterPrice!=="")
                history.push(`/weddings/?dmin=${moment(minDate).format("YYYY-MM-DD")}&p=${filterPrice}`)
        }
        if((!minDate) && (!!maxDate))
        {
            if(filterPrice==="")
                history.push(`/weddings/?dmax=${moment(maxDate).format("YYYY-MM-DD")}`)
            if(filterPrice!=="")
                history.push(`/weddings/?dmax=${moment(maxDate).format("YYYY-MM-DD")}&p=${filterPrice}`)
        }
        if((!minDate) && (!maxDate))
        {
            if(filterPrice==="")
                history.push(`/weddings/`)
            if(filterPrice!=="")
                history.push(`/weddings/?p=${filterPrice}`)
        }
    }

    return(
        <Container> 
            <h1 className="text-center text-danger">DANH S??CH TI???C C?????I</h1>
            <Form.Label>T??m ti???c c?????i theo ng??y t??? ch???c</Form.Label>
            <DatePicker
            dateFormat="dd/MM/yyyy"
            placeholderText="T??? ng??y"
            selected={minDate}
            onChange={(event) => setMinDate(event)}/>
            <DatePicker
            dateFormat="dd/MM/yyyy" 
            placeholderText="?????n ng??y"
            selected={maxDate}
            onChange={(event) => setMaxDate(event)}/>
            <input type="radio" name="price" onClick={()=>setFilterPrice("asc")}/> Gi?? t??ng{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("des")}/>  Gi?? gi???m{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("")}/>  M???c ?????nh
            <br></br>
            <Button variant="primary" onClick={search}>T??m ki???m</Button>
            <br></br>
            <br></br>
            <Pagination>
                <Pagination.First onClick={()=>setPage(1)}/>
                {items}
                <Pagination.Last onClick={()=>setPage(Math.ceil(count/6))}/>
            </Pagination>
            <Row>
                {weddings.map(w => <Awedding wedding={w} />)}
            </Row>
        </Container>
    )
}

function Awedding(props){
    let pathWeddingDetail = `/weddings/${props.wedding.id}/`
    return(
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.wedding.wedding_images} />
                <Card.Body>
                    <Card.Title>Ng??y t??? ch???c: <Moment format="DD/MM/YYYY">{props.wedding.organize_date}</Moment></Card.Title>
                    <Card.Text className="text-danger">T???ng ti???n: <CurrencyFormat 
                    value={props.wedding.total_price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'???'}/>
                    </Card.Text>
                    <Card.Text><Button variant="primary" as={Link} to={pathWeddingDetail}>Chi ti???t</Button></Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}