import {Container , Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Badge } from 'reactstrap';
import {Link} from 'react-router-dom'
import { useContext } from "react";
import CartContext from "../CartProvider/CartContext";

export default function Header(){
    let path=""
    let userProfilePath=`/users/${localStorage.getItem('user_id')}/`
    if(localStorage.getItem('username') === null)
        path = <Nav.Link as={Link} to="/login" className="text-danger">Đăng nhập</Nav.Link>
    else
        path = <Nav.Link as={Link} to={userProfilePath} className="text-danger">{localStorage.getItem('username')}</Nav.Link>
    const [state] = useContext(CartContext)
    return(
        <Container>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Wedding-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                        <Nav.Link as={Link} to="/weddings">Tiệc Cưới</Nav.Link>
                        <Nav.Link as={Link} to="/weddinghalls">Sảnh cưới</Nav.Link>
                        <Nav.Link as={Link} to="/services">Dịch vụ cưới</Nav.Link>
                        <Nav.Link as={Link} to="/menus">Thực đơn cưới</Nav.Link>
                        <Nav.Link as={Link} to="/register">Đăng kí</Nav.Link>
                        {path}
                        <Nav.Link as={Link} to="/weddings/create-wedding">Đặt tiệc <Badge 
                            className="text-white bg-danger">{localStorage.getItem("count") || state.count}
                            </Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}