import { useState} from "react"
import { Form , Button, Container} from "react-bootstrap"
import { useDispatch } from "react-redux"
import APIS, { endpoints } from "../configs/APIS"

export default function Login(){
    let [username, setUsername] = useState()
    let [password, setPassword] = useState()
    let dispatch = useDispatch()

    let process = async(event) => {
        event.preventDefault()
        try{
            let oAuthInfo = await APIS.get(endpoints['oauth2-info'])
            let res = await APIS.post(endpoints['login'], {
                "client_id": oAuthInfo.data.client_id,
                "client_secret": oAuthInfo.data.client_secret,
                "username": username,
                "password": password,
                "grant_type": "password"
            })
            
            localStorage.setItem("access_token", res.data.access_token)
            localStorage.setItem("username", username)

            let user = await APIS.get(endpoints['current-user'], {
                headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            localStorage.setItem("user_id", user.data.id)
            dispatch({
                "type": "USER_LOGIN",
                "payload": user.data
            })
            window.location.href = '/weddings'
        } catch (ex) {
            console.error(ex)
        }
    }
    return(
        <Container>
            <h1 className="text-center text-danger">ĐĂNG NHẬP</h1>
            <Form onSubmit={process}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tài khoản</Form.Label>
                    <Form.Control
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} 
                    type="username" placeholder="Nhập Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} 
                    type="password" placeholder="Nhập Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </Container>
    )
}