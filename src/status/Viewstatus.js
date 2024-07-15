import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
function Viewstatus() {
    const [adstatus, setStatus] = useState([]);
    const [Delete, setdelete] = useState('');
    const [show, setshow] = useState(false);
    useEffect(() => {
        view();
    }, [])
    const view = () => {
        try {
            let token = localStorage.getItem('token');

            axios.get('/status/view_status', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setStatus(response.data.data)
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
        setshow(true);
    }
    const delete_status = async () => {
        try {
            let token = localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            await axios.get(`/status/delete_status/${Delete}`, { headers })
            setshow(false);
            setStatus((n) => n.filter(adstatus => adstatus._id !== Delete))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>View Status</h1>
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
                                adstatus != null &&
                                adstatus.map((ele, ind) => {
                                    return (
                                        <tr>
                                            <th>{ele.status}</th>
                                            <th style={{ cursor: "pointer" }}><Link to={"/status/updatestatus/" + ele._id}> <RxUpdate /> </Link></th>
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
            <div className="modal" style={{ display: show ? "block" : "none" }}>
                <div className="modal-content">
                    <h2>Are you sure you want to Delete this Status</h2>
                    <button onClick={delete_status}>Yes</button>
                    <button onClick={() => { setshow(false) }}>NO</button>
                </div>
            </div>
        </>
    )
}
export default Viewstatus;