import ky from 'ky';

const client = (bearer: string | undefined) => {
  return ky.create({
    prefixUrl: 'http://127.0.0.1:8000/api/',
    headers: {
      Authorization: bearer ? `Bearer ${bearer}` : ''
    },
    credentials: 'include' // if needed
  });
};

export { client };
