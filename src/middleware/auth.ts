import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  userId: string;
  walletAddress: string;
}

export const verifyAuth = (request: NextRequest): AuthUser | null => {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return null;
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as AuthUser;
    
    return decoded;
  } catch (error) {
    return null;
  }
};

export const requireAuth = (request: NextRequest): AuthUser => {
  const user = verifyAuth(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
};

