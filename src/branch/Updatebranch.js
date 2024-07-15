import React, { useEffect, useState } from "react";
import '../dash/dash.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
function Updatebranch() {

    const [branch, setbranch] = useState([]);
    const [name, setname] = useState(' ');
    var { id } = useParams();

    let value = branch.find((ele, ind) => { return ele._id === id });
    useEffect(() => {
        if (value) {
            setname(value.branchname || '');
        }
    }, [value]);
    useEffect(() => {
        update();
    }, [])
    const update = () => {
        let token = localStorage.getItem('token');
        let headers = {
            authorization: token,
        }
        axios.get('/branch/view_branch', { headers })
            .then(function (response) {
                setbranch(response.data.data)
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            }, []);
        console.log(value);
        if (value) {
            setname(value.branchname || '');
        }

    }
    const b_update = async () => {
        try {
            let token = await localStorage.getItem('token');
            let headers = {
                authorization: token
            }
            const response = await axios.post('/branch/update_branch/' + id, {
                branchname: name
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
                <h1 style={{ position: "absolute", top: "20px", left: "400px" }}>Update Branch</h1>
                <div style={{ backgroundColor: "#191c24", margin: "auto", width: "500px", padding: "10px", position: "absolute", top: "100px", left: "250px" }}>
                    <h4>branch id</h4>
                    <input type="text" value={id}></input>
                    <h4>branch name</h4>
                    <input type="text" value={name} onChange={(e) => { setname(e.target.value) }}></input>
                    <Link to="/brach/viewbranch" onClick={() => { b_update() }}> Update </Link>
                </div>
            </div>
        </>
    )
}
export default Updatebranch;