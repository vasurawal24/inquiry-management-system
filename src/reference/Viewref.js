import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
function Viewref() {
    const [ref, setref] = useState([]);
    const [Delete, setdelete] = useState('');
    const [show, setShow] = useState(false);
    useEffect(() => {
        view();
    }, [])
    const view = () => {
        try {
            let token = localStorage.getItem('token');

            axios.get('/reference/view_reference', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setref(response.data.data)
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
    const delete_ref = () => {
        try {
            let token = localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            axios.get(`/reference/delete_reference/${Delete}`, { headers })
            setShow(false)
            setref((n) => n.filter(ref => ref._id !== Delete))
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>View Reference</h1>
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
                                ref != null &&
                                ref.map((ele, ind) => {
                                    return (
                                        <tr>
                                            <th>{ele.referencename}</th>
                                            <th style={{ cursor: "pointer" }}><Link to={"/reference/updateref/" + ele._id}> <RxUpdate /> </Link></th>
                                            <th style={{ cursor: "pointer" }} onClick={() => { modal(ele._id) }}><TiDelete /> </th>
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
                            <h2>Are you sure you want to delete?</h2>
                            <button onClick={delete_ref}>Yes</button>
                            <button onClick={() => setShow(false)}>No</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default Viewref;