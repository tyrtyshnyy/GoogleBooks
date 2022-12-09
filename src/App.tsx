import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksList from "./components/BooksList/BooksList";

import Books from "./pages/Books/Books";
import { AuthContext } from "./utils/context/UserContext";
import { User } from "./utils/types";

function App() {
  const [user, setUser] = useState<User>();

  console.log(user);

  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<SignIn />}></Route> */}
          <Route path="/" element={<Books />}>
            <Route index element={<BooksList />} />
            {/* <Route path=":id" element={<BookId />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
