import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_DATA = 'GET_DATA'


/**
 * INITIAL STATE
 */
const data = []

/**
 * ACTION CREATORS
 */
const getData = data => ({type: GET_DATA, data})


/*
REDUCER
*/

export default function (state = [], action) {
    switch(action.type) {
        case GET_DATA:
            return action.data
        default:
            return state
    }
}


/**
 * THUNK CREATORS
 */
export const retrieveThreads = (dispatch) => 
  dispatch =>
    axios.get('/api/data')
      .then(res => res.data)
      .then((apiReturn) => {
          var threads = apiReturn.data.children;
          var arr = []
          threads.map((thread) => {
              var newThread = {
                  id: thread.data.id,
                  title: thread.data.title,
                  ups: thread.data.ups,
                  link: thread.data.url
              }
              arr.push(newThread)
          })
          dispatch(getData(arr))
      })
      .catch(err => console.log(err))
