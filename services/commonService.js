import { request } from "./APICentral"




export const getGCPUrlImageHandler=data=>{
 
    return request('/get-gcp-url',{
      method:'POST',
      data
    },
    false,
    false)
  
  }