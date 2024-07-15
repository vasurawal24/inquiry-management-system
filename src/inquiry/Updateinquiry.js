import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Updateinquiry() {
    const { id } = useParams();
    const [inquiry, setinquiry] = useState([]);
    const [adbrach, setbranch] = useState([]);
    const [Branch, getBranch] = useState('');
    const [name, setname] = useState(' ');
    const [contact, setContact] = useState(' ');
    const [adcourse, setCourse] = useState([]);
    const [Course, getCourse] = useState('');
    const [join, setjoin] = useState('');
    const [adref, setAdref] = useState([]);
    const [Ref, getRef] = useState('');
    const [adRole, setRole] = useState([]);
    const [Role, getRole] = useState('');
    const [adstatus, getstatus] = useState([]);
    const [Status, setStatus] = useState('');

    const [Date_status, setDate_status] = useState('');
    const [Date_in, setDate_in] = useState('');

    useEffect(() => {
        if (inquiry.length > 0) {
            const value = inquiry.find(ele => ele._id === id);
            if (value) {
                getBranch(value.branch_id?._id || '');
                setname(value.name || '');
                setContact(value.contact || '');
                getCourse(value.course_id?._id || '');
                getRef(value.ref_id?._id || '');
                getRole(value.inq_id?._id || '');
                setStatus(value.status?._id || '');
                setjoin(value.joindate || '');
                setDate_status(value.status_date || '');
                setDate_in(value.inq_date || '');
            }
        }
    }, [inquiry, id])

    useEffect(() => {
        update()
    }, [])
    const update = async () => {
        let token = await localStorage.getItem('token');
        let headers = {
            authorization: token
        }
        axios.get('/inquiry/view_inquiry', { headers })
            .then(function (response) {
                setinquiry(response.data.data)
                console.log(response.data.data);
            })
            .catch(function (error) {

                console.log(error);
            }, [])
    }
    useEffect(() => {
        newBranch();
    }, [])
    const newBranch = () => {
        try {
            let token = localStorage.getItem('token');
            axios.get('/branch/view_branch', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setbranch(response.data.data)
                    console.log(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        newCourse();
    }, [])
    const newCourse = () => {
        try {
            let token = localStorage.getItem('token');
            axios.get('/course/view_course', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setCourse(response.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        newRef();
    }, [])
    const newRef = () => {
        try {
            let token = localStorage.getItem('token');

            axios.get('/reference/view_reference', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setAdref(response.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        newStatus();
    }, [])
    const newStatus = () => {
        try {
            let token = localStorage.getItem('token');

            axios.get('/status/view_status', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    getstatus(response.data.data)
                    console.log(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        newInquiry();
    }, [])
    const newInquiry = () => {
        try {
            let token = localStorage.getItem('token');
            axios.get('/role/view_role', {
                headers: {
                    authorization: token
                }
            })
                .then(function (response) {
                    setRole(response.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
    const Inquiry_update = async () => {
        try {
            let token = await localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            const response = await axios.post('/inquiry/update_inquiry/' + id, {
                branch_id: Branch,
                name: name,
                contact: contact,
                course_id: Course,
                joindate: join,
                ref_id: Ref,
                inq_by: Role,
                status: Status,
                status_date: Date_status,
                inq_date: Date_in
            }, { headers })
            if (response.data) {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "1px", left: "400px" }}>Update Inquiry</h1>
                <div className="d-flex justify-content-center">
                    <table className="me-5 w-50">
                        <br />
                        <tr>
                            <th>Branch :=</th>
                            <td>
                                <select value={Branch} onChange={(e) => getBranch(e.target.value)}>
                                    {adbrach.map((branch) => (
                                        <option key={branch._id} value={branch._id}>{branch.branchname}</option>
                                    ))}
                                </select>
                            </td>
                        </tr><br />
                        <tr>
                            <th>Name:= </th>
                            <td><input type="text" placeholder="Name" value={name} onChange={(e) => { setname(e.target.value) }} /></td>
                        </tr><br />
                        <tr>
                            <th>Contact:= </th>
                            <td><input type="text" placeholder="Contact" value={contact} onChange={(e) => { setContact(e.target.value) }} /> </td>
                        </tr><br />
                        <tr>
                            <th>Course:= </th>
                            <td>
                                <select value={Course} onChange={(e) => getCourse(e.target.value)}>
                                    {adcourse.map((ele) => (
                                        <option key={ele._id} value={ele._id}>{ele.course}</option>
                                    ))}
                                </select>
                            </td>
                        </tr><br />
                        <tr>
                            <th>Join Date:=</th>
                            <td><input type="date" value={join} onChange={(e) => { setjoin(e.target.value) }} /> </td>
                        </tr><br />
                    </table>
                    <table className="w-50"><br />
                        <tr>
                            <th>Reference Name:=</th>
                            <td>
                                <select value={Ref} onChange={(e) => getRef(e.target.value)}>
                                    {
                                        adref.map((ele) => (
                                            <option key={ele._id} value={ele._id}>{ele.referencename}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr><br />
                        <tr>
                            <th>Inquiry By:=</th>
                            <td>
                                <select value={Role} onChange={(e) => getRole(e.target.value)}>
                                    {
                                        adRole.map((ele) => (
                                            <option key={ele._id} value={ele._id}>{ele.rolename}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr><br />
                        <tr>
                            <th>Status:= </th>
                            <td>
                                <select value={Status} onChange={(e) => setStatus(e.target.value)}>
                                    {
                                        adstatus.map((ele) => (
                                            <option key={ele._id} value={ele._id}>{ele.status}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr><br />
                        <tr>
                            <th>Status Date:=</th>
                            <td><input type="date" value={Date_status} onChange={(e) => { setDate_status(e.target.value) }} /> </td>
                        </tr><br />
                        <tr>
                            <th>Inquiry Date:=</th>
                            <td><input type="date" value={Date_in} onChange={(e) => { setDate_in(e.target.value) }} /> </td>
                        </tr><br />
                    </table>
                </div>
                <div style={{ width: "1100px", display: "flex", justifyContent: "center" }}>
                    <Link to="/inquiry/viewinquiry"> <button className="button" onClick={() => { Inquiry_update() }}>update</button></Link>
                </div>
            </div >
        </>
    )
}

export default Updateinquiry;