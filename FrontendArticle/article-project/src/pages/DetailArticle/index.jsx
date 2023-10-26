import React from 'react'
import { useSelector } from 'react-redux'
import Nav from "../../componentPage/Nav";
import Footer from "../../componentPage/Footer";

const DetailArticle = () => {
    const {data} = useSelector(state => state.detailArticleReducer)
  return (<>
  <Nav></Nav>
  <div>
  <img src={data[0].article_photo} alt="" />
  <h1>{data[0].article_name}</h1>
  <p>{data[0].article_detail}</p>
  </div>

  <Footer></Footer>
  </>

  )
}

export default DetailArticle