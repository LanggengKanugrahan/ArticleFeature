import React from "react";
import Nav from "../../componentPage/Nav";
import Footer from "../../componentPage/Footer";
import ArticleCard from "../../componentPage/ArticleCard";


const ListArticles = () => {
  return (
    <>
      <Nav></Nav>

      <main id="ListArticle" className="p-2">
        <ArticleCard></ArticleCard>
      </main>

      <Footer></Footer>
    </>
  );
};

export default ListArticles;
