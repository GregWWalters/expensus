interface ServerConfiguration {
  database: {
    type: 'postgres'
    host: string
    name: string
    password: string

    port: number
    username: string
  }
  server: {
    port: number
    secret: string
  }
  plaid: {
    id: string
    public: string
    secret: string
    url: string
    env: string
  }
}

function fetchVar(key: string, defaultValue?: string): string {
  const value = process.env[key]

  if (!value) {
    if (defaultValue !== undefined) return defaultValue

    throw new Error(`process.env.${key} is missing`)
  }

  return value
}

const config: ServerConfiguration = {
  database: {
    type: 'postgres',
    host: fetchVar('DB_HOST'),
    name: fetchVar('DB_NAME'),
    password: fetchVar('DB_PASSWORD', ''),
    port: Number(fetchVar('DB_PORT', '5432')),
    username: fetchVar('DB_USERNAME'),
  },
  server: {
    port: Number(fetchVar('SERVER_PORT', '8130')),
    secret: fetchVar('JWT_SECRET'),
  },
  plaid: {
    id: fetchVar('PLAID_API_CLIENT_ID', ''),
    public: fetchVar('PLAID_API_KEY', ''),
    secret: fetchVar('PLAID_API_SECRET', ''),
    url: fetchVar('PLAID_API_URL', 'https://sandbox.plaid.com'),
    env: fetchVar('PLAID_API_ENV', 'sandbox'),
  },
}

export default config
