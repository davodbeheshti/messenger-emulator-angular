export interface IContactUser {
  id: number;
  name: string;
  img: string;
  onlineDate: string;
}

export interface Contact {
  name: string;
  family: string;
  id: string;
}

export interface CurentUser extends users {}

export interface messages {
  clientMessage: true;
  id: string;
  message: string;
  timeMessage: string;
  pin : boolean;
  forwarded : string;
}

export interface users {
  name: string;
  family: string;
  phone: string;
  id: string;
  totalCountMessages: number;
  idLastMessage: string;
  lastSendMessage: string;
  messages: messages[];
  userSystem : boolean;
  pinMessage : string;
}
