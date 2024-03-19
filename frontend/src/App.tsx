import { useState } from "react";
import Hero from "../components/hero";
import Login from "../components/login";
import Article from "../components/article";
import NavMenu from "../components/navigation/navmenu";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        //true
        <>
          <p>You're logged in!</p>
          <Article />
        </>
      ) : (
        //false
        <>
          <Hero />
          <Login />
          <NavMenu />
        </>
      )}
    </>
  );
}

export default App;
