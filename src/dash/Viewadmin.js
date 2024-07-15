import React, { useEffect, useState } from "react";
import './dash.css';
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

function Viewadmin() {
    const [admin, setAdmin] = useState([]);
    const [Delete, setdelete] = useState('');
    const [show, setShow] = useState(false);
    useEffect(() => {
        admin_view();
    }, []);

    const admin_view = async () => {
        try {
            let token = localStorage.getItem('token');
            console.log("Token:", token);
            const response = await axios.get('/view_admin', {
                headers: {
                    authorization: token
                }
            });
            console.log("Response data:", response.data.data);
            setAdmin(response.data.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };
    const modal = (id) => {
        setdelete(id);
        setShow(true);
    }
    const admin_delete = async () => {
        try {
            let token = localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            await axios.get(`/delete_admin/${Delete}`, { headers })
            setShow(false);
            setAdmin((n) => n.filter(admin => admin._id !== Delete))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="dashboard">
            <h1 style={{ position: "absolute", top: "20px", left: "460px" }}>View Admin</h1>
            <div className="admin_view">
                <table border={2} style={{ marginTop: "20px", border: "2px solid black" }}>
                    <thead style={{ color: "white", border: "2px solid black" }}>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Image</th>
                            <th>Role</th>
                            <th>Branch</th>
                            <th colSpan={2} className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ color: "white" }}>
                        {
                            admin.map((ele, ind) => (
                                <tr key={ind}>
                                    <td>{ele.name}</td>
                                    <td>{ele.email}</td>
                                    <td>{ele.contact}</td>
                                    <td>
                                        <img src={`http://localhost:5000/images/${ele.image}`} style={{ width: "80px", height: "80px", borderRadius: "30px" }} />
                                    </td>
                                    <td>{ele.role?.rolename}</td>
                                    <td>{ele.branch_id && ele?.branch_id?.branchname}</td>
                                    <td style={{ cursor: "pointer" }}><Link to={"/admin/updateadmin/" + ele._id}><RxUpdate /></Link></td>
                                    <td style={{ cursor: 'pointer' }}><TiDelete onClick={() => { modal(ele._id) }} /></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Link to="/Dashboard"> <div className="dash_btn">Dashboad</div></Link>
            </div>
            {
                show && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Are you sure you want to delete this admin?</h2>
                            <button onClick={admin_delete}>Yes</button>
                            <button onClick={() => { setShow(false) }}>No</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Viewadmin;

