import React from "react";
import '../dash/dash.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Addstatus = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Status is Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                let token = localStorage.getItem('token');
                let headers = {
                    authorization: token
                };
                const response = await axios.post('/status/add_status', {
                    status: values.name
                }, { headers });
                console.log(response.data.data);
                if (response.data.data) {
                    resetForm();
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className="dashboard">
            <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Add STATUS</h1>
            <div style={{ backgroundColor: "#191c24", margin: "auto", width: "530px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Status: </th>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="STATUS"
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />

                                </td>
                            </tr>
                        </tbody>

                    </table>
                    {formik.touched.name && formik.errors.name ? (
                        <div className="error" style={{ color: "red" }}>{formik.errors.name}</div>
                    ) : null}
                    <div style={{ width: "500px", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <button className="button" type="submit">Add</button>
                    </div>
                    <div style={{ width: "500px", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <Link to='/status/viewstatus'><button className="button" type="button">View Statuses</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addstatus;
