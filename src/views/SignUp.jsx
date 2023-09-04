import { useState } from 'react';
import { NavLink }from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const {VITE_APP_HOST}= import.meta.env;


function SignUp (){

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordCheck,setPasswordCheck]=useState('');
    const [nickname,setNickname]=useState('');
    const navigate =useNavigate()



    const handleSignUp = async()=>{

        if(password !== passwordCheck){
            alert('密碼與確認密碼不同');
            setPassword('');
            setPasswordCheck('');
            return
        }

        const formData ={
            email,
            password,
            nickname
        }
        try {
            const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`,formData);
            console.log(res);
            navigate('/')
        } catch (error) {
            console.log(error)
        }
        
    }


    return(
        <div>
                <form className="formControls" action="index.html">
                    <h2 className="formControls_txt">註冊帳號</h2>
                    <label className="formControls_label" htmlFor="email">Email</label>
                    <input className="formControls_input" type="text" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="請輸入 email" required />
                    <label className="formControls_label" htmlFor="name">您的暱稱</label>
                    <input className="formControls_input" type="text" name="nickname" id="name" value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="請輸入您的暱稱" />
                    <label className="formControls_label" htmlFor="pwd">密碼</label>
                    <input className="formControls_input" type="password" name="pwd" id="pwd" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="請輸入密碼" required />
                    <label className="formControls_label" htmlFor="pwdCheck">再次輸入密碼</label>
                    <input className="formControls_input" type="password" name="pwd" id="pwdCheck" value={passwordCheck} onChange={(e)=>setPasswordCheck(e.target.value)} placeholder="請再次輸入密碼" required />
                    <input className="formControls_btnSubmit" type="button" value="註冊帳號" onClick={handleSignUp}/>
                    <NavLink to='/' className="formControls_btnLink">登入</NavLink>
                </form>
            </div>
    )
}

export default SignUp