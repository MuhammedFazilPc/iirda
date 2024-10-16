// lib/session.ts
import {SessionOptions} from 'iron-session'

export const sessionOptions:SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: 'myAppSession',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};


