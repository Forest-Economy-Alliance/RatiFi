import {request} from './APICentral';

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

export const patchClaimHandlerIFR = data => {
  return request(
    '/ifr-claims',
    {
      method: 'PATCH',
      data,
    },
    false,
    false,
  );
};

export const fetchClaimDetailsHandler = data => {
  return request(
    '/claims-by-id',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const fetchClaimDetailsHandlerIFR = data => {
  return request(
    '/ifr-claims-by-id',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const fetchClaimDetailsByFRCHandler = data => {
  return request(
    '/claims-by-frc',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};


export const IFRfetchClaimDetailsByFRCHandler = data => {
  return request(
    '/ifr-claims-by-frc',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const postClaimHandler = data => {
  return request(
    '/claims',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const postIFRClaimHandler = data => {
  console.log('called');
  return request(
    '/ifr-claims',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const patchClaimFieldsIFRHandler = data => {
  return request(
    '/ifr-claims-fields',
    {
      method: 'PATCH',
      data,
    },
    false,
    false,
  );
};
