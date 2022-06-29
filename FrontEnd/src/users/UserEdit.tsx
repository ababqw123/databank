import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import User from "../dto/User";

import './User.css';

async function getUsers(){
  let users : User[];
  users = await fetch(`http://localhost:5000/users?`)
  .then((response)=>
  response.json());
  return users;
}

async function EditUser(id: string, name : string, job : string ){

  await fetch(`http://localhost:5000/users/${id}`,{
    method:"PATCH",
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      job : job
    })
  })
  .then((response)=>
  response.json());
}


function UserEdit() {
  const params = useParams();
  const [inputs, setInput] = useState({
    _id : '',
    name: '',
    job : ''
  })
  const {_id, name, job} = inputs;
  const onChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
  const nextInputs = {
    ...inputs,
    [name] : value
  }
  setInput(nextInputs);
}

useEffect(()=>{
  async function fetcthAndSetUser(){
    const users = await getUsers();
    let user = users.find((item)=>{
      return item._id === params._id})

      if(user !== undefined && user._id !== undefined){
        setInput(
          {
            _id : user._id,
            name: user.name, 
            job: user.job
          });
      }
  }
  fetcthAndSetUser();
},[])

  const clickEdit = async function(){
    if(name !== "" && job !== "" && params._id){
      await EditUser(params._id, name, job)
      .then((resolve)=>{
        console.log(resolve);
      })
      .catch((reject)=>{
        console.log(reject);
      })
      alert("수정이 완료되었습니다.");
      setInput({
        _id: "",
        name:"",
        job:""
      })
    }
    else{
      alert("빈 칸을 입력해주세요");
    }
    
  }


  return (
    <div className="UserEdit">
          <h1> 회원정보 수정 </h1>
          <form action="#" method="post">
          <label htmlFor="_id">I D : </label>
            <input name="_id" id="_id" type="text" value={_id} onChange={onChange} ></input>
            <br></br>
            <label htmlFor="name">이름 : </label>
            <input name="name" id="name" type="text" value={name} onChange={onChange}></input>
            <br></br>
            <label htmlFor="job">직업 : </label>
            <input id="job" name="job" type="text" value={job} onChange={onChange}></input>
            <br></br>
            <input type="button" value="수정하기" onClick={clickEdit}></input>
          </form>
    </div>
  );
}

export default UserEdit;