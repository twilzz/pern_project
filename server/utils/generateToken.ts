import jwt, { Secret } from 'jsonwebtoken'

export const generateJwt = (id: number, email: string, role: string) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY as Secret, {
    expiresIn: '24h',
  })
}
