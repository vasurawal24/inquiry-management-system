import React, { useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Branch Name is Required')
});

function Addbranch() {

    const formik = useFormik({
        initialValues: { name: '' },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let token = await localStorage.getItem('token');
                let headers = {
                    authorization: token
                };
                const response = await axios.post('/branch/add_branch', {
                    branchname: values.name
                }, { headers });
                console.log(response.data);
                if (response.data) {
                    // alert('Branch added successfully');
                    resetForm();
                }
            } catch (error) {
                console.log("error =", error);
            }
        }
    });

    return (
        <div className="dashboard">
            <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Add Branch</h1>
            <div style={{ backgroundColor: "#191c24", margin: "auto", width: "500px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Branch Name:</th>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Branch Name"
                                        name="name"
                                        onChange={(e) => { formik.handleChange(e);}}
                                        value={formik.values.name}
                                        onBlur={formik.handleBlur}
                                    />
                                </td>
                            </tr>
                            {formik.touched.name && formik.errors.name ? (
                                <tr>
                                    <td colSpan="2" style={{ color: 'red', textAlign: 'center' }}>
                                        {formik.errors.name}
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                    <div style={{ width: "500px", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <button type="submit" className="button">Add</button>
                        <Link to="/brach/viewbranch" className="button" style={{ marginLeft: "10px", color: "black" }}>View Branches</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addbranch;
