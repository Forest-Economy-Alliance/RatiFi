import { fetchClaimDetailsHandler } from "../../services/claimService";











export const fetchClaimDetailsByIdAction=(data,callback)=>dispatch=>{
    dispatch({type: 'ENABLE_LOADING'});
    console.log("GOING_MAIN");
    return  fetchClaimDetailsHandler(data)
    .then(async({data:response})=>{
        console.log("RRX",response.data);

        dispatch({type:"SAVE_CLAIM",payload:response.data})
        dispatch({type: 'DISABLE_LOADING'});
    })
    .catch(err=>{
        console.log(err);
        dispatch({type: 'DISABLE_LOADING'});
    })


}