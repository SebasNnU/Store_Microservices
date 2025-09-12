import { decrypt } from "@/utils/encrypt.service";

export function authMiddleware(req: any, res: any, next: any) {
    const authHeader: string = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No hay token' });
    }
    
    const token = authHeader;
    console.log(token);
    if (!token || !decrypt(token)) {
        return res.status(401).json({ message: 'Token Invalido' });
    }

    next();
}