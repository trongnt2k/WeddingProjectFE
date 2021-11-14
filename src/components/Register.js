import React, {useRef, useState } from "react";
import {Form, Button, Container} from 'react-bootstrap'
import { endpoints } from "../configs/APIS";
import 'bootstrap/dist/css/bootstrap.min.css'
import APIS from "../configs/APIS";
import swal from "sweetalert";

export default function Register(){
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const avatar = useRef()

    const register = (event) => {
        event.preventDefault()

        let register = async() => {
            const formData = new FormData()
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("email", email)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("avatar", avatar.current.files[0])
            try{
                APIS.post(endpoints['users'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                swal("Đăng kí tài khoản thành công!")
            } catch(ex) {
                console.error(ex)
            }
        }

        if (!!password && password === confirmPassword){
            register()
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
    }
        return(
            <Container>
                <h1 class="text-center text-danger">ĐĂNG KÝ</h1>
                <Form onSubmit={register}>
                    <RegiterForm id="email" label="Email" type="email" value={email} change={(event)=>setEmail(event.target.value)} />
                    <RegiterForm id="firstName" label="First Name" type="text" value={firstName} change={(event)=>setFirstName(event.target.value)} />
                    <RegiterForm id="lastName" label="Last Name" type="text" value={lastName} change={(event)=>setLastName(event.target.value)} />
                    <RegiterForm id="username" label="Username" type="text" value={username} change={(event)=>setUsername(event.target.value)} />
                    <RegiterForm id="password" label="Password" type="password" value={password} change={(event)=>setPassword(event.target.value)} />
                    <RegiterForm id="confirm" label="Confirm Password" type="password" value={confirmPassword} change={(event)=>setConfirmPassword(event.target.value)} />
                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type='file' ref={avatar} className="form-control" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </Container>
        )
    }

function RegiterForm (props){
    return(
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} value={props.value} onChange={props.change} />
        </Form.Group>
    )
}