import React from "react";
import { useEffect, useState } from "react"
import { Container , Row, Card, Col, Button, Form, Pagination} from "react-bootstrap";
import APIS, { endpoints } from "../configs/APIS"
import CurrencyFormat from 'react-currency-format';
import { useHistory, useLocation } from "react-router";


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
            <h1 className="text-center text-danger">SẢNH CƯỚI</h1>
            <Form.Control size="sm" type="text" placeholder="Nhập tên sảnh cưới" style={{width:"20%"}}
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}/>
            <input type="radio" name="price" onClick={()=>setFilterPrice("asc")}/> Giá tăng{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("des")}/>  Giá giảm{' '}
            <input type="radio" name="price" onClick={()=>setFilterPrice("")}/>  Mặc định
            <br></br>
            <input type="radio" name="time" onClick={()=>setFilterTime("Sáng")}/> Sáng{' '}
            <input type="radio" name="time" onClick={()=>setFilterTime("Chiều")}/>  Chiều{' '}
            <input type="radio" name="time" onClick={()=>setFilterTime("Tối")}/>  Tối{' '}
            <input type="radio" name="time" onClick={()=>setFilterTime("")}/>  Mặc định
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
                {weddinghalls.map(w => <AWeddinghall weddinghall={w} />)}
            </Row>
        </Container>
    )
}

function AWeddinghall(props){
    return(
        <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img className="fluid" variant="top" src={props.weddinghall.wedding_hall_images} />
                <Card.Body>
                    <Card.Title>{props.weddinghall.name}</Card.Title>
                    <Card.Text>Buổi: {props.weddinghall.time_wedding}</Card.Text>
                    <Card.Text>Địa điểm: {props.weddinghall.location}</Card.Text>
                    <Card.Text className="text-danger">Giá thuê: <CurrencyFormat 
                    value={props.weddinghall.wedding_hall_price}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'}/>
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{window.location.href=`/weddinghalls/${props.weddinghall.id}/`}}>Chi tiết</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}