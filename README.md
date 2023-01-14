
> ## Git 브랜치 전략



### 브랜치 목록


#### main
<http://rookan.site/>
``` 
 상용 서버 메인
```

#### Develop
```
 기능 개발 취합 테스트 
```

#### feature
```
기능 개발 브랜치

PR 조건
- Develop 브랜치로 PR요청할 경우
  * 해당 기능을 테스트 할 때 PR 요청한다.
  * 상용에 배포할 때는 Develop 브랜치에서 main 브랜치로 PR을 요청한다.
  * 상용 env와 분리하기 위함
```

### 🌱 브랜치 생성 규칙
#### feature 브랜치 생성 규칙
```
feature/[git 유저 이름]-[기능개발 이름]
ex) git 유저이름: 신아현 기능개발: 라이브 방송
    feature/ahyun-live
```

PR
- 각자 브랜치에서 작업 후 Develop으로 pull request를 날린다.
- Develop에서 merge 후 작업 시 Develop브랜치에서 pull을 받고 진행한다.
- 기능 개발이 끝난 브랜치는 7일 후에 삭제한다.

