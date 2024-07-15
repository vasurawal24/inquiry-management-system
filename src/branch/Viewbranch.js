import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

function Viewbranch() {
    const [branch, setBranch] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [branchToDelete, setBranchToDelete] = useState(null);

    const view = async () => {
        try {
            let token = localStorage.getItem('token');
            const response = await axios.get('/branch/view_branch', {
                headers: { authorization: token }
            });
            setBranch(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        view();
    }, []);

    const confirmDelete = (id) => {
        setBranchToDelete(id);
        setShowModal(true);
    };

    const deleteBranch = async () => {
        try {
            let token = localStorage.getItem('token');
            const headers = { authorization: token };
            await axios.get(`/branch/delete_branch/${branchToDelete}`, { headers });
            setShowModal(false);
            setBranch((n) => n.filter(branch => branch._id !== branchToDelete));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>View Branch</h1>
                <div className="view">
                    <table>
                        <thead style={{ color: 'white' }}>
                            <tr>
                                <th>Branch</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branch != null && branch.map((ele) => (
                                <tr key={ele._id}>
                                    <td>{ele.branchname}</td>
                                    <td style={{ cursor: "pointer" }}>
                                        <Link to={`/branch/updatebranch/${ele._id}`}><RxUpdate /></Link>
                                    </td>
                                    <td style={{ cursor: 'pointer' }} onClick={() => confirmDelete(ele._id)}><TiDelete /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/Dashboard"><div className="dash_btn">Dashboard</div></Link>
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure delete branch?</h2>
                        <button onClick={deleteBranch}>Yes</button>
                        <button onClick={() => setShowModal(false)}>No</button>
                    </div>
                </div>
            )}
        </>
    );
}
export default Viewbranch;
