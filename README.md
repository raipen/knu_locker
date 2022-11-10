# KNU CSE 사물함 신청 [\[바로가기\]](https://raipen.gabia.io)

> 경북대학교 컴퓨터학부 사물함 신청 서비스

[![Video Label](http://img.youtube.com/vi/X62gA5kJoic/0.jpg)](https://youtu.be/X62gA5kJoic)

## 기획배경

* 기존 신청 방식
  * google form으로 신청을 받음(이름, 학번, 전화번호, 1지망 층수, 1지망 높이, 2지망 층수, 2지망 높이)
  * 학생회비 납부자 명단 엑셀파일과 신청자 정보를 대조하여 납부자 우선 배정
* 기존 신청 방식에서는 매 학기 사물함 사용 신청을 받고 배정하는 과정에서 많은 인력이 낭비되고 있었기 때문에, 장기적으로 사용할 수 있는 자동화된 신청 서비스가 필요하여 이 프로젝트를 기획하게 되었다.

## 1차 개발(2022년 1학기)

* express 프레임워크를 사용하지 않고, http 모듈만 사용하여 api 서버 제작
* 신청페이지와 신청완료 페이지를 정적인 HTML 파일로 작성
* 학생 정보와 사물함 정보를 엑셀에서 데이터베이스로 옮김
* 교내 이메일로 본인 인증을 받고, 신청정보를 데이터베이스에 저장
* 파이썬으로 학생회비 납부자 우선 배정 알고리즘을 작성
* 배정된 사물함 정보를 데이터베이스에 저장
* 배정 결과를 이메일로 전송
* ![2022_1](2022_1.png)

## 2차 개발(2022년 2학기)

* express 프레임워크를 사용하지 않고 http 모듈만을 사용하여 api 서버를 만들었으나, 요청 메소드와 주소별로 분기 처리하여야 하기 때문에 코드가 복잡해졌고, 이를 해결하는 과정에서 파일 구조가 복잡해지는 문제가 발생 => 비교적 깔끔하게 라우팅을 관리할 수 있는 express로 전체 프로젝트를 컨버팅
* 전체적인 코드의 구조를 Express route controller 계층과 서비스 계층, 데이터베이스 계층 의 3계층 구조로 설계 변경. 이를 통해 코드의 재사용성을 높이고, 코드의 가독성을 높임
* 추후 유지보수를 위해, 클린코드로 작성하기 위해 노력함.
* 모바일로 신청하는 경우가 많아 이메일 인증 방식이 불편하다는 의견이 많았음 => 이메일 인증 방식을 제거하고, 전화번호 인증으로 변경
* 신청할때 작성해야할 내용이 너무 많아보여 신청에 대해 거부감을 느낌 => 단계별 신청을 도입하고 각 단계에서 입력할 내용을 최소화, 사물함의 경우 드롭다운형식에서 각 층수와 높이를 이미지에서 선택하는 방식으로 변경
* UI/UX 개선 (페이지 디자인, 반응형 웹 디자인) [피그마 링크](https://www.figma.com/file/2jbfsj8DZZ6FlOyOk5XIct/Untitled?node-id=0%3A1)
* 학생회비 납부자 우선 배정 알고리즘을 파이썬에서 자바스크립트로 변경
* 데이터베이스 구조개선



## 사용법

git과 docker가 설치되어 있다는 전제하에 서술

1. 레파지토리 다운로드

   ```shell
   git clone https://github.com/raipen/knu_locker.git
   cd knu_locker
   ```

2. env 설정

   ```shell
   vim .env
   ```

   .env 파일 내용

   ```env
   testDBaddress={테스트용 데이터베이스 주소}
   testDBuser={테스트용 데이터베이스 유저}
   testDBpassword={테스트용 데이터베이스 비밀번호}
   testDBdatabase={테스트용 데이터베이스 이름}
   DBaddress={배포용 데이터베이스 주소}
   DBuser={배포용 데이터베이스 유저}
   DBpassword={배포용 데이터베이스 비밀번호}
   DBdatabase={배포용 데이터베이스 이름}
   DBport={데이터베이스 포트}
   PORT={서비스 포트}
   NCP_SENS_ACCESS={문자 전송 정보}
   NCP_SENS_SECRET={문자 전송 정보}
   NCP_SENS_ID={문자 전송 정보}
   NCP_SENS_MY_NUMBER={문자 전송 정보}
   COOKIE_SECRET={쿠키 암호화 값, 아무 값이나 넣어도 됨}
   ```

3. 데이터베이스 설정(하단 참조)

4. 도커 이미지 빌드

   ```shell
   docker build -t {이미지이름}:{버전} .
   ```

5. 도커 실행

   ```shell
   docker run -dit -p {호스트 포트}:{컨테이너 포트} --name locker1 -v /usr/src/app/node_modules -v /usr/react/node_modules -v $PWD:/usr/src/app {이미지이름}:{버전}
   ```

<hr/>

v16 이상의 node가 설치된 환경이라면

```shell
npm install
npm install -g pm2
npm run build
npm test
```

를 실행하여 3000번 포트에서 react.js로 만든 프론트엔드 페이지와 env에서 설정한 포트에서 백엔드 서버를 테스트할 수 있다.

## 폴더구조

```null
src
│   app.js          # 시작 프로그램
└───api             # req와 res 오브젝트를 다루는 부분
└───config          # env 설정
└───jobs            # Jobs(문자 전송, 사물함 배정)
└───loaders         # 서버가 실행되기 전에 로드 되는 것들
└───models          # 데이터베이스 모델
└───services		# 비지니스 로직
└───log
```



## 데이터베이스 설정

방법1. ```/src/loaders/db.js```에서 ```db.sequelize.sync({force: false, alter: false});``` 부분을 ```db.sequelize.sync({force: true, alter: true});``` 로 바꾸고 실행, 만들어진 테이블에 학생데이터와 사물함 데이터 삽입

방법2. 관리자에게 전달받은 sql 파일을 적용

```shell
mysql -u {유저이름} -p {데이터베이스명} < {sql파일명}.sql
```

