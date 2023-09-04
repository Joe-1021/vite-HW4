import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const {VITE_APP_HOST}= import.meta.env;

function Login (){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate =useNavigate();

    const handleLogin = async()=>{
        const formData={
            email:email,
            password:password,
        }

        try {
            const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`,formData);
            const {token} = res.data;
            // console.log(token);
            document.cookie = `token=${token}`;
            navigate('/todo')
        } catch (error) {
            console.log(error);
            setPassword('')
        }
        
    }

    return(
        <div>
            <form className="formControls" action="index.html">
                <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                <label className="formControls_label" htmlFor="email">Email</label>
                <input className="formControls_input" type="text" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="請輸入 email" required />
                <span>此欄位不可留空</span>
                <label className="formControls_label" htmlFor="pwd">密碼</label>
                <input className="formControls_input" type="password" name="pwd" id="pwd" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="請輸入密碼" required />
                <input className="formControls_btnSubmit" type="button" value="登入" onClick={handleLogin}/>
                <NavLink to='/sign_up' className="formControls_btnLink">註冊帳號 </NavLink>
            </form>
        </div>
    )
}

export default Login