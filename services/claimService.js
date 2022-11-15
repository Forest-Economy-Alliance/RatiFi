export const patchClaimHandler = data => {
    return request(
      '/send-otp',
      {
        method: 'PATCH',
        data,
      },
      false,
      false,
    );
  };