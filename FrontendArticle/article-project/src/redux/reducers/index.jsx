import { combineReducers } from "redux";
import postPutArticleReducer from "./postPutArticle";
import getArticleReducer from "./getArticle";
import detailArticleReducer from "./detailArticle";

const rootReducers = combineReducers({
    postPutArticleReducer,
    getArticleReducer,
    detailArticleReducer,

})

export default rootReducers