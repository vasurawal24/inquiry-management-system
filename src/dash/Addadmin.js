import React, { useEffect, useState } from "react";
import './dash.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addadmin = () => {
    const [vrole, setVrole] = useState([]);
    const [vbranch, setVbranch] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [loadingBranches, setLoadingBranches] = useState(true);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        showdata();
        seebranch();
    }, []);

    const showdata = async () => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.get("/role/view_role", {
                headers: {
                    authorization: token
                }
            });
            setVrole(response.data.data);
            setLoadingRoles(false);
        } catch (error) {
            console.error(error);
            setLoadingRoles(false);
        }
    }

    const seebranch = async () => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.get("/branch/view_branch", {
                headers: {
                    authorization: token
                }
            });
            setVbranch(response.data.data);
            setLoadingBranches(false);
        } catch (error) {
            console.error(error);
            setLoadingBranches(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            contact: '',
            role: '',
            branch_id: '',
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is Required'),
            email: Yup.string().email('Invalid email address').required('Email is Required'),
            password: Yup.string().required('Password is Required'),
            contact: Yup.string().required('Contact is Required'),
            role: Yup.string().required('Role is Required'),
            branch_id: Yup.string().required('Branch is Required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('role', values.role);
            formData.append('branch_id', values.branch_id);
            formData.append('contact', values.contact);

            try {
                let token = localStorage.getItem('token');
                const response = await axios.post("/add_admin", formData, {
                    headers: {
                        authorization: token
                    }
                });
                console.log(response.data);
                if (response.data) {
                    formik.resetForm();
                    setSubmitSuccess('Admin added successfully!');
                    setSubmitError(null);
                }
            } catch (error) {
                console.error(error);
                setSubmitSuccess(null);
                setSubmitError('Failed to add admin. Please try again.');
            }
        },
    });

    return (
        <div className="dashboard">
            <h1 className="title">Add Admin</h1>
            <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Admin Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Admin Name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="input-group">
                        <label htmlFor="contact">Contact</label>
                        <input
                            id="contact"
                            type="text"
                            placeholder="Contact"
                            name="contact"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.contact}
                        />
                        {formik.touched.contact && formik.errors.contact ? (
                            <div className="error">{formik.errors.contact}</div>
                        ) : null}
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Image</label>
                        <input
                            id="image"
                            type="file"
                            name="image"
                            onChange={(event) => {
                                formik.setFieldValue("image", event.currentTarget.files[0]);
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Role</label>
                        {loadingRoles ? (
                            <p>Loading roles...</p>
                        ) : (
                            <select
                                id="role"
                                name="role"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                            >
                                <option value="">Select Role</option>
                                {vrole.map((role, index) => (
                                    <option key={index} value={role._id}>{role.rolename}</option>
                                ))}
                            </select>
                        )}
                        {formik.touched.role && formik.errors.role ? (
                            <div className="error">{formik.errors.role}</div>
                        ) : null}
                    </div>
                    <div className="input-group">
                        <label htmlFor="branch_id">Branch</label>
                        {loadingBranches ? (
                            <p>Loading branches...</p>
                        ) : (
                            <select
                                id="branch_id"
                                name="branch_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.branch_id}
                            >
                                <option value="">Select Branch</option>
                                {vbranch.map((branch, index) => (
                                    <option key={index} value={branch._id}>{branch.branchname}</option>
                                ))}
                            </select>
                        )}
                        {formik.touched.branch_id && formik.errors.branch_id ? (
                            <div className="error">{formik.errors.branch_id}</div>
                        ) : null}
                    </div>
                    <div className="button-container">
                        <button className="button" type="submit">Add</button>
                        <Link to="/admin/viewadmin">
                            <button className="button">View Admins</button>
                        </Link>
                    </div>
                    {submitSuccess && <div className="success-message">{submitSuccess}</div>}
                    {submitError && <div className="error-message">{submitError}</div>}
                </form>
            </div>
        </div>
    );
};

export default Addadmin;