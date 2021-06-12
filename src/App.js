import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [authCode, setAuthCode] = useState(null);

  useEffect(()=>{
    let code = new URLSearchParams(window.location.search).get("code");
    setAuthCode(code);
  },[])

  return (
    <>
      {authCode ? <Dashboard code={authCode}/> : <Login/>}
    </>
  );
}

export default App;
