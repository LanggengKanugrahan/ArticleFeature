const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError:false
}

const postPutArticleReducer = (state=initialState,action) => {
    if(action.type === 'ARTICLES_ADD_PENDING'){
        return{
            ...state,
            isLoading: true,
        }
    } else if(action.type === 'ARTICLES_ADD_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            isLoading:false,
            errorMessage:'',
            isError:false
        }
    } else if(action.type === 'ARTICLES_ADD_FAILED'){
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else {
        return state
    }
}

export default postPutArticleReducer