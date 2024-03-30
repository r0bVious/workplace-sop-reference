import { useBreakpointValue } from "@chakra-ui/react";
import Hero from "../components/hero";
import Login from "../components/login";
import Article from "../components/article";
import MobileNavMenu from "../components/navigation/mobilenavmenu";
import Header from "../components/navigation/desktopheader";
import { useAuth } from "../context/AuthContext";
import Landing from "../components/landing";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn ?? false;
  console.log("Logged In:", isLoggedIn);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/articles");
        setArticles(response.data.articles);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <>
      {isLoggedIn ? (
        //true
        <>
          {isMobile ? <MobileNavMenu /> : <Header />}
          <Landing />
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
