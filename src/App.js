import './App.css';
import Dash from './Dash';
import Addadmin from './dash/Addadmin';
import Viewadmin from './dash/Viewadmin';
import Addrole from './role/Addrole';
import Updateadmin from './dash/Updateadmin';
import { Navigate, Route, Routes } from 'react-router-dom';
import Nev from './dash/Nev';
import Updaterole from './role/Updaterole';
import Viewrole from './role/Viewrole';
import Addbranch from './branch/Addbranch';
import Updatebranch from './branch/Updatebranch';
import Viewbranch from './branch/Viewbranch';
import Addcourse from './Course/Addcourse';
import Viewcourse from './Course/Viewcourse';
import Updatecourse from './Course/Updatecourse';
import Addref from './reference/Addref';
import Updateref from './reference/Updateref';
import Viewref from './reference/Viewref';
import Addinquiry from './inquiry/Addinquiry';
import Viewinquiry from './inquiry/Viewinquiry';
import Updateinquiry from './inquiry/Updateinquiry';
import Addstatus from './status/Addstatus';
import Updatestatus from './status/Updatestatus';
import Viewstatus from './status/Viewstatus';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { check } from './Store/Counterslice/CounterSlice';

function App() {

  let ck = useSelector((state) => state.counter.value)
  let dish = useDispatch();
  useEffect(() => {

    dish(check());
    console.log(ck);
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={ck ? <Navigate to={'/Dashboard'} /> : <Login />}></Route>
        <Route path='/Dashboard' element={ck ? <Dash /> : <Navigate to={'/'} />}></Route>
        <Route path='/admin/Addadmin' element={<><Addadmin /><Nev /></>}></Route>
        <Route path='/admin/viewadmin' element={<><Viewadmin /><Nev /></>}></Route>
        <Route path='/admin/updateadmin/:id' element={<><Updateadmin /><Nev /></>}></Route>
        <Route path='/role/addrole' element={<><Addrole /><Nev /></>}></Route>
        <Route path='/role/updaterole/:id' element={<><Updaterole /><Nev /></>}></Route>
        <Route path='/role/viewrole' element={<><Viewrole /><Nev /></>}></Route>
        <Route path='/branch/addbranch' element={<><Addbranch /><Nev /></>}></Route>
        <Route path='/branch/updatebranch/:id' element={<><Updatebranch /><Nev /></>}></Route>
        <Route path='/brach/viewbranch' element={<><Viewbranch /><Nev /></>}></Route>
        <Route path='/course/addcourse' element={<><Addcourse /><Nev /></>}></Route>
        <Route path='/course/viewcourse' element={<><Viewcourse /><Nev /></>}></Route>
        <Route path='/course/updatecourse/:id' element={<><Updatecourse /><Nev /></>}></Route>
        <Route path='/reference/addref' element={<><Addref /><Nev /></>}></Route>
        <Route path='/reference/updateref/:id' element={<><Updateref /><Nev /></>}></Route>
        <Route path='/reference/viewref' element={<><Viewref /><Nev /></>}></Route>
        <Route path='/inquiry/addinquiry' element={<><Addinquiry /><Nev /></>}></Route>
        <Route path='/inquiry/viewinquiry' element={<Viewinquiry />}></Route>

        <Route path='/inquiry/updateinquiry/:id' element={<><Updateinquiry /><Nev /> </>}></Route>

        <Route path='/status/addstatus' element={<><Addstatus /><Nev /></>}></Route>
        <Route path='/status/updatestatus/:id' element={<><Updatestatus /><Nev /></>}></Route>
        <Route path='/status/viewstatus' element={<><Viewstatus /><Nev /></>}></Route>
      </Routes>
    </>
  );
}

export default App;
// https://themewagon.github.io/darkpan/?