import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function Updateref() {
    const { id } = useParams()
    const [ref, setref] = useState([])
    const [name, setname] = useState(' ');
    let value = ref.find((ele, ind) => { return ele._id === id });
    
    useEffect(() => {
        if (value) {
            setname(value.referencename || '')
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
        axios.get('/reference/view_reference', { headers })
            .then(function (response) {
                setref(response.data.data)
            })
            .catch(function (error) {

                console.log(error);
            }, [])
        if (value) {
            setname(value.referencename || '')
        }
    }
    const Ref_update = async () => {
        try {
            let token = await localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            const response = await axios.post('/reference/update_reference/' + id, {
                referencename: name
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
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Update Reference</h1>
                <div style={{ backgroundColor: "#191c24", margin: "auto", width: "530px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>

                    <h4>Reference id:=</h4>
                    <input type="text" value={id} />
                    <h4>Reference name:=</h4>
                    <input type="text" placeholder="Reference name" value={name} onChange={(e) => { setname(e.target.value) }} />
                    <div style={{ width: "500px", display: "flex", justifyContent: "center" }}><button className="button"><Link to='/reference/viewref' onClick={() => { Ref_update() }}> Add</Link></button></div>
                </div>
            </div>
        </>
    )
}
export default Updateref;