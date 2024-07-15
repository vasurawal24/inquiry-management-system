import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { FaSlideshare, FaBook, FaQuestion } from "react-icons/fa";
import { FaMessage, FaUserGraduate, FaBell, FaPersonCirclePlus } from "react-icons/fa6";
import { MdContactPage } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { VscReferences } from "react-icons/vsc";
import { GrStatusGood } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";
import { check } from "../Store/Counterslice/CounterSlice";
import { useDispatch, useSelector } from 'react-redux';
import { TbLogout2 } from "react-icons/tb";


function Nev() {
    const [admin, setAdmin] = useState([]);
    const [user_name, setName] = useState('');
    const [user_email, setEmail] = useState('');
    const [img, setImg] = useState('');
    useEffect(() => {
        admin_view();
    }, []);

    const admin_view = async () => {
        try {
            let token = localStorage.getItem('token');
            let name = localStorage.getItem('name');
            setName(name);
            console.log("Name:", name);
            let email = localStorage.getItem('email');
            setEmail(email);
            console.log("Email:", email);
            let image = localStorage.getItem('image');
            setImg(image);
            console.log("Token:", token);
            const response = await axios.get('/view_admin', {
                headers: {
                    authorization: token,
                }
            });
            console.log("Response data:", response.data.data);
            setAdmin(response.data.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };
    let dish = useDispatch();

    const logout = async () => {
        try {
            const second = await axios.get('/admin_logout');
            console.log(second.data);
            if (second.data) {
                localStorage.removeItem('token');
                dish(check());
            }
        } catch (error) {
            console.log("error =", error);
        }
    }
    return (
        <>
            <Container fluid>
                <Row className="row">
                    <Col className="nav_bar col-2">
                        <h1 style={{ cursor: "pointer", backgroundColor: "#191c24" }}> INQUIRY</h1> <br />
                        <h2 style={{ cursor: "pointer", backgroundColor: "#191c24", marginBottom: "5px" }}><img src={`http://localhost:5000/images/${img}`} style={{ width: "40px", height: "40px", borderRadius: "30px" }} /> {user_name}</h2>
                        <span style={{ cursor: "pointer" }}>{user_email}</span>
                        <ul>
                            <li>
                                <Accordion className="group">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><span style={{ fontSize: "1rem", display: "flex", alignItems: "center", marginRight: "5px", transition: "0.7s" }}> <FaPersonCirclePlus /></span>ADMIN</Accordion.Header>
                                        <Accordion.Body>
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to="/admin/addadmin"> add</Link></span> <br />
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to="/admin/viewadmin"> View</Link></span> <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header><span style={{ fontSize: "1rem", display: "flex", alignItems: "center", marginRight: "5px", transition: "0.7s" }}><MdContactPage /></span> ROLE</Accordion.Header>
                                        <Accordion.Body>
                                            <span href="" style={{ transition: "0.7s", padding: "5px 20px" }}><Link to="/role/addrole"> add</Link></span> <br />
                                            <span href="" style={{ transition: "0.7s", padding: "5px 20px" }}><Link to="/role/viewrole">View</Link> </span> <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header><span style={{ fontSize: "1rem", display: "flex", alignItems: "center", marginRight: "5px", transition: "0.7s" }}><HiBuildingOffice2 /></span> BRANCH</Accordion.Header>

                                        <Accordion.Body>
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/branch/addbranch'>add</Link> </span> <br />
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/brach/viewbranch'>View</Link> </span> <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header><span style={{ fontSize: "1rem", display: "flex", alignItems: "center", marginRight: "5px", transition: "0.7s" }}><FaBook /></span> COURSE</Accordion.Header>
                                        <Accordion.Body>
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/course/addcourse'> add</Link></span> <br />
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/course/viewcourse'> View</Link></span> <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header><span style={{ fontSize: "1rem", display: "flex", alignItems: "center", marginRight: "5px", transition: "0.7s" }}><VscReferences /></span> REFERENCE</Accordion.Header>
                                        <Accordion.Body>
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/reference/addref'> add</Link></span> <br />
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/reference/viewref'> View</Link></span> <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header><span style={{ fontSize: "1rem", display: "flex", alignItems: "center", marginRight: "5px", transition: "0.7s" }}><FaQuestion /></span> INQUIRY</Accordion.Header>
                                        <Accordion.Body>
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/inquiry/addinquiry'> add</Link></span> <br />
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/inquiry/viewinquiry'> View</Link></span> <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header><span style={{ fontSize: "1rem", display: "flex", alignItems: "center", marginRight: "5px", transition: "0.7s" }}><GrStatusGood /></span> STATUS</Accordion.Header>
                                        <Accordion.Body>
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/status/addstatus'> add</Link></span> <br />
                                            <span style={{ transition: "0.7s", padding: "5px 20px" }}><Link to='/status/Viewstatus'> View</Link></span> <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </li>
                        </ul>
                    </Col>
                    <Col style={{ padding: "0" }}>
                        <div style={{ backgroundColor: "#191C24", fontSize: "2.5rem" }} className="d-flex justify-content-between nev_hover">
                            <Link to="/Dashboard">  <span className="home_hover"> Dashboard</span></Link>
                            <div style={{ cursor: "pointer", color: "#6c7293" }} className="d-flex text-end ">
                                <span className="me-5"> <img src={`http://localhost:5000/images/${img}`} style={{ width: "45px", height: "45px", borderRadius: "30px", marginBottom: "10px" }} /></span>
                                <span className="me-5">  {user_name}</span>
                                <span className="me-3"> {user_email}</span>
                                <Link to="/"><span className="me-5" onClick={() => { logout() }}>  <TbLogout2 className="logout" /></span></Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Nev;