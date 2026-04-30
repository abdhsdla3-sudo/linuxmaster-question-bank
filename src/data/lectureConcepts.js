export const lectureConcepts = [
  {
    title: "리눅스 개요",
    source: "리눅스 개요 학습 범위",
    summary: [
      "리눅스는 Linus Torvalds가 1991년에 커널을 작성하고 공개하면서 시작되었다.",
      "GNU 프로젝트와 리눅스 커널이 결합되며 완성된 운영체제 형태의 배포판이 만들어졌다.",
      "커널은 파일 시스템, 장치, 프로세스, 메모리 같은 컴퓨터 자원을 관리한다.",
      "셸은 사용자와 커널 사이에서 명령어를 해석하고 실행하는 중간자 역할을 한다.",
      "유닉스 계열 운영체제의 특징은 다중 사용자, 다중 작업, 이식성, 계층적 파일 시스템이다.",
    ],
  },
  {
    title: "배포판과 패키지",
    source: "배포판과 기본 명령어 학습 범위",
    summary: [
      "Debian 계열에는 Debian, Ubuntu, Linux Mint 등이 있으며 apt와 dpkg를 주로 사용한다.",
      "Red Hat 계열에는 Fedora, CentOS, RHEL 계열 배포판이 있으며 rpm, yum, dnf와 관련이 깊다.",
      "Ubuntu 일반 버전은 약 6개월 주기, LTS 버전은 장기 지원 버전으로 제공된다.",
      "패키지 관리자는 프로그램 설치, 삭제, 업데이트, 의존성 처리를 쉽게 해준다.",
    ],
  },
  {
    title: "기본 명령어",
    source: "기본 명령어 학습 범위",
    summary: [
      "pwd는 현재 작업 디렉터리, cd는 디렉터리 이동, ls는 목록 출력에 사용한다.",
      "cat은 파일 내용을 출력하고, less는 긴 파일을 페이지 단위로 탐색할 때 사용한다.",
      "head는 파일 앞부분, tail은 파일 뒷부분을 출력하며 tail -f는 로그 추적에 자주 사용한다.",
      "grep은 파일 내용에서 문자열을 검색하고, find는 파일 이름이나 속성 조건으로 파일을 찾는다.",
      ">, >>, 2>, 2>&1, | 같은 리다이렉션과 파이프는 명령어 입출력 흐름을 제어한다.",
    ],
  },
  {
    title: "파일 관리와 권한",
    source: "파일 관리 학습 범위",
    summary: [
      "리눅스 파일 시스템은 /를 최상위로 하는 계층적 구조이다.",
      "/etc는 설정 파일, /home은 일반 사용자 홈, /var는 로그와 가변 데이터, /dev는 장치 파일, /proc은 커널/프로세스 가상 정보를 담는다.",
      "chmod는 권한 변경, chown은 소유자 변경, chgrp는 소유 그룹 변경에 사용한다.",
      "숫자 권한에서 읽기 r은 4, 쓰기 w는 2, 실행 x는 1이다.",
      "디렉터리의 실행 권한은 해당 디렉터리로 진입하거나 경로를 탐색하는 데 중요하다.",
    ],
  },
  {
    title: "쉘, 프로세스, 사용자",
    source: "셸, 프로세스, 사용자 관리 학습 범위",
    summary: [
      "셸은 명령어 해석기이며 bash는 리눅스에서 널리 사용되는 셸이다.",
      "ps는 프로세스 목록, top은 실시간 자원 사용량, kill은 프로세스에 시그널을 보내는 명령이다.",
      "jobs, fg, bg는 현재 셸의 작업 제어와 관련된다.",
      "useradd, usermod, userdel은 사용자 관리, groupadd와 groupmod는 그룹 관리와 관련된다.",
      "/etc/passwd는 계정 기본 정보, /etc/shadow는 암호 해시와 만료 정보, /etc/group은 그룹 정보를 저장한다.",
    ],
  },
  {
    title: "디스크 관리",
    source: "디스크 관리 학습 범위",
    summary: [
      "mount는 파일 시스템을 디렉터리 트리에 연결하고 umount는 마운트를 해제한다.",
      "/etc/fstab은 부팅 시 자동 마운트할 파일 시스템 정보를 저장한다.",
      "df는 파일 시스템 단위 사용량, du는 파일이나 디렉터리별 사용량을 확인한다.",
      "df -i는 inode 사용량을 확인할 때 사용한다.",
      "mkfs는 파일 시스템 생성, fsck는 파일 시스템 검사와 복구에 사용한다.",
    ],
  },
];

export const conceptExplanations = {
  pwd: "pwd는 현재 작업 디렉터리의 절대 경로를 출력하는 명령입니다.",
  cd: "cd는 현재 셸의 작업 디렉터리를 이동하는 명령입니다.",
  ls: "ls는 파일과 디렉터리 목록을 출력하는 명령입니다.",
  "ls -a": "ls -a는 숨김 파일까지 포함해 모든 항목을 출력합니다.",
  "ls -l": "ls -l은 권한, 소유자, 크기, 수정 시간 등 상세 정보를 출력합니다.",
  cat: "cat은 파일 내용을 표준 출력으로 보낼 때 사용합니다.",
  less: "less는 긴 파일을 페이지 단위로 탐색할 때 사용합니다.",
  head: "head는 파일 앞부분을 출력합니다.",
  tail: "tail은 파일 뒷부분을 출력합니다.",
  "tail -f": "tail -f는 파일 끝에 추가되는 내용을 실시간으로 추적합니다.",
  grep: "grep은 파일 내용에서 특정 문자열이나 패턴이 포함된 줄을 찾습니다.",
  find: "find는 파일 이름, 타입, 크기, 수정 시간 같은 조건으로 파일 시스템을 검색합니다.",
  chmod: "chmod는 파일이나 디렉터리의 접근 권한을 변경합니다.",
  chown: "chown은 파일이나 디렉터리의 소유자를 변경합니다.",
  chgrp: "chgrp는 파일이나 디렉터리의 소유 그룹을 변경합니다.",
  umask: "umask는 새 파일과 디렉터리가 만들어질 때 기본 권한에서 제거할 권한을 지정합니다.",
  "/etc": "/etc는 시스템 설정 파일이 주로 위치하는 디렉터리입니다.",
  "/home": "/home은 일반 사용자 홈 디렉터리가 위치하는 디렉터리입니다.",
  "/var": "/var는 로그, 스풀, 캐시처럼 크기가 변하는 데이터를 저장합니다.",
  "/dev": "/dev는 장치 파일이 위치하는 디렉터리입니다.",
  "/proc": "/proc은 프로세스와 커널 정보를 제공하는 가상 파일 시스템입니다.",
  "/boot": "/boot는 커널 이미지와 부트 로더 관련 파일이 위치합니다.",
  "/root": "/root는 root 사용자의 홈 디렉터리입니다.",
  df: "df는 마운트된 파일 시스템의 전체/사용/가용 공간을 확인합니다.",
  du: "du는 특정 파일이나 디렉터리가 차지하는 디스크 사용량을 계산합니다.",
  mount: "mount는 파일 시스템을 디렉터리 트리에 연결합니다.",
  umount: "umount는 마운트된 파일 시스템을 분리합니다.",
  "/etc/fstab": "/etc/fstab은 부팅 시 자동 마운트 설정을 포함한 파일 시스템 정보를 저장합니다.",
  ps: "ps는 현재 실행 중인 프로세스 정보를 출력합니다.",
  top: "top은 프로세스와 시스템 자원 사용량을 실시간으로 보여줍니다.",
  kill: "kill은 PID에 시그널을 보내 프로세스 종료 등을 요청합니다.",
  jobs: "jobs는 현재 셸에서 관리하는 작업 목록을 보여줍니다.",
  fg: "fg는 작업을 포그라운드로 가져옵니다.",
  bg: "bg는 중지된 작업을 백그라운드에서 재개합니다.",
  sudo: "sudo는 허가된 사용자가 다른 사용자 권한으로 명령을 실행하게 합니다.",
  su: "su는 다른 사용자 계정으로 전환하는 명령입니다.",
  "/etc/passwd": "/etc/passwd는 사용자 계정의 기본 정보를 저장합니다.",
  "/etc/shadow": "/etc/shadow는 암호 해시와 만료 정보를 저장합니다.",
  "/etc/group": "/etc/group은 그룹 정보를 저장합니다.",
  apt: "apt는 Debian/Ubuntu 계열의 고수준 패키지 관리 도구입니다.",
  dpkg: "dpkg는 .deb 패키지를 직접 다루는 저수준 도구입니다.",
  rpm: "rpm은 RPM 패키지를 직접 설치, 조회, 삭제하는 도구입니다.",
  dnf: "dnf는 Fedora와 최신 Red Hat 계열의 패키지 관리자입니다.",
  yum: "yum은 전통적인 Red Hat 계열 패키지 관리자입니다.",
  tar: "tar는 여러 파일을 하나의 아카이브로 묶거나 푸는 명령입니다.",
  gzip: "gzip은 .gz 형식 압축과 관련됩니다.",
  bzip2: "bzip2는 .bz2 형식 압축과 관련됩니다.",
  xz: "xz는 .xz 형식 압축과 관련됩니다.",
};

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function includesConceptTerm(choice, term) {
  if (term.length < 3) {
    const pattern = new RegExp(`(^|[^A-Za-z0-9가-힣/_-])${escapeRegExp(term)}($|[^A-Za-z0-9가-힣/_-])`);
    return pattern.test(choice);
  }
  return choice.includes(term);
}

export function explainChoice(choice) {
  if (!choice) return "";
  const exact = conceptExplanations[choice];
  if (exact) return exact;

  const key = Object.keys(conceptExplanations).find((term) => includesConceptTerm(choice, term));
  return key ? conceptExplanations[key] : "";
}
