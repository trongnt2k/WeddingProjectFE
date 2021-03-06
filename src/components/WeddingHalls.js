import React from "react";
import { useEffect, useState } from "react"
import { Container , Row, Card, Col, Button, Form, Pagination} from "react-bootstrap";
import APIS, { endpoints } from "../configs/APIS"
import CurrencyFormat from 'react-currency-format';
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";


export default function WeddingHalls(){
    let [weddinghalls, setWeddinghalls] = useState([])
    const [page, setPage] = useState(1)
    let [count, setCount] = useState(0)
    let [filterPrice, setFilterPrice] = useState("")
    let [filterName, setFilterName] = useState("")
    let [filterTime, setFilterTime] = useState("")
    let location = useLocation()
    let history = useHistory()

    useEffect(async () => {
        let query = location.search
        if(query === "")
            query = `?page=${page}`
        else
            query += `&page=${page}`
        try{
            let res = await APIS.get(`${endpoints['weddinghalls']}${query}`)
            setWeddinghalls(res.data.results)
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
                if(filterTime!=="")
                    history.push(`/weddinghalls/?p=${filterPrice}&s=${filterName}&t=${filterTime}`)
                else
                    history.push(`/weddinghalls/?p=${filterPrice}&s=${filterName}`)
            if(filterName==="")
                if(filterTime!=="")
                    history.push(`/weddinghalls/?p=${filterPrice}&t=${filterTime}`)
                else
                    history.push(`/weddinghalls/?p=${filterPrice}`)
        }
        if(filterPrice==="")
        {
            if(filterName!=="")
                if(filterTime!=="")
                    history.push(`/weddinghalls/?s=${filterName}&t=${filterTime}`)
                else
                    history.push(`/weddinghalls/?s=${filterName}`)
            if(filterName==="")
                if(filterTime!=="")
                    history.push(`/weddinghalls/?t=${filterTime}`)
                else
                    history.push("/weddinghalls/")
        }     
    }

    return(
        <Container>
            <h1 className="text-center text-danger">S???NH C?????I</h1>
            <Form.Control size="sm" type="text" placeholder="Nh???p t??n s???nh c?????i" style={{width:"20%"}}
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}/>
            <input type="radio" name="price" onClick={()=>setFilterPrice("asc")}/> Gi?? t??ng{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("des")}/>  Gi?? gi???m{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("")}/>  M???c ?????nh
            <br></br>
            <input type="radio" name="time" onClick={()=>setFilterTime("S??ng")}/> S??ng{' '}
            <input type="radio" name="time" onClick={()=>setFilterTime("Chi???u")}/>  Chi???u{' '}
            <input type="radio" name="time" onClick={()=>setFilterTime("T???i")}/>  T???i{' '}
            <input type="radio" name="time" onClick={()=>setFilterTime("")}/>  M???c ?????nh
            <br></br>
            <Button variant="primary" onClick={filter}>L???c</Button>
            <br></br>
            <br></br>
            <Pagination>
                <Pagination.First onClick={()=>setPage(1)}/>
                {items}
                <Pagination.Last onClick={()=>setPage(Math.ceil(count/6))}/>
            </Pagination>
            <Row> 
                {weddinghalls.map(w => <AWeddinghall weddinghall={w} />)}
            </Row>
        </Container>
    )
}

function AWeddinghall(props){
    let pathWeddingHallsDetail = `/weddinghalls/${props.weddinghall.id}/`
    return(
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img className="fluid" variant="top" src={props.weddinghall.wedding_hall_images} />
                <Card.Body>
                    <Card.Title>{props.weddinghall.name}</Card.Title>
                    <Card.Text>Bu???i: {props.weddinghall.time_wedding}</Card.Text>
                    <Card.Text>?????a ??i???m: {props.weddinghall.location}</Card.Text>
                    <Card.Text className="text-danger">Gi?? thu??: <CurrencyFormat 
                    value={props.weddinghall.wedding_hall_price}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'???'}/>
                    </Card.Text>
                    <Button variant="primary" as={Link} to={pathWeddingHallsDetail}>Chi ti???t</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}