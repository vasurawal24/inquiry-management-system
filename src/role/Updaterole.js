import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function Updaterole() {
    const [role, setrole] = useState([]);
    const [name, setname] = useState(' ');
    var { id } = useParams();
    let value = role.find((ele, ind) => { return ele._id === id });
    useEffect(() => {
        if (value) {
            setname(value.rolename || '');
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
        axios.get('/role/view_role', { headers })
            .then(function (response) {
                setrole(response.data.data)
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            }, []);
        console.log(value);
        if (value) {
            setname(value.rolename || '');
        }
    }
    
    const R_update = async () => {
        try {
            let token = await localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            const response = await axios.post('/role/update_role/' + id, {
                rolename: name
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
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Update Role</h1>
                <div style={{ backgroundColor: "#191c24", margin: "auto", width: "500px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>
                    <h4>Role Id:=</h4>
                    <input type="text" placeholder="Role Id" value={id} />
                    <h4>Role Name:=</h4>
                    <input type="text" placeholder="Role Name" value={name} onChange={(e) => setname(e.target.value)} />
                    <div style={{ width: "500px", display: "flex", justifyContent: "center" }}><button className="button"><Link to="/role/viewrole" onClick={() => { R_update() }}> Update</Link></button></div>
                </div>
            </div>
        </>
    )
}
export default Updaterole;