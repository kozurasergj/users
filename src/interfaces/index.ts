export interface IUsers {
  users: IUser[]
}

export interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  albums?: IAlbum[]
  posts?: IPost[]
}

export interface IAlbum {
  userId: number
  id: number
  title: string
}

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}
