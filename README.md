# 리눅스마스터 2급 1차 문제은행

React + Vite + Tailwind CSS로 만든 리눅스마스터 2급 1차 대비용 문제은행 웹사이트입니다. 백엔드 없이 브라우저에서 동작하며, 사용자별 오답노트와 시험 기록은 `localStorage`에 저장됩니다.

이 프로젝트는 OpenAI Codex와 함께 요구사항 정리, 기능 구현, UI 개선, 문제 데이터 보강을 진행했습니다.

## 주요 기능

- 로그인 화면: 이름 기반 학습용 로그인
- 메인 화면: 시험 시작, 문제 연습, 오답노트, 기록 초기화
- 시험 모드: 1000문항 중 50문항 랜덤 출제
- 문제 연습 모드: 카테고리별 즉시 채점
- 오답노트: 틀린 문제 자동 저장, 다시 맞히면 제거
- 결과 화면: 점수, 정답 수, 오답 수, 합격 여부, 문항별 해설
- 시험 기록: 응시 횟수, 최근 점수, 평균 점수 저장

## 중요한 제한

현재 로그인은 백엔드가 없는 학습용 로그인입니다.

- 같은 브라우저 안에서는 사용자별 기록이 분리됩니다.
- 다른 기기와 기록이 자동 동기화되지는 않습니다.
- 진짜 회원가입, 비밀번호, 여러 기기 동기화가 필요하면 Supabase, Firebase, 자체 서버 같은 백엔드가 필요합니다.

## 실행 방법

```bash
cd linuxmaster-question-bank
npm install
npm run dev
```

PowerShell 실행 정책 오류가 나면 아래처럼 `npm.cmd`를 사용하세요.

```powershell
npm.cmd install
npm.cmd run dev
```

개발 서버가 실행 중인 내 PC에서는 브라우저에서 `http://localhost:5173`으로 접속해 확인할 수 있습니다. 이 주소는 내 PC 전용 개발 주소라서 PowerShell을 닫거나 PC를 끄면 접속되지 않고, 다른 사람에게 공유할 주소로는 사용할 수 없습니다.

다른 사람에게 공유할 때는 배포된 주소를 사용하세요.

```text
https://abdhsdla3-sudo.github.io/linuxmaster-question-bank/
https://linuxpractice.netlify.app/
```

## 배포 방법 1: Vercel

1. GitHub에 이 프로젝트를 올립니다.
2. [Vercel](https://vercel.com/)에 로그인합니다.
3. `Add New Project`를 누릅니다.
4. GitHub 저장소를 선택합니다.
5. Framework Preset은 `Vite`를 선택합니다.
6. Build Command는 `npm run build`입니다.
7. Output Directory는 `dist`입니다.
8. Deploy를 누릅니다.

배포가 끝나면 Vercel이 제공하는 URL로 휴대폰, 태블릿, 다른 PC에서 접속할 수 있습니다.

## 배포 방법 2: Netlify

1. [Netlify](https://www.netlify.com/)에 로그인합니다.
2. `Add new site`를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. Build command에 `npm run build`를 입력합니다.
5. Publish directory에 `dist`를 입력합니다.
6. Deploy를 누릅니다.

## 배포 방법 3: GitHub Pages

이 프로젝트는 GitHub Pages 배포용 설정이 포함되어 있습니다.

1. GitHub 저장소의 `Settings`로 이동합니다.
2. 왼쪽 메뉴에서 `Pages`를 선택합니다.
3. `Build and deployment`의 `Source`를 `GitHub Actions`로 설정합니다.
4. 로컬에서 변경 내용을 push합니다.

```bash
git add .
git commit -m "Configure GitHub Pages"
git push
```

배포가 끝나면 아래 주소에서 접속할 수 있습니다.

```text
https://abdhsdla3-sudo.github.io/linuxmaster-question-bank/
```

## 빌드 확인

```bash
npm run build
npm run preview
```

## 프로젝트 구조

```text
src/
  App.jsx
  main.jsx
  styles.css
  data/
    questions.js
    extraQuestions.js
    moreQuestions.js
    largeQuestionBank.js
  components/
    Header.jsx
    Home.jsx
    Login.jsx
    ExamMode.jsx
    PracticeMode.jsx
    WrongNote.jsx
    ResultPage.jsx
    QuestionCard.jsx
    ProgressBar.jsx
```

## 기록 초기화

메인 화면의 `기록 초기화` 버튼을 누르면 현재 로그인한 사용자의 시험 기록과 오답노트가 삭제됩니다.

## 문제 추가 방법

`src/data/questions.js`, `src/data/extraQuestions.js`, `src/data/moreQuestions.js` 또는 `src/data/largeQuestionBank.js`에 문제를 추가할 수 있습니다.

기본 문제 구조는 아래와 같습니다.

```js
{
  id: 1001,
  category: "기본 명령어",
  question: "문제 내용",
  choices: ["보기 1", "보기 2", "보기 3", "보기 4"],
  answer: 0,
  explanation: "해설 내용"
}
```

`answer`는 `choices` 배열의 번호이며 0부터 시작합니다.
