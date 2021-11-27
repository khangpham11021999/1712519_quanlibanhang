const mysql = require('mysql');
const config = require('../config/default.json');

module.exports ={
    load: function(sqlStatement){
        const connection=mysql.createConnection(config.mysql);
        return new Promise((resolve, reject) =>{
            connection.query(sqlStatement,function(err,result){
                if(err){
                   connection.end();
                   return reject(err);
                }
                else{
                   connection.end();
                   return resolve(result);
                }
            })
        })
    },
    add:function(table,entity){
        const connection=mysql.createConnection(config.mysql);
        let sqlStatement=`insert into ${table} set ?`;
        return new Promise((resolve, reject)=>{
            connection.query(sqlStatement,entity,function(err,result){
                if(err){
                    connection.end();
                    return reject(err);
                }
                else{
                    connection.end();
                    return resolve(result);
                }
            })
        })
    },

    patch: function(table,entity,condition){
        const connection=mysql.createConnection(config.mysql);
        let sqlStatement=`update ${table} set ? where ?`;
        return new Promise((resolve, reject)=>{
            connection.query(sqlStatement,[entity,condition],function(err,result){
                if(err){
                    connection.end();
                    return reject(err);
                }
                else{
                    connection.end();
                    return resolve(result);
                }
            })
        })
    },

    del: function(table,condition){
        const connection=mysql.createConnection(config.mysql);
        let sqlStatement=`delete from ${table} where ?`;
        return new Promise((resolve, reject)=>{
            connection.query(sqlStatement,condition,function(err,result){
                if(err){
                    connection.end();
                    return reject(err);
                }
                else{
                    connection.end();
                    return resolve(result);
                }
            })
        })
    }
}