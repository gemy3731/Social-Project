export interface Post {
    _id:string,
    body:string,
    image?:string,
    user:user,
    createdAt:string,
    comments:comment[],
    id:string,
}

export interface user {
    _id:string,
    name:string,
    photo:string,
}

export interface comment {
    _id:string,
    content:string
    commentCreator:user,
    post:string,
    createdAt:string,
}