import { useBreakpointValue } from "@chakra-ui/react";
import Hero from "../components/hero";
import Article from "../components/article";
import Login from "../components/login";
import MobileNavMenu from "../components/navigation/mobilenavmenu";
import Header from "../components/navigation/desktopheader";
import { useAuth } from "../context/AuthContext";
import Landing from "../components/landing";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn ?? false;
  const isAdmin = auth?.isAdmin ?? false;
  console.log("App Logged In:", isLoggedIn);
  console.log("App Admin check:", isAdmin);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [articles, setArticles] = useState([]);
  const [displayArticle, setDisplayArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({
    articleHeader: "",
    articleContent: "",
  });
  const [comments, setComments] = useState([]);

  const handleNavButtonClick = (articleHeader, articleContent) => {
    setSelectedArticle({ articleHeader, articleContent });
    setDisplayArticle(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/articles");
        setArticles(response.data.articles);
        console.log("Articles", response.data.articles);
        setComments(response.data.comments);
        console.log("Comments", response.data.comments);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    } // Call the fetchData function when the component mounts
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        //true
        <>
          {displayArticle ? (
            <Article
              articleHeader={selectedArticle.articleHeader}
              articleContent={selectedArticle.articleContent}
              comments={comments}
            />
          ) : (
            <Landing />
          )}
          {isMobile ? (
            <MobileNavMenu
              articles={articles}
              handleNavButtonClick={handleNavButtonClick}
            />
          ) : (
            <Header />
          )}
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
