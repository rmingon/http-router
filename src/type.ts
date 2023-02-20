import http from "http";
export interface Req extends http.IncomingMessage {
  body?: any
}
export interface Res extends http.ServerResponse {}