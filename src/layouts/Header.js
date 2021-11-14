import {Container , Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Badge } from 'reactstrap';
import Cookies from "js-cookie";

export default function Header(){
    let path=""
    let userProfilePath=`/users/${localStorage.getItem('user_id')}/`
    if(localStorage.getItem('username') === null)
        path = <Nav.Link href="/login" className="text-danger">Đăng nhập</Nav.Link>
    else
        path = <Nav.Link href={userProfilePath} className="text-danger">{localStorage.getItem('username')}</Nav.Link>
    let count = 0
    if(!!sessionStorage.getItem("count"))
        count += parseInt(sessionStorage.getItem("count"))
    if(!!Cookies.get("weddinghall_id"))
        count = count+1
    if(!!Cookies.get("menu_id"))
        count = count+1
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
                        <Nav.Link href="/weddings">Tiệc Cưới</Nav.Link>
                        <Nav.Link href="/weddinghalls">Sảnh cưới</Nav.Link>
                        <Nav.Link href="/services">Dịch vụ cưới</Nav.Link>
                        <Nav.Link href="/menus">Thực đơn cưới</Nav.Link>
                        <Nav.Link href="/register">Đăng kí</Nav.Link>
                        {path}
                        <Nav.Link href="/weddings/create-wedding">Đặt tiệc <Badge 
                            className="text-white bg-danger">{count}
                            </Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}