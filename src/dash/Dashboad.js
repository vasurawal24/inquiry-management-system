import React, { useEffect, useState } from "react";
import { FaBook, FaQuestion } from "react-icons/fa";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";
import '../dash/dash.css';
function Dashboard() {
    const [admin, setAdmin] = useState([]);
    const [inq, setInq] = useState([]);
    const [branch, setBranch] = useState([]);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        adminView();
        viewInquiry();
        viewBranch();
        viewCourse();
    }, []);

    const adminView = async () => {
        try {
            let token = localStorage.getItem('token');
            const response = await axios.get('/view_admin', {
                headers: {
                    authorization: token
                }
            });
            setAdmin(response.data.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };

    const viewInquiry = async () => {
        try {
            let token = localStorage.getItem('token');
            const response = await axios.get('/inquiry/view_inquiry', {
                headers: {
                    authorization: token
                }
            });
            setInq(response.data.data);
        } catch (error) {
            console.error("Error fetching inquiry data:", error);
        }
    };

    const viewBranch = async () => {
        try {
            let token = localStorage.getItem('token');
            const response = await axios.get('/branch/view_branch', {
                headers: {
                    authorization: token
                }
            });
            setBranch(response.data.data);
        } catch (error) {
            console.error("Error fetching branch data:", error);
        }
    };

    const viewCourse = async () => {
        try {
            let token = localStorage.getItem('token');
            const response = await axios.get('/course/view_course', {
                headers: {
                    authorization: token
                }
            });
            setCourse(response.data.data);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    return (
        <div className="dashboard">
            <div className="menu-container">
                <Link to="/admin/viewadmin" className="menu-item">
                    <FaPersonCirclePlus className="icon" />
                    <h2>Admin</h2>
                    <div className="info">{admin.length} More Info...</div>
                </Link>
                <Link to="/inquiry/viewinquiry" className="menu-item">
                    <FaQuestion className="icon" />
                    <h2>Inquiry</h2>
                    <div className="info">{inq.length} More Info...</div>
                </Link>
            </div>
            <div className="menu-container">
                <Link to="/brach/viewbranch" className="menu-item">
                    <HiBuildingOffice2 className="icon" />
                    <h2>Branch</h2>
                    <div className="info">{branch.length} More Info...</div>
                </Link>
                <Link to="/course/viewcourse" className="menu-item">
                    <FaBook className="icon" />
                    <h2>Course</h2>
                    <div className="info">{course.length} More Info...</div>
                </Link>
            </div>
        </div>
    );
}
export default Dashboard;