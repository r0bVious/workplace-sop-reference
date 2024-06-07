import { useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import Hero from "../components/hero";
import Article from "../components/article";
import Login from "../components/login";
import MobileNavMenu from "../components/navigation/mobilenavmenu";
import ArticleEditor from "../components/article-editor";
import UserEditor from "../components/user-editor";
import Landing from "../components/landing";
import { useAuth } from "../context/AuthContext";
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
  const [adminMode, setAdminMode] = useState("");
  const [articleListChanged, setArticleListChanged] = useState(false);

  const handleNavButtonClick = (
    articleHeader: string,
    articleContent: string
  ) => {
    setSelectedArticle({ articleHeader, articleContent });
    setDisplayArticle(true);
  };

  const handleHomeButtonClick = () => {
    setDisplayArticle(false);
  };

  const handleAdminModeChange = (mode: string) => {
    setAdminMode(mode);
  };

  const handleArticleListChanged = () => {
    setArticleListChanged(!articleListChanged);
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
    }
  }, [isLoggedIn, articleListChanged]);

  const desktopModeStyles = {
    background: "#333A3F",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const desktopStyles = {
    padding: "5rem",
    minWidth: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    maxWidth: "75%",
    margin: "0 auto",
    boxShadow: "5px 5px 10px black",
  };

  return (
    <>
      {isLoggedIn && adminMode.length ? (
        adminMode === "articles" ? (
          <ArticleEditor
            handleAdminModeChange={handleAdminModeChange}
            handleArticleListChanged={handleArticleListChanged}
            articles={articles}
            isMobile={isMobile}
          />
        ) : (
          <UserEditor
            handleAdminModeChange={handleAdminModeChange}
            isMobile={isMobile}
          />
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
                  isMobile={isMobile}
                />
              ) : (
                <div style={!isMobile ? desktopModeStyles : {}}>
                  <div
                    style={
                      !isMobile
                        ? {
                            ...desktopStyles,
                            flexDirection: "column",
                            maxWidth: "30%",
                          }
                        : {}
                    }
                  >
                    <Landing />
                  </div>
                </div>
              )}
              <MobileNavMenu
                articles={articles}
                handleNavButtonClick={handleNavButtonClick}
                handleHomeButtonClick={handleHomeButtonClick}
                handleAdminModeChange={setAdminMode}
                isMobile={isMobile}
              />
            </>
          ) : (
            //false
            <div style={!isMobile ? desktopModeStyles : {}}>
              <div style={!isMobile ? desktopStyles : {}}>
                <Hero />
                <Login />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
