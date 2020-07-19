import {actions, profileReducer} from "./profileReducer";
import React from "react"
import {ProfileType} from "../types/types";

let action = actions.addPostActionCreator("it kama")
let state = {
  posts: [
    {id: 0, message: 'How are you?', likesCount: 102},
    {id: 1, message: 'It\'s my first post', likesCount: 65},
    {id: 2, message: 'WTF', likesCount: 215},
    {id: 3, message: 'Olala', likesCount: 25},
  ],
  profile: null,
  status: ""
}
let newState = profileReducer(state, action)

it('length of posts should be 5', () => {
  expect(newState.posts.length).toBe(5)
})

it('new post message  should be "it kama"', () => {
  expect(newState.posts[4].message).toBe("it kama")
})

