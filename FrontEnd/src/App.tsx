import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './users/NotFound';
import UserEdit from './users/UserEdit';
import UserSearch from './users/UserList';
import UserList from './users/UserList';
import UserRegistry from './users/UserRegistry';

function App() {
  let {name} = useParams();
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<UserRegistry/>} />
            <Route path = "/List" element = {<UserList/>} />
            <Route path = "/Edit/:_id" element = {<UserEdit/>} />
            <Route path = "/Search" element = {<UserSearch/>} />
            <Route path = "*" element={<NotFound />}></Route>
          </Routes>
          <div className="linkBox">
          <Link className='link' to="/">회원가입</Link>
          <Link className='link' to="/List">목록보기</Link>
          </div>
          
        </BrowserRouter>
      </div>
      <div>

      </div>
    </div>
    
  );
}

export default App;
