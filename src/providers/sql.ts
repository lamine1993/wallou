import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

const DB_NAME: string = '__wallu';
const win: any=window;

@Injectable()
export class Sql {
  private _dbPromise: Promise<any>;

  constructor(public platform: Platform ) {
      this._dbPromise= new Promise<any>((resolve, reject)=>{
        let db:any;
        this.platform.ready().then(()=>{
          
            if(this.platform.is('cordova')&& win.sqklitePlugin){
                db = win.sqlitePlugin.openDatabase({
                    name: DB_NAME,
                    location: 'default',
                  });
            }else{
              console.log("error: verifier si le plugin stglit est installer");
              
              db = win.openDatabase('__wallu', '1.0', 'Data', 5 * 1024 * 1024);
             }
            resolve(db);
        }).catch((err)=>{
           reject({err:JSON.stringify(err)});
        })
      });
      this._tryInit();
  }

  _tryInit() {
    this.query('CREATE TABLE IF NOT EXISTS kv (key TEXT, value TEXT)').catch(err => {
      console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
    });
  }

  query(query: string, params:any[]=[]):Promise<any>{
      return new Promise((resolve, reject)=>{
        try{
            this._dbPromise.then(db=>{
                db.transaction((tx:any)=>{
                   tx.executeSql(query, params, (tx:any, res:any)=>resolve({tx: tx, res:res}), (tx:any, err:any)=>reject({tx: tx, err:err}))
                }, (err: any)=>reject({err:err}))
          });
        } catch(err){
            reject({err : err});
        }
       });
    }

    set(key: string, value: string): Promise<any> {
     return this.query('insert or replace into kv(key, value) values (?, ?)', [key, value]);
    }

    get(key: string): Promise<any> {
    return this.query('select key, value from kv where key = ? limit 1', [key]).then(data => {
      if (data.res.rows.length > 0) {
        return data.res.rows.item(0).value;
      }
    });
  }

    getJson(key: string): Promise<any> {
    return this.get(key).then(value => {
      try {
        return JSON.parse(value);
      } catch (e) {
        throw e; // rethrowing exception so it can be handled with .catch()
      }
    });
  }

  setJson(key: string, value: any): Promise<any> {
    try {
      return this.set(key, JSON.stringify(value));
    } catch (e) {
      return Promise.reject(e);
    }
  }

    remove(key: string): Promise<any> {
    return this.query('delete from kv where key = ?', [key]);
  }
  
  clear(): Promise<any> {
    return this.query('delete from kv');
  }
}
