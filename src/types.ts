export interface Event {
  id?: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petAllowed: boolean
  organizer: string
  images: string[]
}

export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: string
  penAmount: number
  description: string
}

export interface Organizer {
  id?: number
  name: string
  address: string
  imageUrl: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}

export interface OrganizerState {
  organizer: Organizer | null
}
