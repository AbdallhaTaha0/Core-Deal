export type User = {
  _id : string;
  name : string,
  email : string,
  phone? : string,
  address? : string,
  role : string,
  createdAt: string,
  updatedAt: string
}


export type LoginData = {
  email: string,
  password: string
}


export type RegisterData={
  name:string,
  email:string,
  password:string,
  phone?:string,
  address?:string
}
