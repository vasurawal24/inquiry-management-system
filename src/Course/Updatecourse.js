import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Updatecourse() {
    const [course, setcourse] = useState([]);
    const [name, setname] = useState(' ');
    var { id } = useParams();

    let value = course.find((ele, ind) => { return ele._id === id });
    useEffect(() => {
        if (value) {
            setname(value.course || '');
        }
    }, [value])
    useEffect(() => {
        update();
    }, [])
    const update = () => {
        let token = localStorage.getItem('token');
        let headers = {
            authorization: token,
        }
        axios.get('/course/view_course', { headers })
            .then(function (response) {
                setcourse(response.data.data)
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            }, []);
        console.log(value); 
        
        if (value) {
            setname(value.course || '');
        }
    }

    const C_update = async () => {
        try {
            let token = await localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            const response = await axios.post('/course/update_course/' + id, {
                course: name
            }, { headers })
            if (response.data) {
                console.log(response.data);

            }
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <>
            <div className="dashboard">
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Update Course</h1>
                <div style={{ backgroundColor: "#191c24", margin: "auto", width: "500px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>

                    <h4>Course Id:=</h4>
                    <input type="text" placeholder="Course Id" value={id} />
                    <h4>Course Name:=</h4>
                    <input type="text" placeholder="Course Name" value={name} onChange={(e) => setname(e.target.value)} />
                    <div style={{ width: "450px", display: "flex", justifyContent: "center" }}><button className="button"><Link to="/course/viewcourse" onClick={() => { C_update() }}> Update</Link></button></div>
                </div>
            </div>
        </>
    )
}
export default Updatecourse;