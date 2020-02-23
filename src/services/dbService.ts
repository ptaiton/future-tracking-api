import { createConnection as createMysqlConnection, Connection } from 'mysql'
import { config } from './configService'

let connection: Connection

export default (() => {
  connection = createMysqlConnection({
    insecureAuth : true,
    host     : config.MYSQL_HOST,
    user     : config.MYSQL_USER,
    password : config.MYSQL_PASSWORD,
    database : 'recipe',
  });
 
  connection.connect()
  return connection
})()

export const query = <T>(sqlQuery: string) => {
  return new Promise<T>((resolve, reject) => {
    connection.query(sqlQuery, (error, results) => {
      if(error) {
        console.log(error)
        reject(error)
      }

      resolve(results)
    })
  })
}