'use strict';
console.log('helper.js file was loaded');

const baseUrl = 'http://localhost:3000/api';
export const authUrl = `${baseUrl}/auth`;
export const rolsUrl = `${baseUrl}/user_roles`;

//  hellper fetch function
export async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      throw {
        status: resp.status,
        msg: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}
