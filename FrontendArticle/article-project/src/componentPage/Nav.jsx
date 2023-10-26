import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticle, getArticle } from "../redux/action/article";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    article_name: "",
    article_detail: "",
    article_photo: "",
  });
  const [imageData, setImageData] = useState();

  const handlerPost = async (event) => {
    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("article_name", inputData.article_name);
    bodyFormData.append("article_detail", inputData.article_detail);
    bodyFormData.append("article_photo", imageData);

    console.log(bodyFormData);
await dispatch(addArticle(bodyFormData));
dispatch(getArticle())
  };

  const changePostData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  };

  const changeImagePost = (e) => {
    setImageData(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        article_photo: URL.createObjectURL(e.target.files[0]),
      });
    console.log(e.target.files);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/articles"}>
            <img
              src="https://res.cloudinary.com/dafjb9vn7/image/upload/v1698210596/arts_yszshb.png"
              width={30}
              className="d-inline-block"
            />
            My Articles
          </Link>
          <div className="navbar-nav">
            <button
              type="button"
              className="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#PostArticle"
            >
              Post
            </button>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="PostArticle"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="ModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="modal-title" id="ModalTitle">
                  Post Article
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handlerPost}>
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    name="article_photo"
                    onChange={changeImagePost}
                    className="form-control-file p-5"
                    accept=".jpg, .png"
                    required
                  />
                </div>
                <div className="form-floating mb-3 ">
                  <input
                    name="article_name"
                    value={inputData.article_name}
                    onChange={changePostData}
                    type="text"
                    className="form-control no-outline"
                    id="floatingTitle"
                    placeholder="Article Title"
                    required
                  />
                  <label htmlFor="floatingTitle">Article Title</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    name="article_detail"
                    value={inputData.article_detail}
                    onChange={changePostData}
                    type="text"
                    className="form-control"
                    id="floatingDesc"
                    placeholder="Desc"
                    required
                  />
                  <label htmlFor="floatingDesc">Description</label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
