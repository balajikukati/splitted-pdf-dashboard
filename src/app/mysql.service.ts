import { Injectable } from '@angular/core';
import * as mysql from 'mysql';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  // private connection!: mysql.Connection;

  // constructor() {
  //   this.connect();
  // }

  // private connect() {
  //   this.connection = mysql.createConnection({
  //     host: '192.168.7.223',
  //     port: 3306,
  //     user: 'dbadmin',
  //     password: 'Nakul#$2607',
  //     database: 'ideDemoNew'
  //   });

  //   this.connection.connect((err) => {
  //     if (err) {
  //       console.error('Error connecting to MySQL:', err);
  //       throw err;
  //     }
  //     console.log('Connected to MySQL database');
  //   });
  // }

  // query(sql: string, values?: any[]): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.connection?.query(sql, values, (err, results) => {
  //       if (err) {
  //         console.error('Error querying MySQL:', err);
  //         reject(err);
  //         return;
  //       }
  //       resolve(results);
  //     });
  //   });
  // }

  // close() {
  //   this.connection?.end((err) => {
  //     if (err) {
  //       console.error('Error closing MySQL connection:', err);
  //       throw err;
  //     }
  //     console.log('MySQL connection closed');
  //   });
  // }
}
