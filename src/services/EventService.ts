import router from '@/router'
import apiClient from './AxiosClient'
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
  saveEvent(event: Event) {
    return apiClient.post('/events', event)
  },
  getEventsByKeyword(keyword: string, perPage: number, page: number): Promise<AxioResponse<Event>> {
    return apiClient.get<Event>('events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
}
