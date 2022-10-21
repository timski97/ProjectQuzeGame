import {getScreens} from '../../../Utilites/Network';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = () => {
  try {
    return async dispatch => {
      const result = await getScreens();
      // const json=await result.json()
      if (result) {
        dispatch({
          type: GET_QUESTIONS,
          payload: result,
        });
        // console.log(result)
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log(error);
  }
};
