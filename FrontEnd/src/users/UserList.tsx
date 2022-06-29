import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../dto/User';

async function getUsers(){
    let users : User[];
    users = await fetch(`http://localhost:5000/users?`)
    .then((response)=>
    response.json());
    return users;
}

async function Delete(id : string){
  console.log(id);
  await fetch(`http://localhost:5000/users/${id}`,{
    method:"DELETE",
    headers:{
      'Content-type': 'application/json'
    },
  })
  .then((response)=>
  response.json());
}

function UserList() {

  const [users, setUsers] = useState<User[]>([]);
  const [del, setDel]= useState("");

  useEffect(()=>{
    async function fetcthAndSetUser(){
      const users = await getUsers();
      setUsers(users);
    }
    fetcthAndSetUser();
  },[])

  const clickDelete = async function(id : string | undefined){
    if(id !== undefined){
      await Delete(id);
      alert("삭제되었습니다");
    }
    else{
      alert("삭제 실패했습니다");
    }
  }

  return (
    <div className="UserList">
        <table>
          <thead>
              <tr>
                <td>id</td>
                <td>name</td>
                <td>job</td>
                <td>수정</td>
                <td>삭제</td>
              </tr>
          </thead>
          <tbody>
              {users.map(({_id, name, job},index)=>(
                <tr key={_id + name + job}>
                  <td>{_id}</td>
                  <td>{name}</td>
                  <td>{job}</td>
                  <td><Link to={`/Edit/${_id}`}><input type="button" value="수정" /></Link></td>
                  <td><input type="button" value="삭제" onClick={()=>{
                  clickDelete(_id);
                  }}></input></td>
                </tr>
              ))}
          </tbody>
        </table>

    </div>
  );
}

export default UserList;
