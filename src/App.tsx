import { useState } from 'react';
import './App.css';
import GoogleSignin from './components/GoogleSignIn';
import { AuthContext } from './utils/context/UserContext';
import { User } from './utils/types';

function App() {
   
  const [user, setUser] = useState<User>();

  console.log(user);
  
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
    <div className="App">
      <GoogleSignin/>
      {/* <div id="signInDiv"/> */}
    </div>
    </AuthContext.Provider>
  )
}

export default App
