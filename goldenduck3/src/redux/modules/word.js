import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

//초기값
const initialState = {
    word_list: []
}

//액션
const LOAD_WORD = 'word/LOAD_WORD'
const ADD_WORD = 'word/ADD_WORD'
const UPDATE_WORD = 'word/UPDATE_WORD'
const DELETE_WORD = 'word/DELETE_WORD'

//액션생성함수
export const loadWordList = (user_word) => {
    return {type : LOAD_WORD, user_word}
}
export const addWordList = (user_word) => {
    return {type : ADD_WORD, user_word}
}
export const updateWordList = (word_id) => {
    return {type : UPDATE_WORD, word_id}
}
export const deleteWordList = (word_id) => {
    return {type : DELETE_WORD, word_id}
}

//미들웨어

//파이어베이스 값 가져오는 미들웨어
export const loadWordListFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, "wordlist"));
    let load_word_list = [];
    word_data.forEach((w) => {
      load_word_list.push({id: w.id, ...w.data() });
    });
    dispatch(loadWordList(load_word_list));
  };
};


//파이어베이스 값 추가하는 미들웨어
export const addWordListFB = (user_word) => {
  return async function(dispatch){
    const docRef = await addDoc(collection(db, "wordlist"), user_word);
    const add_word_data = {id: docRef.id, ...user_word};
    dispatch(addWordList(add_word_data))
}
}

//파이어베이스 값 수정하는 미들웨어
export const updateWordListFB = (word) => {
  return async function(dispatch, getState){
      const docRef = doc(db, 'wordlist', word.id);
      await updateDoc(docRef, {name : word.name, mean : word.mean, ex : word.ex, anal : word.anal});

      const _word_list = getState().word.word_list;
      const update_word_list = _word_list.findIndex((w)=>{
          return w.id === word.id;
      });
      dispatch(updateWordList(update_word_list));
  }
}

//파이어베이스 값 삭제하는 미들웨어
export const deleteWordListFB = (word_id) => {
  return async function(dispatch, getState){
      const docRef = doc(db, 'wordlist', word_id);
      await deleteDoc(docRef);

      const _word_list = getState().word.word_list;
      const delete_word_list = _word_list.findIndex((w)=>{
          return w.id === word_id;
      });
      dispatch(deleteWordList(delete_word_list));
  }
}

//리듀서
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case "word/LOAD_WORD": {
          return {word_list : action.user_word};
      }

      case "word/ADD_WORD": {
        const new_word_list = [...state.word_list, action.user_word];
        console.log(new_word_list)
        return { word_list: new_word_list };
      }

      case "word/UPDATE_WORD" : {
        const update_new_word = state.word_list.map((a, i) => {
            if(action.word_id === a){
                return action.word_id
            }else{
                return a;
            }
           })
             return {...state, list: update_new_word};
    }

      case "word/DELETE_WORD": {
           const new_word_list = state.word_list.filter((a,i)=>{
             return parseInt(action.word_id) !==i;
           });
           return {word_list: new_word_list};
       }
  
      default:
        return state;
    }
  }
