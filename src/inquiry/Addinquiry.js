import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addinquiry = () => {
    const [branches, setBranches] = useState([]);
    const [courses, setCourses] = useState([]);
    const [references, setReferences] = useState([]);
    const [inquiryRoles, setInquiryRoles] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        fetchBranches();
        fetchCourses();
        fetchReferences();
        fetchInquiryRoles();
        fetchStatuses();
    }, []);

    const fetchBranches = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/branch/view_branch', {
                headers: { authorization: token }
            });
            setBranches(response.data.data);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/course/view_course', {
                headers: { authorization: token }
            });
            setCourses(response.data.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const fetchReferences = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/reference/view_reference', {
                headers: { authorization: token }
            });
            setReferences(response.data.data);
        } catch (error) {
            console.error("Error fetching references:", error);
        }
    };

    const fetchInquiryRoles = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/role/view_role', {
                headers: { authorization: token }
            });
            setInquiryRoles(response.data.data);
        } catch (error) {
            console.error("Error fetching inquiry roles:", error);
        }
    };

    const fetchStatuses = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/status/view_status', {
                headers: { authorization: token }
            });
            setStatuses(response.data.data);
        } catch (error) {
            console.error("Error fetching statuses:", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            branch_id: '',
            name: '',
            contact: '',
            course_id: '',
            joindate: '',
            ref_id: '',
            inq_by: '',
            status: '',
            status_date: '',
            inq_date: ''
        },
        validationSchema: Yup.object({
            branch_id: Yup.string().required('Branch is Required'),
            name: Yup.string().required('Name is Required'),
            contact: Yup.string().required('Contact is Required'),
            course_id: Yup.string().required('Course is Required'),
            joindate: Yup.date().required('Join Date is Required'),
            ref_id: Yup.string().required('Reference is Required'),
            inq_by: Yup.string().required('Inquiry By is Required'),
            status: Yup.string().required('Status is Required'),
            status_date: Yup.date().required('Status Date is Required'),
            inq_date: Yup.date().required('Inquiry Date is Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const token = await localStorage.getItem('token');
                const response = await axios.post('/inquiry/add_inquiry', values, {
                    headers: { authorization: token }
                });
                console.log(response.data);
                if (response.data.data) {
                    resetForm();
                }
            } catch (error) {
                console.error("Error adding inquiry:", error);
            }
        }
    });

    return (
        <div className="dashboard">
            <h1 style={{ position: "absolute", top: "1px", left: "400px" }}>Add Inquiry</h1>
            <form onSubmit={formik.handleSubmit} >
                <div className="d-flex justify-content-center">
                    <table className="w-50">
                        <tbody><br />
                            <tr>
                                <th>Branch :</th>
                                <td>
                                    <select
                                        name="branch_id"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.branch_id}
                                    >
                                        <option value="">--select--</option>
                                        {branches.map((branch, index) => (
                                            <option key={index} value={branch._id}>{branch.branchname}</option>
                                        ))}
                                    </select>
                                    {formik.touched.branch_id && formik.errors.branch_id ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.branch_id}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Name:</th>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.name}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Contact:</th>
                                <td>
                                    <input
                                        type="text"
                                        name="contact"
                                        placeholder="Contact"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.contact}
                                    />
                                    {formik.touched.contact && formik.errors.contact ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.contact}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Course:</th>
                                <td>
                                    <select
                                        name="course_id"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.course_id}
                                    >
                                        <option value="">--select--</option>
                                        {courses.map((course, index) => (
                                            <option key={index} value={course._id}>{course.course}</option>
                                        ))}
                                    </select>
                                    {formik.touched.course_id && formik.errors.course_id ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.course_id}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Join Date:</th>
                                <td>
                                    <input
                                        type="date"
                                        name="joindate"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.joindate}
                                    />
                                    {formik.touched.joindate && formik.errors.joindate ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.joindate}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                        </tbody>
                    </table>
                    <table className="w-50">
                        <tbody><br />
                            <tr>
                                <th>Reference:</th>
                                <td>
                                    <select
                                        name="ref_id"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.ref_id}
                                    >
                                        <option value="">--select--</option>
                                        {references.map((reference, index) => (
                                            <option key={index} value={reference._id}>{reference.referencename}</option>
                                        ))}
                                    </select>
                                    {formik.touched.ref_id && formik.errors.ref_id ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.ref_id}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Inquiry By:</th>
                                <td>
                                    <select
                                        name="inq_by"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.inq_by}
                                    >
                                        <option value="">--select--</option>
                                        {inquiryRoles.map((role, index) => (
                                            <option key={index} value={role._id}>{role.rolename}</option>
                                        ))}
                                    </select>
                                    {formik.touched.inq_by && formik.errors.inq_by ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.inq_by}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Status:</th>
                                <td>
                                    <select
                                        name="status"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.status}
                                    >
                                        <option value="">--select--</option>
                                        {statuses.map((status, index) => (
                                            <option key={index} value={status._id}>{status.status}</option>
                                        ))}
                                    </select>
                                    {formik.touched.status && formik.errors.status ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.status}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Status Date:</th>
                                <td>
                                    <input
                                        type="date"
                                        name="status_date"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.status_date}
                                    />
                                    {formik.touched.status_date && formik.errors.status_date ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.status_date}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                            <tr>
                                <th>Inquiry Date:</th>
                                <td>
                                    <input
                                        type="date"
                                        name="inq_date"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.inq_date}
                                    />
                                    {formik.touched.inq_date && formik.errors.inq_date ? (
                                        <div className="error" style={{ color: "red" }}>{formik.errors.inq_date}</div>
                                    ) : null}
                                </td>
                            </tr><br />
                        </tbody>
                    </table>
                </div>
                <div style={{ width: "1100px", display: "flex", justifyContent: "center" }}>
                    <button type="submit" className="button" style={{ margin: "10px" }}>Add</button>
                    <Link to="/inquiry/viewinquiry"><button className="button" style={{ margin: "10px" }}>View Inquiries</button></Link>
                </div>
            </form>

        </div>

    );
};

export default Addinquiry;
