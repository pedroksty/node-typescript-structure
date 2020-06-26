import bcript from 'bcryptjs'

export default function (password: string, password_hash) {
  return bcript.compare(password, password_hash)
}