import 'dotenv/config'
import 'reflect-metadata'

import { createConnection } from 'typeorm'

import createConnectionOptions from './db/createConnectionOptions'
import { User } from './db/entities/User'

createConnection(createConnectionOptions())
  .then(async connection => {
    console.log('connected? ', connection.isConnected)
    console.log('connection name: ', connection.name)

    // const user = new User()
    // user.firstName = 'Jim'
    // user.lastName = 'Test'
    // user.email = 'test@example.com'
    // user.passwordHash =
    //   '{"hash":"3gu8+o5O700AepD2uwNSoKZx154Qgs6MDBjH2WWVsM3D/I3+ygU9Jt1TIshdoQPh7lrfP004qDKy3BVLFEZf1jOQ","salt":"oiGrNUBF9T4aVNHX+XFmVv3v13aWr9t6vmZaWE79eTAslSHGYNKnvceGQi14emP+SY8eK3IPz4bTwYMVPw6UT+oM","keyLength":66,"hashMethod":"pbkdf2","iterations":536575}'
    // await user.save()
    // console.log('User: ', user)
    // const users = await User.find()
    // console.log('users: ', users)
  })
  .catch(err => console.log('Error connecting: ', err))
