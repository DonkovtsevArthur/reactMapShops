declare namespace AppMain {
  interface Action {
    type: string;
  }
  interface Response {
    status: string;
    message?: string;
  }
}