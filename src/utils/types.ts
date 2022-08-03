export type DataForm = {
    id?: number;
    title: string;
    content: string;
    lat: string;
    long: string;
  };
  
  export type ApiRequest = {
    endPoint: string,
    method: string,
    headers?: any,
    body?: string,
    id?: string
  }
