// Override de tipos
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
