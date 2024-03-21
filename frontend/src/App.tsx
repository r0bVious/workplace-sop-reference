import { useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import Hero from "../components/hero";
import Login from "../components/login";
import Article from "../components/article";
import MobileNavMenu from "../components/navigation/mobilenavmenu";
import Header from "../components/navigation/desktopheader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isLoggedIn ? (
        //true
        <>
          {isMobile ? <MobileNavMenu /> : <Header />}
          <p>You're logged in!</p>
          <Article />
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
