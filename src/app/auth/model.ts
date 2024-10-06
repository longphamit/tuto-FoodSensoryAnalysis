import {DefaultSession} from "next-auth";

export interface TutoSession extends DefaultSession{
    authorities: Array<string>;
}
