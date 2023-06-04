import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

interface JwtPayload {
  role: string
}

export default function (role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY as Secret
      ) as JwtPayload
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'No access' })
      }
      req.user = decoded
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
