import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

function Viewinquiry() {
    const [inq, setinq] = useState([]);
    const [Delete, setdelete] = useState('');
    const [show, setShow] = useState(false);
    useEffect(() => {
        view();
    }, [])
    const view = () => {
        try {
            let token = localStorage.getItem('token');
            // console.log(token);
            axios.get('/inquiry/view_inquiry', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setinq(response.data.data)
                    console.log(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    const modal = (id) => {
        setdelete(id);
        setShow(true);
    }
    const delete_inquiry = async (id) => {
        try {
            let token = localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            axios.get(`/inquiry/delete_inquiry/${Delete}`, { headers })
            setShow(false)
            setinq((n) => n.filter(inq => inq._id !== Delete));
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="inquiry">
                <h1 className="text-center mt-5" style={{ color: "white" }}>View Inquiry</h1>
                <table border={"2px solid black"} className="table table-dark" style={{ marginTop: "20px" }}>
                    <thead style={{ color: 'white', border: "2px solid black" }}>
                        <tr style={{ padding: '30px' }}>
                            <th>branch Name</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Course</th>
                            <th>Join Date</th>
                            <th>Reference</th>
                            <th>Inquiry By</th>
                            <th>Status</th>
                            <th>status date</th>
                            <th>Inquiry date</th>
                            <th colSpan={2} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ color: "white" }}>
                        {
                            inq != null &&
                            inq.map((ele, ind) => {
                                return (
                                    <tr>
                                        <th>{ele.branch_id && ele?.branch_id?.branchname}</th>
                                        <th>{ele.name}</th>
                                        <th>{ele.contact}</th>
                                        <th>{ele.course_id && ele?.course_id?.course}</th>
                                        <th>{ele.joindate}</th>
                                        <th>{ele.ref_id.referencename}</th>
                                        <th>{ele.inq_by && ele?.inq_by?.rolename}</th>
                                        <th>{ele.status.status}</th>
                                        <th>{ele.status_date}</th>
                                        <th>{ele.inq_date}</th>
                                        <th style={{ cursor: "pointer" }}><Link to={"/inquiry/updateinquiry/" + ele._id}> <RxUpdate /></Link></th>
                                        <th style={{ cursor: "pointer" }} onClick={() => { modal(ele._id) }}> <TiDelete /></th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Link to="/Dashboard"> <div className="dash_btn2">Dashboad</div></Link>
            </div>
            <div className="modal" style={{ display: show ? "block" : "none" }}>
                <div className="modal-content">
                    <h2>Are you sure you want to Delete this Inquiry??</h2>
                    <button onClick={delete_inquiry}>Yes</button>
                    <button onClick={() => { setShow(false) }}>No</button>
                </div>
            </div>
        </>
    )
}
export default Viewinquiry;