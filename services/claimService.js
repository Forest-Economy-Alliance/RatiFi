import { request } from "./APICentral";

export const patchClaimHandler = data => {
  return request(
    '/claims',
    {
      method: 'PATCH',
      data,
    },
    false,
    false,
  );
};


export const fetchClaimDetailsHandler = data => {

  return request('/claims-by-id', {
    method: 'POST',
    data
  },
    false,
    false)

}

export const fetchClaimDetailsByFRCHandler = data => {

  return request('/claims-by-frc', {
    method: 'POST',
    data
  },
    false,
    false)

}

export const postClaimHandler = data => {
  return request('/claims', {
    method: "POST",
    data
  },
    false,
    false)
}


