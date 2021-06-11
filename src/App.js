import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [token, setToken] = useState(null);

  useEffect(()=>{
    let code = new URLSearchParams(window.location.search).get("code");
    setToken(code);
  },[])

  return (
    <>
      {token ? <Dashboard/> : <Login/>}
    </>
  );
}

export default App;
