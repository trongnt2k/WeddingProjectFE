import Cookies from "js-cookie"
import { useState } from "react"
import { Form , Button, Container, Col, Row} from "react-bootstrap"
import APIS, { endpoints } from "../configs/APIS"
import swal from "sweetalert"

export default function UpdateUser(){
    let [email, setEmail] = useState()
    let [firstName, setFirstName] = useState()
    let [lastName, setLastName] = useState()
    let [password, setPassword] = useState()
    let [confirmPassword, setConfirmPassword] = useState()

    const update = ( async(event) => {
        event.preventDefault()
        if((password === confirmPassword) || (password==null && confirmPassword==null)){
            try{
            let res = await APIS.patch(endpoints['update-user'](localStorage.getItem("user_id")), {
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "password": password
            }, {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            swal("Cập nhật thông tin tài khoản thành công !!!")
            } catch(ex) {
                console.error(ex)
                swal({
                    title: "Thất bại!",
                    text: "Cập nhật thông tin tài khoản thất bại !!!",
                    icon: "warning",
                    button: "Đồng ý!",
                  });
            }
       }
       else
       {
        swal({
            title: "Thất bại!",
            text: "Nhập mật khẩu không chính xác hoặc xác nhận mật khẩu lần hai không đúng vui lòng thử lại!",
            icon: "warning",
            button: "Đồng ý!",
          });
       }
    })

    const logOut= () => {
        localStorage.clear()
        window.location.href = '/login'
    }

    return(
        <Container>
            <h1 className="text-center text-danger">CẬP NHẬT THÔNG TIN TÀI KHOẢN</h1>
            <h6 className="text-center">(* Lưu ý: Những thông tin không cần cập nhật có thể bỏ trống)</h6>
            <Form onSubmit={update}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Nhập email mới" 
                    onChange={(event) => setEmail(event.target.value)}/>
                    <Form.Text className="text-muted">
                    Cập nhật email cho tài khoản
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Họ</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Nhập họ mới" 
                    onChange={(event) => setFirstName(event.target.value)}/>
                    <Form.Text className="text-muted">
                    Cập nhật họ cho tài khoản
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Nhập tên mới" 
                    onChange={(event) => setLastName(event.target.value)}/>
                    <Form.Text className="text-muted">
                    Cập nhật tên cho tài khoản
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Nhập mật khẩu mới" 
                    onChange={(event) => setPassword(event.target.value)}/>
                    <Form.Text className="text-muted">
                    Tạo mật khẩu mới
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Nhập lại mật khẩu mới" 
                    onChange={(event) => setConfirmPassword(event.target.value)}/>
                </Form.Group>
                <Row md={5}>
                    <Col>
                        <Button variant="primary" type="submit">
                            Cập nhật
                        </Button>
                    </Col>
                    <Col>
                    <Button variant="danger" onClick={logOut}>
                        Đăng xuất
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}