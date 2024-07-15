import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Updatestatus() {
    const { id } = useParams();
    const [adstatus, setStatus] = useState([]);
    const [name, setname] = useState(' ');

    let value = adstatus.find((ele, ind) => { return ele._id === id });
    useEffect(() => {
        if (value) {
            setname(value.status || '')
        }
    }, [value])
    useEffect(() => {
        update()
    }, [])
    const update = async () => {
        let token = await localStorage.getItem('token');
        let headers = {
            authorization: token
        }
        axios.get('/status/view_status', { headers })
            .then(function (response) {
                setStatus(response.data.data)
            })
            .catch(function (error) {

                console.log(error);
            }, [])
        if (value) {
            setname(value.status || '')
        }
    }
    const status_update = async () => {
        try {
            let token = await localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            const response = await axios.post('/status/update_status/' + id, {
                status: name
            }, { headers })
            console.log(response.data);
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
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Update Status</h1>
                <div style={{ backgroundColor: "#191c24", margin: "auto", width: "530px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>
                    <table>
                        <br />
                        <tr>
                            <th>Status Id:= </th>
                            <td><input type="text" placeholder="Staus Id" value={id} /></td>
                        </tr><br />
                        <tr>
                            <th>Status Name:= </th>
                            <td><input type="text" placeholder="Status Name" value={name} onChange={(e) => { setname(e.target.value) }}  /></td>
                        </tr>
                        <br />
                    </table>
                    <div style={{ width: "500px", display: "flex", justifyContent: "center" }}><button className="button"><Link to='/status/viewstatus' onClick={() => { status_update() }}> Update</Link></button></div>
                </div>
            </div>
        </>
    )
}
export default Updatestatus;