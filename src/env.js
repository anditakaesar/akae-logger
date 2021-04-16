export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = parseInt(process.env.PORT, 10) || 3000

export const env = {
  NODE_ENV,
  PORT,
}

export default env