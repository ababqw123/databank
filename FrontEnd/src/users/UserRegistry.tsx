
import { getValue } from '@testing-library/user-event/dist/utils';
import { useLayoutEffect, useRef, useState } from 'react';
import User from '../dto/User';
import './User.css';

async function addUser(name : string, job : string ){

  await fetch(`http://localhost:5000/users`,{
    method:"POST",
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

function UserRegistry() {
  const [users, setUsers] = useState<User[]>([]);
  const [inputs, setInput] = useState({
    name: '',
    job : ''
  })

  const {name, job} = inputs;

  const onChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target

  const nextInputs = {
    ...inputs,
    [name] : value
  }
  setInput(nextInputs);
}

  const clickAdd = async function(){
    if(name !== "" && job !== ""){
      await addUser(name, job);
      alert("회원가입 되었습니다");
      setInput({
        name:"",
        job:""
      })
    }
    else{
      alert("빈 칸을 입력해주세요");
    }
  }


    return (
      <div className="UserRegistry">
        <h1> 회원가입 </h1>
          <form action="#" method="post">
            <label htmlFor="name">이름 : </label>
            <input name="name" id="name" type="text" value={name} onChange={onChange}></input>
            <br></br>
            <label htmlFor="job">직업 : </label>
            <input id="job" name="job" type="text" value={job} onChange={onChange}></input>
            <br></br>
            <input type="button" value="가입하기" onClick={clickAdd}></input>
          </form>
      </div>
    );
  }

  export default UserRegistry;