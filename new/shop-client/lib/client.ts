import ky from 'ky';

const client = (bearer: string | undefined) => {
  return ky.create({
    prefixUrl: `${process.env.API_URL}/api/`,
    headers: {
      Authorization: bearer ? `Bearer ${bearer}` : ''
    },
    credentials: 'include' // if needed
  });
};

export { client };
