var fs = require('fs');
var url = require('url');
var qs = require('querystring');
const properties = require('/web/properties.js');
var mysql = require('mysql');
const { PythonShell }  = require('python-shell');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config();


// TODO: 무조건 assigned_locker를 초기화 한 다음에 실행해 주세요
const assign_locker = (student_id, lockerNumber, connection) => {
  return new Promise(async (resolve, reject) => {
    // 일단 assigned_locker를 초기화 해야 함.
    

    // 일단 db에 추가하고자 하는 locker가 존재하는지 확인
    let isLockerExist = false;
    console.log('lockerNumber', lockerNumber);
    query = `select * from locker_info where locker = \"${lockerNumber}\"`
    await connection.query(query, async (err, result) => {
      if(err) {
        console.error(err);
        throw err;
      }
      if(result) {
        console.log(result);
        let floor;
        switch(lockerNumber.slice(0, 2)) {
          case 'B1':
            floor = -1;
          case 'L':
            floor = 1;
          case '3F':
            floor = 3;
        }

        query = `insert into assigned_locker(student_id, floor, locker) values(${student_id}, \"${floor}\", \"${lockerNumber}\")`
        await connection.query(query, (err, result) => {
          if(err) {
            console.error(err);
            throw err;
          }
          console.log(`${student_id}님 ${lockerNumber}사물함 배정완료 되었습니다.`);
          resolve('done');
        })
      } 
    });
  });
}


const pythonSpawn = (connection) => {
  const process = spawn('python', [path.resolve(__dirname, '../python/assign_locker.py')]);
  try {
    // 
    process.stdout.on("data", (data) => {
      const PythonMessage = data.toString();
      console.log('stdout', PythonMessage);
    });

    process.on('exit', (code) => {
      console.log(`child process exited with code ${code}`)
    });

    // 명령이 모두 실행됐다면 'close'이벤트가 실행.
    process.on('close', async (code) => {
      console.log(`child process close all stdio with code ${code}`)
      
      await fs.readFile(path.resolve(__dirname, './assignInfo.json'), async (err, data) => {
        if(err) {
          console.error(err);
          throw err;
        }
        
        // 여기서 student_id가 존재하는 배열만 살려준다.
        let assigned_locker = JSON.parse(data.toString());
        let filtered_assigned_locker = []
        assigned_locker.map((assignFloor) => {
          return assignFloor.filter((assignUser) => assignUser[0] != '0')
        })
        .filter((assignFloor) => assignFloor.length !== 0 )
        .map((assignFloor) => {
          assignFloor.map((assignUser) => {
            filtered_assigned_locker = [...filtered_assigned_locker, assignUser];
          })
        });



        // 이제 이 배정된 사물함 정보를 토대로 db에 쿼리문을 넣어준다.
        console.log('filtered_assigned_locker >> ', filtered_assigned_locker)
        // assigned_locker의 data form
        // console.log('targetFloor', targetFloor);
        await Promise.all(filtered_assigned_locker.map((assignUserInfo) => {
          console.log('assignUserInfo', assignUserInfo);
          const student_id = assignUserInfo[0];
          let locker = assignUserInfo[1];
          let locker_floor = locker.slice(0, 2);
          let locker_number = locker.slice(2);
          /**
           *  < 접두 >
           * B1 => 지하 1층
           * L1 => 1층
           * L3 => 3층 => 3F로 변경해야 함
           */
          if(locker_floor === 'L3') {
            locker_floor = '3F';
          }
          
          locker = locker_floor + '-' + parseInt(locker_number, 10).toString();
          return assign_locker(student_id, locker, connection)
        }));
      });
    });
  } catch(e) {
    console.error(e);
    throw e;
  } finally {
    // connection.close();
  }
}

const clearAssignedLocker = (connection) => {
  return new Promise((resolve, reject) => {
    let query = `select * from assigned_locker`;
    connection.query(query, (err, result) => {
      if(err) {
        console.error(err);
        throw err;
      }
      if(result) {
        result.map((userData) => {
          query = `delete from assigned_locker where student_id = ${userData.student_id}`;
          connection.query(query, (err, result) => {
            if(err) {
              console.error(err);
              reject('some error happened in clearing assigned_locker table');
            }
          });
        });
        resolve('clear assigned_locker table successfully');
      }
    });
  });
}

module.exports = {
  main: (request, response) => {
    var connection = mysql.createConnection({
      host     : process.env.DBaddress,
      port     : process.env.DBport,
      user     : process.env.DBuser,
      password : process.env.DBpassword,
      database : process.env.DBdatabase
    });

    // db에 접속
    connection.connect((err) => {
      if(err) {
        console.error('error connecting: ', err.stack);
        return
      }
      console.log(`connected as ${connection.threadId} successfull`);
    });

    const getApplyInfoQuery = `select * from apply_info`;
    connection.query(getApplyInfoQuery, async (error, results) => {
      if(error) {
        console.error(error);
        throw error;
      }

      const applyInfoArgv = results.filter((applyInfo) => 
        applyInfo.verify && 
        applyInfo.dues && 
        applyInfo.verify === 1 && 
        applyInfo.dues === 1
      ).map((verifiedApplyInfo) => {
          delete verifiedApplyInfo.verify;
          delete verifiedApplyInfo.dues;
          return verifiedApplyInfo
      })
      
      fs.writeFileSync(path.resolve(__dirname, './applyInfo.json'), JSON.stringify(applyInfoArgv, null, 2), (err) => {
        if(err) {
          console.error(err);
          throw err;
        }
      });
      
      // 기존의 assigned_locker table을 초기화 시킨다.
      clearAssignedLocker(connection).then(console.log);

      // python script구문을 child_process로 실행시켜 받아 와서 다량의 쿼리문 발송.
      await pythonSpawn(connection);
      
    });

  }
}
