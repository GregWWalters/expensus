import credential from 'credential'

const pw = credential()

export const hashPassword = async password => pw.hash(password)

export const verifyPassword = async (hash, password) =>
  pw.verify(hash, password)
