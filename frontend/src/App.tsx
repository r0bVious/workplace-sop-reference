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
  const [adminMode, setAdminMode] = useState(null);
  const [articleListChanged, setArticleListChanged] = useState(false);

  const handleNavButtonClick = (articleHeader, articleContent) => {
    setSelectedArticle({ articleHeader, articleContent });
    setDisplayArticle(true);
  };

  const handleAdminModeChange = (mode) => {
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

  return (
    <>
      {isLoggedIn && adminMode ? (
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
                <>
                  <Landing />
                </>
              )}
              <MobileNavMenu
                articles={articles}
                handleNavButtonClick={handleNavButtonClick}
                handleAdminModeChange={setAdminMode}
                isMobile={isMobile}
              />
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
