import React from "react";
import '../dash/dash.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Addcourse = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Course Name is Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                let token = localStorage.getItem('token');
                let headers = {
                    authorization: token
                };
                const response = await axios.post('/course/add_course', {
                    course: values.name
                }, { headers });
                console.log(response.data);
                if (response.data) {
                    resetForm();
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    });

    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Add Course</h1>
                <div style={{ backgroundColor: "#191c24", margin: "auto", width: "500px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course Name:</th>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Course Name"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                        <div className="error" style={{color:"red"}}>{formik.errors.name}</div>
                                    ) : null}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <div style={{ width: "500px", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <button className="button" type="submit">Add</button>
                        </div>
                        <div style={{ width: "500px", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <Link to="/course/viewcourse"><button className="button">View Courses</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Addcourse;
