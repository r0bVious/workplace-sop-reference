import { useBreakpointValue } from "@chakra-ui/react";
import Hero from "../components/hero";
import Login from "../components/login";
import Article from "../components/article";
import MobileNavMenu from "../components/navigation/mobilenavmenu";
import Header from "../components/navigation/desktopheader";
import { useAuth } from "../context/AuthContext";

function App() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn ?? false;
  console.log("Logged In:", isLoggedIn);
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
