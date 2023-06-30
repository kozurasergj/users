import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAlbum, IPost, IUsers } from '../../interfaces'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data
})

export const fetchAlbums = createAsyncThunk(
  'users/fetchAlbums',
  async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    )
    const data = await response.json()
    return data
  }
)

export const fetchPosts = createAsyncThunk(
  'users/fetchPosts',
  async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    )
    const data = await response.json()
    return data
  }
)

const initialState: IUsers = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sortByAcs: (state) => {
      state.users.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    },
    sortByDesc: (state) => {
      state.users.sort((a, b) => {
        if (a.name < b.name) {
          return 1
        }
        if (a.name > b.name) {
          return -1
        }
        return 0
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        const albums = action.payload
        albums.forEach((album: IAlbum) => {
          const userId = album.userId
          const user = state.users.find((user) => user.id === userId)
          if (user) {
            if (!user.albums) {
              user.albums = []
            }
            user.albums.push(album)
          }
        })
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const posts = action.payload
        posts.forEach((post: IPost) => {
          const userId = post.userId
          const user = state.users.find((user) => user.id === userId)
          if (user) {
            if (!user.posts) {
              user.posts = []
            }
            user.posts.push(post)
          }
        })
      })
  },
})

export const { sortByAcs, sortByDesc } = usersSlice.actions
export default usersSlice.reducer
