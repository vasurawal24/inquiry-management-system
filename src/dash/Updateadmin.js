import React, { useEffect, useState } from "react";
import './dash.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Updateadmin() {
    const [adminList, setAdminList] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchAdminData();
        fetchRoles();
        fetchBranches();
    }, []);

    useEffect(() => {
        if (adminList.length > 0) {
            const admin = adminList.find(ele => ele._id === id);
            if (admin) {
                setName(admin.name || '');
                setEmail(admin.email || '');
                setContact(admin.contact || '');
                setBranch(admin.branch_id?._id || '');
                setRole(admin.role?._id || '');
            }
        }
    }, [adminList, id]);

    const fetchAdminData = () => {
        const token = localStorage.getItem('token');
        axios.get('/view_admin', { headers: { authorization: token } })
            .then(response => {
                setAdminList(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const fetchRoles = () => {
        const token = localStorage.getItem('token');
        axios.get('/role/view_role', { headers: { authorization: token } })
            .then(response => {
                setRoles(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const fetchBranches = () => {
        const token = localStorage.getItem('token');
        axios.get('/branch/view_branch', { headers: { authorization: token } })
            .then(response => {
                setBranches(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const updateAdmin = () => {
        const token = localStorage.getItem('token');
        axios.post(`/update_admin/${id}`, {
            name,
            email,
            contact,
            role,
            branch_id: branch
        }, { headers: { authorization: token } })
            .then(response => {
                console.log(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="dashboard">
            <h1 style={{ position: "absolute", top: "20px", left: "500px" }}>Update Admin</h1>
            <div style={{ backgroundColor: "#191c24", margin: "auto", width: "700px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>
                <table>
                    <tbody><br />
                        <tr>
                            <th>Admin Name:</th>
                            <td><input type="text" placeholder="Admin Name" value={name} onChange={(e) => setName(e.target.value)} /></td>
                        </tr><br />
                        <tr>
                            <th>Email:</th>
                            <td><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                        </tr><br />
                        <tr>
                            <th>Contact:</th>
                            <td><input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} /></td>
                        </tr><br />
                        <tr>
                            <th>Role:</th>
                            <td>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    {roles.map((role) => (
                                        <option key={role._id} value={role._id}>{role.rolename}</option>
                                    ))}
                                </select>
                            </td>
                        </tr><br />
                        <tr>
                            <th>Branch:</th>
                            <td>
                                <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                                    {branches.map((branch) => (
                                        <option key={branch._id} value={branch._id}>{branch.branchname}</option>
                                    ))}
                                </select>
                            </td>
                        </tr><br />
                    </tbody>
                </table>
                <div style={{ width: "650px", display: "flex", justifyContent: "center" }}>
                    <Link to="/admin/viewadmin">
                        <button className="button" onClick={updateAdmin}>Update</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Updateadmin;
