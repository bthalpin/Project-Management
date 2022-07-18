import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import Auth from '../utils/auth';

export default function Login() {
  const [user,setUser] = useState({name:'',email:'',password:''});
  const [loginOrRegister,setLoginOrRegister] = useState('login')
  const [errorMessage,setErrorMessage] = useState('')

  const changeLogin = (path) => {
    setUser({name:'',email:'',password:''})
    console.log(user)
    setLoginOrRegister(path)
    setErrorMessage('')
  }

  const register = async (e) => {
    e.preventDefault();
    try {
      if (user.name===''||user.email===''||user.password===''){
        return
      }
      if (!user.email.toLowerCase().match(/.+@.+\..+/)){
          setErrorMessage('Must enter valid email')

          return
      }
      if (user.password.length<8){
          setErrorMessage('Password must be at least 8 characters')
          return
      }
      const response  = await fetch('http://localhost:3001/user',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
      })
      const data = await response.json()
      if(response.code===11000){
          setErrorMessage('An account with that email is already used.')
          return
      }
      if (!data.token){       
          setErrorMessage('invalid')
          return
      }
      Auth.login(data.token)
      setErrorMessage('')
      window.location = ('/dashboard')
    } catch (err) {
      console.log(err)
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (user.email===''||user.password===''){
        return
    }
    const response = await fetch('http://localhost:3001/user/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({...user,email:user.email.toLowerCase()})

    })
    const data = await response.json()
    
        if (!data.token){
            setErrorMessage('Invalid username or password')
            return
        }
        Auth.login(data.token)
        setErrorMessage('')
        window.location = ('/dashboard')
    
}
  return (
    <div className={styles.container}>
      {loginOrRegister==='register'?
      <div>
        <form>
          <input type="name" placeholder="Enter Name" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} autoComplete='name'></input>
          <input type="email" placeholder="Enter Email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} autoComplete='email'></input>
          <input type="password" placeholder="Enter Password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} autoComplete='current-password'></input>
          {/* <input type="name" placeholder="Enter Name"></input> */}
          <button onClick={register}>Register</button>
        </form>
        <button onClick={()=>changeLogin('login')}>Login</button>
      </div>
      
      :
      <div>
        <form>
          
          <input type="email" placeholder="Enter Email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} autoComplete='email'></input>
          <input type="password" placeholder="Enter Password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} autoComplete='current-password'></input>
          {/* <input type="name" placeholder="Enter Name"></input> */}
          <button onClick={login}>Login</button>
        </form>
        <button onClick={()=>changeLogin('register')}>Register</button>
      </div>
      }
      {errorMessage}
    </div>
  )
}
