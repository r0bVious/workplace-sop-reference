import { useBreakpointValue } from "@chakra-ui/react";
import Hero from "../components/hero";
import Article from "../components/article";
import Login from "../components/login";
import MobileNavMenu from "../components/navigation/mobilenavmenu";
import Header from "../components/navigation/desktopheader";
import { useAuth } from "../context/AuthContext";
import Landing from "../components/landing";
import { useState, useEffect } from "react";
import ArticleEditor from "../components/article-editor";
import UserEditor from "../components/user-editor";
import { getArticles } from "../helpers/api-communicator.ts";

function App() {
  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn ?? false;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [articles, setArticles] = useState([]);
  const [displayArticle, setDisplayArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({
    articleHeader: "",
    articleContent: "",
  });
  const [comments, setComments] = useState([]);
  const [adminMode, setAdminMode] = useState(null);

  const handleNavButtonClick = (articleHeader, articleContent) => {
    setSelectedArticle({ articleHeader, articleContent });
    setDisplayArticle(true);
  };

  const handleAdminModeChange = (mode) => {
    setAdminMode(mode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArticles();
        setArticles(response.articles);
        setComments(response.comments);
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
      {isLoggedIn && adminMode ? (
        adminMode === "articles" ? (
          <ArticleEditor handleAdminModeChange={handleAdminModeChange} />
        ) : (
          <UserEditor handleAdminModeChange={handleAdminModeChange} />
        )
      ) : (
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
                <>
                  <Landing />
                </>
              )}
              {isMobile ? (
                <MobileNavMenu
                  articles={articles}
                  handleNavButtonClick={handleNavButtonClick}
                  handleAdminModeChange={setAdminMode}
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
      )}
    </>
  );
}

export default App;
