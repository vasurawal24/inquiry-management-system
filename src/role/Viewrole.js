import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
function Viewrole() {
    const [role, setRole] = useState([]);
    const [show, setshow] = useState(false);
    const [Delete, setdelete] = useState('');
    useEffect(() => {
        view();
    }, [])
    const view = () => {
        try {
            let token = localStorage.getItem('token');
            axios.get('/role/view_role', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setRole(response.data.data)
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
    const modal = (id) => {
        setdelete(id);
        setshow(true);
    }
    const deleterole = (id) => {
        try {
            let token = localStorage.getItem('token');
            var headers = {
                authorization: token
            }
            axios.get(`/role/delete_role/${Delete}`, { headers })
            setshow(false)
            setRole((n) => n.filter(role => role._id !== Delete))
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>View Role</h1>
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
                                role != null &&
                                role.map((ele, ind) => {
                                    return (
                                        <tr>
                                            <th>{ele.rolename}</th>
                                            <th style={{ cursor: "pointer" }}><Link to={"/role/updaterole/" + ele._id}> <RxUpdate /> </Link></th>
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
                            <h2>Are you sure you want to delete this Role ?</h2>
                            <button onClick={deleterole}>Yes</button>
                            <button onClick={() => setshow(false)}>no</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default Viewrole;