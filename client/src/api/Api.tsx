//import { URLSearchParams } from 'url'

const API_URL: string = 'http://localhost:5000/api'

export default class Api {
  static async get(route: string, params: object) {
    /* const response = await fetch(API_URL + '?' + new URLSearchParams({ ...params }), {
      mode: 'no-cors',
    })
    return response.json() */

    return fetch(API_URL + route + '?' + new URLSearchParams({ ...params }))
      .then(response => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        throw error
      })
    }
}