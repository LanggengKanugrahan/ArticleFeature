import axios from "axios";

export const deleteArticle = (id) => async (dispatch) => {
    try {
      console.log("tes");
      dispatch({ type: "ARTICLES_DELETE_PENDING" });
      const result = await axios.delete(
        `http://localhost:3000/articles/${id}`
      );
      console.log("data");
      console.log(result);
      dispatch({ payload: result.data.data, type: "ARTICLES_DELETE_SUCCESS" });
    } catch (err) {
      console.log("error");
      dispatch({
        payload: err.response.data.message,
        type: "ARTICLES_DELETE_FAILED",
      });
      console.log(err);
    }
  };
  
  export const addArticle = (bodyFormData) => async (dispatch) => {
    try {
      console.log("tes");
      dispatch({ type: "ARTICLES_ADD_PENDING" });
      const result = await axios.post(
        "http://localhost:3000/articles",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ payload: result.data.data, type: "ARTICLES_ADD_SUCCESS" });
    } catch (err) {
      dispatch({
        payload: err.response.data.message,
        type: "ARTICLES_ADD_FAILED",
      });
    }
  };
  
  export const detailArticle = (navigate, id) => async (dispatch) => {
    try {
      console.log("tes");
      dispatch({ type: "ARTICLES_DETAIL_PENDING" });
      const result = await axios.get(
        `http://localhost:3000/articles/${id}`,
      );
      console.log("data");
      console.log(result);
      dispatch({ payload: result.data.data, type: "ARTICLES_DETAIL_SUCCESS" });
      navigate(`/articles/${id}`)
    } catch (err) {
      console.log("error");
      dispatch({
        payload: err.response.data.message,
        type: "ARTICLES_DETAIL_FAILED",
      });
      console.log(err);
    }
  };
  
  export const getArticle = () => async (dispatch) => {
    try {
      console.log("tes");
      dispatch({ type: "ARTICLES_GET_PENDING" });
      const result = await axios.get(
        `http://localhost:3000/articles`
      );
      console.log("data");
      console.log(result);
      dispatch({ payload: result.data.data, type: "ARTICLES_GET_SUCCESS" });
    } catch (err) {
      console.log("error");
      dispatch({
        payload: err.response.data.message,
        type: "ARTICLES_GET_FAILED",
      });
      console.log(err);
    }
  };
  
  export const updateArticle = (id, bodyFormData) => async (dispatch) => {
    try {
      console.log("tes");
      dispatch({ type: "ARTICLES_UPDATE_PENDING" });
      const result = await axios.put(
        `http://localhost:3000/articles/${id}`,
        bodyFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("data");
      console.log(result);
      dispatch({ payload: result.data.data, type: "ARTICLES_UPDATE_SUCCESS" });
    } catch (err) {
      console.log("error");
      dispatch({
        payload: err.response.data.message,
        type: "ARTICLES_UPDATE_FAILED",
      });
      console.log(err);
    }
  };
  