import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";


function Viewcourse() {
    const [course, getcourse] = useState([]);
    const [Delete, setdelete] = useState('');
    const [show, setShow] = useState(false);
    useEffect(() => {
        view();
    }, [])
    const view = () => {
        try {
            let token = localStorage.getItem('token');
            axios.get('/course/view_course', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    getcourse(response.data.data)
                    console.log(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
    const model = (id) => {
        setdelete(id);
        setShow(true)
    }
    const deletecourse = async () => {
        try {
            let token = localStorage.getItem('token');
            var headers = {
                authorization: token
            }
            await axios.get(`/course/delete_course/${Delete}`, { headers })
            setShow(false)
            getcourse((n) => n.filter(course => course._id !== Delete));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>View Course</h1>
                <div className="view">

                    <table>
                        <thead style={{ color: 'white' }}>
                            <tr>
                                <th>
                                    branch
                                </th>
                                <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                course != null &&
                                course.map((ele, ind) => {
                                    return (
                                        <tr>
                                            <th>{ele.course}</th>
                                            <th style={{ cursor: "pointer" }}><Link to={"/course/updatecourse/" + ele._id}> <RxUpdate /> </Link></th>
                                            <th style={{ cursor: "pointer" }} onClick={() => { model(ele._id) }}><TiDelete /> </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <Link to="/Dashboard"> <div className="dash_btn">Dashboad</div></Link>
                </div>
            </div>
            {
                show && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Are you sure Delete this course</h2>
                            <button onClick={deletecourse}>Yes</button>
                            <button onClick={() => setShow(false)}>no</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default Viewcourse;