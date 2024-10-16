// types/iron-session.d.ts
import 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      mobile: string;
      role: string; // Add any other properties you need
    };
  }
}
