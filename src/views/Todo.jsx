import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const {VITE_APP_HOST}= import.meta.env;


function Todo (){
    const navigate = useNavigate();
    const [todos,setTodos] = useState([]);
    const [nickname,setNickname] = useState('');
    const [filterTodos,setFilterTodos] = useState([]);
    const [newTodo,setNewTodo]=useState('')

    const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

    useEffect(()=>{
        checkout()
    },[]);



    const checkout = async()=>{
        try {
            const res = await axios.get(`${VITE_APP_HOST}/users/checkout`,{
                headers:{
                    Authorization:token
                }
            });
            setNickname(res.data.nickname);
            getTodos()
        } catch (error) {
            console.log(error);
            navigate('/')
        } 
    }

    const getTodos = async()=>{
        try {
            const res = await axios.get(`${VITE_APP_HOST}/todos`,{
                headers:{
                    Authorization:token
                }
            });
            console.log(res.data.data)
            setTodos(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyDown=(e)=>{
        if(e.key==='Enter'){
            addTodo();
        }
    }

    const addTodo = async()=>{
        try {
            const res = await axios.post(`${VITE_APP_HOST}/todos`,{
                content:newTodo,
            },{
                headers:{
                    Authorization:token
                }
            });
            setNewTodo('');
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><a href="#">ONLINE TODO LIST</a></h1>
                <ul>
                    <li className="todo_sm"><a href="#"><span>{nickname}的代辦</span></a></li>
                    <li><a href="#loginPage">登出</a></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入待辦事項" value={newTodo} onChange={((e)=>setNewTodo(e.target.value.trim()))}
                        onKeyDown={handleKeyDown}
                    />
                    <a href="#" onClick={(e)=>{
                        e.preventDefault();
                        addTodo();
                    }}>
                        <i className="fa fa-plus"></i>
                    </a>
                </div>
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li><a href="#" className="active">全部</a></li>
                        <li><a href="#">待完成</a></li>
                        <li><a href="#">已完成</a></li>
                    </ul>
                    <div className="todoList_items">
                        <ul className="todoList_item">
                            {filterTodos.length === 0 ?(
                                <li className="todoList_label" style={{ justifyContent: 'space-around', cursor: 'auto' }}>
                                    目前尚無項目
                                </li>
                            ):('')}
                            {filterTodos.map((todo)=>{
                                return(
                                    <li key={todo.id}>
                                        <label class="todoList_label">
                                            <input class="todoList_input" type="checkbox" value="true" />
                                            <span>{todo.content}</span>
                                        </label>
                                        <a href="#" >
                                            <i class="fa fa-times"></i>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="todoList_statistics">
                            <p> 5 個已完成項目</p>
                            <a href="#">清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Todo