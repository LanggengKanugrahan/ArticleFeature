import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteArticle,
  detailArticle,
  getArticle,
  updateArticle,
} from "../redux/action/article";

const ArticleCard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getArticleReducer);

  useEffect(() => {
    dispatch(getArticle());
  }, []);

  const [imageUpdate, setImageUpdate] = useState();
  const [getId, setId] = useState(null);
  const [updateData, setUpdateData] = useState({
    article_name: "",
    article_detail: "",
    article_photo: "",
  });
  const handlerUpdate = (event,id) => {
    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("article_name", updateData.article_name);
    bodyFormData.append("article_detail", updateData.article_detail);
    bodyFormData.append("article_photo", imageUpdate);

    console.log(bodyFormData);
    dispatch(updateArticle(getId, bodyFormData));
  };

  const changeUpdateData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    console.log(updateData);
  };
  const changeImageUpdate = (e) => {
    setImageUpdate(e.target.files[0]);
    e.target.files[0] &&
      setUpdateData({
        ...updateData,
        article_photo: URL.createObjectURL(e.target.files[0]),
      });
    console.log(e.target.files);
  };

  console.log(data);
  return (
    <>
      <div className="container-fluid d-flex flex-wrap">
        {data &&
          data.map((item, index) => {
            return (
              <div key={item.id}>
                <div className="card m-2" style={{ width: 200 }}>
                  <img
                    src={item.article_photo}
                    className="card-img-top"
                    alt={item.article_name}
                    onClick={() => dispatch(detailArticle(navigate, item.id))}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="card-body px-0 py-2">
                    <h5 className="card-title px-2">{item.article_name}</h5>
                    <div className="d-flex justify-content-evenly">
                      <Link
                        data-bs-toggle="modal"
                        data-bs-target="#PutArticle"
                        className="btn btn-primary"
                        onClick={()=>setId(item.id)}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-danger"
                        onClick={async () => {
                          await dispatch(deleteArticle(item.id));
                          dispatch(getArticle());
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="PutArticle"
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
                            Update Article
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form onSubmit={handlerUpdate}>
                          <div className="form-floating mb-3">
                            <input
                              type="file"
                              name="article_photo"
                              onChange={changeImageUpdate}
                              className="form-control-file p-5"
                              accept=".jpg, .png"
                            />
                          </div>
                          <div className="form-floating mb-3 ">
                            <input
                              name="article_name"
                              value={updateData.article_name}
                              onChange={changeUpdateData}
                              type="text"
                              className="form-control no-outline"
                              id="floatingTitle"
                              placeholder="Article Title"
                            />
                            <label htmlFor="floatingTitle">Article Title</label>
                          </div>
                          <div className="form-floating mb-3">
                            <textarea
                              name="article_detail"
                              value={updateData.article_detail}
                              onChange={changeUpdateData}
                              type="text"
                              className="form-control"
                              id="floatingDesc"
                              placeholder="Desc"
                            />
                            <label htmlFor="floatingDesc">Description</label>
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ArticleCard;
