import { explainChoice } from "./lectureConcepts.js";

const commandInfo = {
  alias: "명령어에 별칭을 붙입니다.",
  apt: "Debian/Ubuntu 계열에서 패키지를 설치, 삭제, 검색, 업데이트하는 패키지 관리 명령어입니다.",
  bg: "중지된 작업을 백그라운드에서 계속 실행합니다.",
  cal: "달력을 출력합니다.",
  cat: "파일 내용을 표준 출력으로 보여줍니다.",
  cd: "현재 작업 디렉터리를 이동합니다.",
  chmod: "파일이나 디렉터리의 접근 권한을 변경합니다.",
  chown: "파일이나 디렉터리의 소유자를 변경합니다.",
  chgrp: "파일이나 디렉터리의 소유 그룹을 변경합니다.",
  clear: "터미널 화면을 지웁니다.",
  cp: "파일이나 디렉터리를 복사합니다.",
  crontab: "사용자별 예약 작업을 등록하거나 조회합니다.",
  curl: "URL을 이용해 데이터를 요청하거나 내려받습니다.",
  cut: "텍스트에서 지정한 필드나 문자 범위를 잘라 출력합니다.",
  date: "현재 날짜와 시간을 출력하거나 설정합니다.",
  df: "마운트된 파일 시스템 단위의 디스크 사용량을 확인합니다.",
  diff: "두 파일의 차이를 비교합니다.",
  dnf: "Fedora 및 최신 Red Hat 계열에서 사용하는 패키지 관리 명령어입니다.",
  dpkg: "Debian 계열의 .deb 패키지를 직접 관리합니다.",
  du: "파일이나 디렉터리 단위의 디스크 사용량을 확인합니다.",
  export: "셸 변수를 환경 변수로 내보냅니다.",
  fg: "백그라운드 작업을 포그라운드로 가져옵니다.",
  file: "파일의 종류를 판별합니다.",
  find: "조건에 맞는 파일이나 디렉터리를 검색합니다.",
  free: "메모리와 swap 사용량을 확인합니다.",
  grep: "파일이나 입력에서 특정 문자열 또는 패턴이 포함된 줄을 검색합니다.",
  groupadd: "새 그룹을 생성합니다.",
  groups: "사용자가 속한 그룹 목록을 출력합니다.",
  gzip: "파일을 .gz 형식으로 압축합니다.",
  gunzip: "gzip으로 압축된 파일을 해제합니다.",
  head: "파일의 앞부분을 출력합니다.",
  history: "이전에 실행한 명령 기록을 출력합니다.",
  hostname: "시스템의 호스트 이름을 확인하거나 설정합니다.",
  id: "사용자의 UID, GID, 그룹 정보를 출력합니다.",
  ip: "IP 주소, 라우팅, 네트워크 인터페이스 정보를 확인하거나 설정합니다.",
  jobs: "현재 셸에서 관리 중인 작업 목록을 출력합니다.",
  kill: "프로세스에 시그널을 보내 종료 등을 요청합니다.",
  killall: "이름이 일치하는 프로세스에 시그널을 보냅니다.",
  less: "긴 텍스트 파일을 페이지 단위로 확인합니다.",
  ln: "파일 간 링크를 생성합니다.",
  ls: "파일과 디렉터리 목록을 출력합니다.",
  man: "명령어의 매뉴얼 페이지를 보여줍니다.",
  mkdir: "디렉터리를 생성합니다.",
  mkfs: "장치에 파일 시스템을 생성합니다.",
  mount: "파일 시스템을 디렉터리 트리에 연결합니다.",
  mv: "파일을 이동하거나 이름을 변경합니다.",
  nohup: "로그아웃 후에도 명령이 계속 실행되도록 합니다.",
  nslookup: "DNS 정보를 질의합니다.",
  passwd: "사용자 비밀번호를 변경합니다.",
  pgrep: "조건에 맞는 프로세스 ID를 검색합니다.",
  ping: "네트워크 연결 가능성을 확인합니다.",
  pkill: "조건에 맞는 프로세스에 시그널을 보냅니다.",
  ps: "현재 실행 중인 프로세스 정보를 출력합니다.",
  pstree: "프로세스 관계를 트리 형태로 보여줍니다.",
  pwd: "현재 작업 디렉터리의 전체 경로를 출력합니다.",
  renice: "실행 중인 프로세스의 nice 값을 변경합니다.",
  rm: "파일이나 디렉터리를 삭제합니다.",
  rmdir: "비어 있는 디렉터리를 삭제합니다.",
  rpm: "RPM 패키지를 직접 설치, 조회, 삭제합니다.",
  sed: "텍스트를 스트림 단위로 편집합니다.",
  sort: "텍스트 줄을 정렬합니다.",
  source: "스크립트를 현재 셸에서 실행합니다.",
  ss: "소켓과 네트워크 연결 정보를 확인합니다.",
  su: "다른 사용자 계정으로 전환합니다.",
  sudo: "허용된 사용자가 다른 사용자 권한으로 명령을 실행합니다.",
  systemctl: "systemd 서비스의 상태 확인, 시작, 중지, 자동 시작 설정을 관리합니다.",
  tail: "파일의 뒷부분을 출력합니다.",
  tar: "여러 파일을 하나의 아카이브로 묶거나 해제합니다.",
  tee: "입력을 화면과 파일에 동시에 출력합니다.",
  top: "프로세스와 시스템 자원 사용량을 실시간으로 보여줍니다.",
  touch: "빈 파일을 만들거나 파일의 시간을 갱신합니다.",
  traceroute: "목적지까지의 네트워크 경로를 추적합니다.",
  umask: "새 파일과 디렉터리의 기본 권한에서 제거할 권한을 지정합니다.",
  umount: "마운트된 파일 시스템을 분리합니다.",
  uname: "커널과 시스템 정보를 출력합니다.",
  uniq: "인접한 중복 줄을 처리합니다.",
  unset: "셸 변수나 환경 변수를 해제합니다.",
  unzip: "zip 파일을 해제합니다.",
  uptime: "시스템이 켜져 있던 시간과 부하 평균을 출력합니다.",
  useradd: "사용자 계정을 생성합니다.",
  userdel: "사용자 계정을 삭제합니다.",
  usermod: "사용자 계정 속성을 변경합니다.",
  wc: "줄 수, 단어 수, 바이트 수를 계산합니다.",
  wget: "URL을 이용해 파일을 내려받습니다.",
  whereis: "명령어의 실행 파일, 소스, 매뉴얼 위치를 찾습니다.",
  which: "PATH에서 실행될 명령어의 위치를 찾습니다.",
  whoami: "현재 유효 사용자 이름을 출력합니다.",
  yum: "전통적인 Red Hat 계열 패키지 관리 명령어입니다.",
};

const optionInfo = {
  "-a": "숨김 항목까지 포함하거나 전체 항목을 대상으로 처리합니다. ls에서는 숨김 파일 표시입니다.",
  "-c": "tar에서는 새 아카이브를 생성합니다.",
  "-d": "디렉터리 자체를 대상으로 하거나 구분자를 지정할 때 사용됩니다. 명령어별 의미를 구분해야 합니다.",
  "-e": "편집 또는 삭제 계열 옵션으로 쓰일 수 있으므로 명령어와 함께 판단해야 합니다.",
  "-f": "tar에서는 작업할 아카이브 파일 이름을 지정합니다.",
  "-h": "사람이 읽기 쉬운 단위로 출력합니다.",
  "-i": "대소문자 무시 또는 확인 질문처럼 명령어별 의미가 다릅니다.",
  "-j": "tar에서 bzip2 압축 또는 해제와 함께 사용합니다.",
  "-l": "긴 형식 출력이나 목록 조회에 자주 쓰입니다.",
  "-n": "줄 번호 표시 또는 실행 방지처럼 명령어별 의미가 다릅니다.",
  "-p": "PID 지정 또는 상위 디렉터리 생성처럼 명령어별 의미가 다릅니다.",
  "-r": "재귀 처리 또는 추가 작업에 자주 쓰입니다.",
  "-R": "재귀적으로 하위 항목까지 처리합니다.",
  "-s": "ln에서는 심볼릭 링크 생성을 의미합니다.",
  "-t": "tar에서는 아카이브 내부 목록을 확인합니다.",
  "-u": "업데이트 또는 사용자 지정처럼 명령어별 의미가 다릅니다.",
  "-v": "처리 과정을 자세히 출력합니다.",
  "-x": "tar에서는 아카이브를 해제합니다.",
  "-z": "tar에서 gzip 압축 또는 해제와 함께 사용합니다.",
  "-J": "tar에서 xz 압축 또는 해제와 함께 사용합니다.",
  "-9": "SIGKILL을 보내 프로세스를 강제 종료합니다.",
};

const pathInfo = {
  "/": "리눅스 파일 시스템의 최상위 루트 디렉터리입니다.",
  "/bin": "기본 실행 명령어가 위치합니다.",
  "/boot": "커널 이미지와 부트로더 관련 파일이 위치합니다.",
  "/dev": "장치 파일이 위치합니다.",
  "/etc": "시스템 설정 파일이 위치합니다.",
  "/etc/fstab": "부팅 시 자동 마운트할 파일 시스템 정보를 저장합니다.",
  "/etc/group": "그룹 정보를 저장합니다.",
  "/etc/hosts": "로컬 호스트 이름과 IP 매핑을 저장합니다.",
  "/etc/passwd": "사용자 계정의 기본 정보를 저장합니다.",
  "/etc/resolv.conf": "DNS resolver 설정을 저장합니다.",
  "/etc/shadow": "암호 해시와 암호 만료 정보를 저장합니다.",
  "/etc/shells": "로그인 가능한 셸 목록을 저장합니다.",
  "/etc/sudoers": "sudo 권한 설정을 저장합니다.",
  "/home": "일반 사용자 홈 디렉터리가 위치합니다.",
  "/lib": "프로그램 실행에 필요한 라이브러리가 위치합니다.",
  "/media": "USB, CD-ROM 같은 이동식 매체의 마운트 위치로 쓰입니다.",
  "/mnt": "임시 마운트 위치로 쓰입니다.",
  "/opt": "추가 응용 프로그램 설치 위치로 쓰입니다.",
  "/proc": "프로세스와 커널 정보를 제공하는 가상 파일 시스템입니다.",
  "/root": "root 사용자의 홈 디렉터리입니다.",
  "/sbin": "시스템 관리용 명령어가 위치합니다.",
  "/tmp": "임시 파일 저장 위치입니다.",
  "/usr": "사용자 프로그램과 공유 데이터가 위치합니다.",
  "/var": "로그, 스풀, 캐시처럼 변하는 데이터가 저장됩니다.",
};

const conceptInfo = {
  "4": "숫자 권한에서 읽기 권한 r을 의미합니다.",
  "2": "숫자 권한에서 쓰기 권한 w를 의미합니다.",
  "1": "숫자 권한에서 실행 권한 x를 의미합니다.",
  "644": "소유자는 읽기/쓰기, 그룹과 기타 사용자는 읽기만 가능한 권한입니다.",
  "755": "소유자는 모든 권한, 그룹과 기타 사용자는 읽기/실행 권한을 갖습니다.",
  "600": "소유자만 읽기/쓰기 권한을 갖습니다.",
  "700": "소유자만 읽기/쓰기/실행 권한을 갖습니다.",
  "777": "모든 사용자에게 읽기/쓰기/실행 권한을 부여합니다.",
  ".deb": "Debian 계열 패키지 파일 형식입니다.",
  ".rpm": "Red Hat 계열 패키지 파일 형식입니다.",
  ".tar.gz": "tar 아카이브를 gzip으로 압축한 파일 형식입니다.",
  ".gz": "gzip 압축 파일 확장자입니다.",
  ".bz2": "bzip2 압축 파일 확장자입니다.",
  ".xz": "xz 압축 파일 확장자입니다.",
  SSH: "암호화된 원격 접속 프로토콜입니다.",
  FTP: "파일 전송 프로토콜이며 암호화가 기본 목적이 아닙니다.",
  HTTP: "웹 문서를 전송하는 프로토콜입니다.",
  HTTPS: "HTTP에 TLS 암호화를 적용한 프로토콜입니다.",
  DNS: "도메인 이름을 IP 주소로 변환하는 시스템입니다.",
  TCP: "연결 지향적이고 신뢰성 있는 전송 프로토콜입니다.",
  UDP: "비연결형 전송 프로토콜입니다.",
  PID: "프로세스 식별 번호입니다.",
  PPID: "부모 프로세스의 식별 번호입니다.",
  root: "최고 관리자 계정입니다.",
};

function getChoiceExplanation(choice) {
  if (!choice) return "";
  const command = getCommandName(choice);
  if (command && commandInfo[command]) return commandInfo[command];
  if (pathInfo[choice]) return pathInfo[choice];
  if (conceptInfo[choice]) return conceptInfo[choice];
  return explainChoice(choice);
}

function getCommandName(text) {
  const firstToken = String(text ?? "").trim().split(/\s+/)[0];
  return commandInfo[firstToken] ? firstToken : "";
}

function extractCommandFromQuestion(questionText) {
  const match = String(questionText ?? "").match(/([a-z][\w.-]*(?:\s+-[\w]+)*(?:\s+[\w./*'"-]+){0,3})\s*명령/);
  return match?.[1]?.trim() ?? "";
}

function splitOptions(token) {
  if (!token?.startsWith("-") || token.startsWith("--")) return token ? [token] : [];
  if (token.length <= 2 || /^\-\d+$/.test(token)) return [token];
  return token
    .slice(1)
    .split("")
    .map((option) => `-${option}`);
}

function analyzeCommand(commandLine) {
  const tokens = String(commandLine ?? "").trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  const [command, ...rest] = tokens;
  const analysis = [];
  if (commandInfo[command]) {
    analysis.push({ label: command, text: commandInfo[command] });
  }

  rest.forEach((token) => {
    if (token.startsWith("-")) {
      splitOptions(token).forEach((option) => {
        analysis.push({ label: option, text: optionInfo[option] ?? "해당 명령어의 옵션입니다. 시험에서는 명령어와 함께 의미를 구분해야 합니다." });
      });
    }
  });

  return analysis;
}

function makeCorrectSummary(question, correctChoice) {
  const commandLine = extractCommandFromQuestion(question.question);
  if (commandLine) {
    return `${commandLine} 명령에서 정답은 "${correctChoice}"입니다. ${question.explanation}`;
  }

  const explanation = getChoiceExplanation(correctChoice);
  if (explanation) return `"${correctChoice}"이 정답입니다. ${explanation}`;

  return `"${correctChoice}"이 정답입니다. ${question.explanation}`;
}

function explainWrongChoice(choice, correctChoice, question, isSelected) {
  const lowerChoice = String(choice).toLowerCase();
  const command = getCommandName(choice);
  const correctCommand = getCommandName(correctChoice);
  const commandLine = extractCommandFromQuestion(question.question);

  if (commandLine.includes("tar")) {
    if (lowerChoice.includes("검색")) return "tar -xvf는 아카이브 해제 명령입니다. 검색 기능은 grep이나 find와 구분해야 합니다.";
    if (lowerChoice.includes("생성")) return "tar 아카이브 생성은 -c 옵션을 사용합니다. -x는 생성이 아니라 해제입니다.";
    if (lowerChoice.includes("암호")) return "tar는 묶기와 해제 명령이며, -xvf 자체는 암호화 기능을 수행하지 않습니다.";
  }

  if (correctChoice === "ln") {
    if (choice === "mklinkfs" || choice === "linker" || choice === "connect") {
      return `${choice}는 링크 생성 명령어가 아닙니다. 리눅스에서 하드 링크와 심볼릭 링크를 만드는 표준 명령어는 ln입니다.`;
    }
  }

  if (command && commandInfo[command]) {
    return `${choice}는 ${commandInfo[command]} 따라서 이 문항에서 묻는 "${correctChoice}"의 기능과 다릅니다.`;
  }

  if (correctCommand && !command && /^[a-z][\w.-]*$/.test(choice)) {
    return `${choice}는 이 시험 범위에서 "${correctCommand}"의 기능을 대신하는 표준 명령어로 다루지 않습니다.`;
  }

  const choiceExplanation = getChoiceExplanation(choice);
  if (choiceExplanation) {
    return `${choiceExplanation} 이 문항의 정답 조건은 "${correctChoice}"이므로 기능이 일치하지 않습니다.`;
  }

  const detail = isSelected ? "사용자가 선택한 보기이지만, " : "";
  return `${detail}"${choice}"는 문제에서 요구한 핵심 기능 또는 개념과 일치하지 않습니다. 정답은 "${correctChoice}"입니다.`;
}

function makeConceptBullets(question, correctChoice) {
  if (correctChoice === "ln") {
    return [
      { label: "ln", text: "파일 간 링크를 생성하는 명령어입니다." },
      { label: "하드 링크", text: "같은 inode를 공유하는 또 다른 파일 이름입니다." },
      { label: "심볼릭 링크", text: "원본 경로를 가리키는 바로가기 파일이며 ln -s로 생성합니다." },
    ];
  }

  const commandLine = extractCommandFromQuestion(question.question);
  const commandAnalysis = analyzeCommand(commandLine || correctChoice);
  if (commandAnalysis.length) return commandAnalysis;

  const explanation = getChoiceExplanation(correctChoice) || question.explanation;
  return [{ label: "핵심 개념", text: explanation }];
}

function makeExamPoints(question, correctChoice) {
  const commandLine = extractCommandFromQuestion(question.question);
  if (commandLine.includes("tar")) return ["tar -x는 해제, tar -c는 생성, -f는 파일 지정으로 암기하세요."];
  if (correctChoice === "ln") return ["링크 생성 = ln, 심볼릭 링크 생성 = ln -s를 반드시 구분하세요."];
  if (getCommandName(correctChoice)) return [`"${correctChoice}"의 기능을 한 줄로 구분해 암기하세요.`];
  return [`"${correctChoice}"와 비슷한 보기의 기능 차이를 기준으로 구분하세요.`];
}

export function buildStructuredExplanation(question, selected) {
  const correctChoice = question.choices[question.answer];
  const conceptBullets = makeConceptBullets(question, correctChoice);
  const wrongBullets = question.choices
    .map((choice, index) => ({ choice, index }))
    .filter(({ index }) => index !== question.answer)
    .map(({ choice, index }) => ({
      label: `${index + 1}번${index === selected ? " (사용자 선택)" : ""}`,
      text: explainWrongChoice(choice, correctChoice, question, index === selected),
      emphasis: index === selected,
    }));

  wrongBullets.sort((a, b) => Number(b.emphasis) - Number(a.emphasis));

  return {
    correctSummary: makeCorrectSummary(question, correctChoice),
    conceptTitle: conceptBullets.some((item) => item.label.startsWith("-")) ? "명령어 분석" : "핵심 개념 설명",
    conceptBullets,
    wrongBullets,
    examPoints: makeExamPoints(question, correctChoice),
  };
}
