import {loginHandler} from '../../services/authService';

export const postTasAction = (data, callback) => {
  return loginHandler(data)
    .then(res => {
      if (callback) {
        callback(true);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
