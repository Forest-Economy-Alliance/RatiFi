import React from 'react';

import axios from 'axios';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {getGCPUrlImageHandler} from '../services/commonService';

function BoostrapQueue() {
  const [bit, setBit] = useState(false);
  const {} = useSelector(state => state?.appUtil);

  //if local cache image path, get the url and initiate the callback

  const action = async data => {

    


    return await getGCPUrlImageHandler({
      fileName: 'Hello',
      base64Data: data?.base64,
      isPdf: false,
      userId: data?._id,
    });
  };

  useEffect(() => {
    if (queue?.length) {
      action()
        .then(res => {
          // remove form queue
          setBit(e => !e);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [bit]);

  return <View />;
}

export default BoostrapQueue;
