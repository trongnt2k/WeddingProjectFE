import { useEffect, useState } from "react";
import { Container, Row, Col, Image , Table, ListGroup, Form, Button} from "react-bootstrap";
import Moment from "react-moment";
import Rating from "react-rating";
import { useHistory, useParams } from "react-router";
import APIS, { endpoints } from "../configs/APIS";
import CurrencyFormat from 'react-currency-format';
import swal from "sweetalert";

export default function WeddingDetail(){
    let [weddingdetail, setWeddingDetail] = useState([])
    let [comments, setComments] = useState([])
    let [addCommentContent, setCommentContent] = useState()
    let [rate, setRate] = useState()
    let { weddingId } = useParams()
    let history = useHistory()
    useEffect( async() => {
        try{
            let res = await APIS.get(endpoints['weddingDetail'](weddingId), {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            setWeddingDetail(res.data)
            setRate(res.data.rate)

            let commentRes = await APIS.get(endpoints['comments'](weddingId))
            setComments(commentRes.data)
        } catch(ex) {
            console.error(ex)
        }
    }, [])

    const addComment = async(event) => {
        event.preventDefault()
        if(window.confirm("Bạn muốn thực hiện đăng bình luận?") === true){
            try{
                let addCommentRes = await APIS.post(endpoints['add-comment'](weddingId), {
                    "content": addCommentContent
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                })

                let a = addCommentRes.data
                comments.unshift(a)
                setCommentContent(comments)
            } catch(ex) {
                console.error(ex)
                if(window.confirm("Đăng nhập để thực hiện bình luận?") === true)
                    history.push("/login")
            } 
        }
    }

    const rating = async(r) => {
        if(window.confirm("Bạn muốn thực hiện đánh giá ?") === true) {
            try{
                let ratingRes = await APIS.post(endpoints['rating'](weddingId), {
                    "rate": r
                }, {
                    headers:{
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                swal("Đánh giá thành công!")
            } catch(ex) {
                console.error(ex)
                if(window.confirm("Đăng nhập để thực hiện đánh giá?") === true)
                    history.push("/login")
            }
        }
    }
    return(
        <Container>
            <Row>
            <Col xs={6} md={6}>
                <Image src={weddingdetail.wedding_images} thumbnail/>
            </Col>
            <Col>
                <h2 className="text-center text-danger">Đánh giá - Phản hồi</h2>
                <ListGroup>
                    <ListGroup.Item>Số bàn đã đặt: {weddingdetail.number_desk}</ListGroup.Item>
                    <ListGroup.Item><Button variant="success" onClick={()=>{window.location.href=`/weddings/${weddingId}/wedding-rent/`}}>Các dịch vụ sử dụng</Button></ListGroup.Item>
                    <ListGroup.Item>Ngày tổ chức: <Moment format="DD/MM/YYYY">{weddingdetail.organize_date}</Moment></ListGroup.Item>
                    <ListGroup.Item className="text-danger">Tổng tiền: <CurrencyFormat 
                    value={weddingdetail.total_price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'}/>
                    </ListGroup.Item>
                    <ListGroup.Item>Mô tả: {weddingdetail.description}</ListGroup.Item>
                    <ListGroup.Item>Đánh giá: <Rating className="text-warning"
                        initialRating={rate}
                        onChange = {(r) => setRate(r)}
                        onClick = {rating}
                        stop={5}
                        emptySymbol={['fa fa-star-o fa-2x low', 'fa fa-star-o fa-2x low',
                            'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                            'fa fa-star-o fa-2x high', 'fa fa-star-o fa-2x high']}
                        fullSymbol={['fa fa-star fa-2x low', 'fa fa-star fa-2x low',
                            'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                            'fa fa-star fa-2x high', 'fa fa-star fa-2x high']}
                /></ListGroup.Item>
                </ListGroup>
            </Col>
            </Row>
            <Row>
                <Col xs={6} md={6}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Bình Luận</th>
                                <th>Cách Đây</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map(c => 
                                <tr>
                                    <td>{c.get_username}</td>
                                    <td>{c.content}</td>
                                    <td><Moment fromNow>{c.created_date}</Moment></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                    <div>
                    <Form onSubmit={addComment}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="text-danger">Phản hồi về tiệc cưới, dịch vụ</Form.Label>
                            <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Nhập nội dung bình luận..."
                            onChange={(event) => setCommentContent(event.target.value)}/>
                            <Button variant="primary" type="submit">Đăng</Button>
                        </Form.Group>
                    </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}