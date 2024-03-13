import { useState } from "react";
import Hero from "../components/hero";
import Login from "../components/login";
import Datablock from "../components/datablock";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        //true
        //Map data -> 1 entry = 1 Datablock
        <>
          <p>You're logged in!</p>
          <Datablock />
        </>
      ) : (
        //false
        <>
          <Hero />
          <Login />
        </>
      )}
    </>
  );
}

export default App;
