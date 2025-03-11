import { Support } from "./support";

// usuario para mostrar el detalle
export interface BigUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    support: Support;
}
