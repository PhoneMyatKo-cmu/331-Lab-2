import router from '@/router'
import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/PhoneMyatKo-cmu/331-db-repo',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      router.push({ name: 'network-error-view' })
    }
    return Promise.reject(error)
  },
)
export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
}
