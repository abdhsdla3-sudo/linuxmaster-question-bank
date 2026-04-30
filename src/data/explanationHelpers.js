import { explainChoice } from "./lectureConcepts.js";

const portExplanations = {
  "20": "FTP 데이터 전송에 사용되는 포트로 자주 언급됩니다.",
  "21": "FTP 제어 연결의 기본 포트입니다.",
  "22": "SSH의 기본 포트입니다.",
  "23": "Telnet의 기본 포트입니다. Telnet은 암호화되지 않은 원격 접속입니다.",
  "25": "SMTP의 기본 포트입니다. 메일 전송과 관련됩니다.",
  "53": "DNS의 기본 포트입니다. 도메인 이름 해석과 관련됩니다.",
  "80": "HTTP의 기본 포트입니다.",
  "110": "POP3의 기본 포트입니다. 메일 수신과 관련됩니다.",
  "143": "IMAP의 기본 포트입니다. 메일 수신과 관련됩니다.",
  "443": "HTTPS의 기본 포트입니다.",
};

const commandExplanations = {
  pwd: "현재 작업 디렉터리의 절대 경로를 출력하는 명령입니다.",
  cd: "현재 셸의 작업 디렉터리를 이동하는 명령입니다.",
  ls: "파일과 디렉터리 목록을 출력하는 명령입니다.",
  touch: "빈 파일을 만들거나 파일의 접근/수정 시간을 갱신하는 명령입니다.",
  file: "파일의 형식이나 종류를 판별해 출력하는 명령입니다.",
  stat: "파일의 자세한 상태, 크기, 권한, 시간 정보를 확인하는 명령입니다.",
  statfs: "파일 시스템 상태를 다루는 이름으로 볼 수 있지만, 파일 종류 판별 명령으로 쓰는 표준 답은 `file`입니다.",
  which: "PATH에서 실행될 명령어의 위치를 찾는 명령입니다.",
  whereis: "명령어의 실행 파일, 소스, 매뉴얼 위치를 찾는 명령입니다.",
  man: "명령어와 설정 파일의 매뉴얼 페이지를 확인하는 명령입니다.",
  helpme: "리눅스 표준 도움말 확인 명령으로 보기 어렵습니다. 매뉴얼 확인은 보통 `man`을 사용합니다.",
  guide: "리눅스 표준 매뉴얼 확인 명령으로 보기 어렵습니다. 매뉴얼 확인은 보통 `man`을 사용합니다.",
  doc: "일반적인 리눅스 명령어 매뉴얼 확인 정답으로 쓰이지 않습니다. 매뉴얼 확인은 보통 `man`입니다.",
  cp: "파일이나 디렉터리를 복사하는 명령입니다.",
  mv: "파일 이동 또는 이름 변경에 사용하는 명령입니다.",
  rm: "파일이나 디렉터리를 삭제하는 명령입니다.",
  ln: "하드 링크 또는 심볼릭 링크를 생성하는 명령입니다.",
  mkdir: "새 디렉터리를 생성하는 명령입니다.",
  rmdir: "비어 있는 디렉터리를 삭제하는 명령입니다.",
  cat: "파일 내용을 표준 출력으로 보내거나 여러 파일 내용을 이어 출력하는 명령입니다.",
  less: "긴 텍스트 파일을 페이지 단위로 확인하고 검색할 수 있는 명령입니다.",
  head: "파일의 앞부분을 출력하는 명령입니다.",
  tail: "파일의 뒷부분을 출력하는 명령입니다.",
  cut: "텍스트에서 특정 필드나 문자 범위를 잘라 출력하는 명령입니다.",
  sort: "텍스트 줄을 정렬하는 명령입니다.",
  uniq: "인접한 중복 줄을 처리하는 명령입니다.",
  wc: "줄 수, 단어 수, 바이트 수를 계산하는 명령입니다.",
  diff: "두 파일의 차이를 비교하는 명령입니다.",
  patch: "diff 결과 같은 패치 파일을 적용할 때 사용하는 명령입니다.",
  paste: "여러 파일의 줄을 옆으로 붙여 출력하는 텍스트 처리 명령입니다.",
  echo: "문자열이나 변수 값을 표준 출력으로 출력하는 명령입니다.",
  uname: "커널 이름과 시스템 정보를 출력하는 명령입니다.",
  date: "현재 날짜와 시간을 출력하거나 설정하는 명령입니다.",
  time: "명령 실행 시간을 측정하는 명령입니다.",
  clock: "시스템/하드웨어 시계와 관련된 이름이지만, 현재 날짜와 시간 출력의 대표 답은 `date`입니다.",
  cal: "달력을 출력하는 명령입니다.",
  clear: "터미널 화면을 지우는 명령입니다.",
  dir: "디렉터리 목록을 출력하는 명령이지만, 리눅스 시험에서는 보통 `ls`를 표준 답으로 봅니다.",
  whoami: "현재 유효 사용자 이름을 출력하는 명령입니다.",
  who: "현재 로그인한 사용자 정보를 출력하는 명령입니다.",
  w: "현재 로그인 사용자와 실행 중인 작업 정보를 함께 보여 주는 명령입니다.",
  users: "현재 로그인한 사용자 이름 목록을 출력하는 명령입니다.",
  free: "메모리와 swap 사용량을 확인하는 명령입니다.",
  "ip addr": "IP 주소와 네트워크 인터페이스 정보를 확인하는 명령입니다.",
  "ip a": "ip addr의 축약형으로 IP 주소와 인터페이스 정보를 확인합니다.",
  "ip route": "라우팅 테이블과 기본 게이트웨이 정보를 확인하거나 설정하는 명령입니다.",
  ifconfig: "전통적인 네트워크 인터페이스 확인 및 설정 명령입니다.",
  netstat: "전통적으로 네트워크 연결 상태, 포트, 라우팅 정보를 확인하던 명령입니다.",
  ss: "소켓과 네트워크 연결 상태를 확인하는 최신 명령입니다.",
  ping: "ICMP Echo 요청으로 네트워크 도달성을 확인하는 명령입니다.",
  traceroute: "목적지까지 거치는 네트워크 경로를 추적하는 명령입니다.",
  nslookup: "DNS 서버에 도메인 이름 정보를 질의하는 명령입니다.",
  hostname: "시스템 호스트 이름을 확인하거나 설정하는 명령입니다.",
  scp: "SSH 기반으로 원격 시스템과 파일을 안전하게 복사하는 명령입니다.",
  ssh: "암호화된 원격 로그인과 명령 실행에 사용하는 명령입니다.",
  "ss -tuln": "리스닝 중인 TCP/UDP 포트를 숫자 형식으로 확인하는 명령입니다.",
  lsblk: "블록 장치와 파티션 구조를 트리 형태로 확인하는 명령입니다.",
  lspci: "PCI 장치 목록을 확인하는 명령입니다.",
  lsusb: "USB 장치 목록을 확인하는 명령입니다.",
  lsmod: "현재 로드된 커널 모듈 목록을 확인하는 명령입니다.",
  modprobe: "의존성을 고려해 커널 모듈을 적재하거나 제거하는 명령입니다.",
  dmesg: "커널 메시지와 하드웨어 인식 로그를 확인하는 명령입니다.",
  fdisk: "디스크 파티션 테이블을 생성하거나 수정하는 전통적인 명령입니다.",
  mkfs: "장치나 파티션에 파일 시스템을 생성하는 명령입니다.",
  fsck: "파일 시스템 오류를 검사하고 복구하는 명령입니다.",
  mdadm: "리눅스 소프트웨어 RAID 배열을 생성하고 관리하는 도구입니다.",
  pvcreate: "디스크나 파티션을 LVM 물리 볼륨(PV)으로 초기화하는 명령입니다.",
  vgcreate: "여러 물리 볼륨을 묶어 LVM 볼륨 그룹(VG)을 생성하는 명령입니다.",
  lvcreate: "볼륨 그룹 안에서 논리 볼륨(LV)을 생성하는 명령입니다.",
  mkswap: "파티션이나 파일을 swap 영역으로 초기화하는 명령입니다.",
  swapon: "준비된 swap 영역을 활성화하는 명령입니다.",
  swapoff: "활성화된 swap 영역을 비활성화하는 명령입니다.",
  "df -i": "파일 시스템별 inode 사용량을 확인하는 명령입니다.",
  "du -sh": "파일이나 디렉터리 사용량을 사람이 읽기 쉬운 단위로 요약하는 명령입니다.",
  "systemctl status": "서비스 상태와 최근 로그를 확인하는 명령입니다.",
  "systemctl start": "서비스를 즉시 시작하는 명령입니다.",
  "systemctl stop": "서비스를 즉시 중지하는 명령입니다.",
  "systemctl restart": "서비스를 재시작하는 명령입니다.",
  "systemctl enable": "서비스가 부팅 시 자동 시작되도록 설정하는 명령입니다.",
  "systemctl disable": "서비스의 부팅 시 자동 시작을 해제하는 명령입니다.",
  "systemctl get-default": "systemd의 기본 부팅 target을 확인하는 명령입니다.",
  "crontab -e": "현재 사용자의 cron 예약 작업을 편집하는 명령입니다.",
  "crontab -l": "현재 사용자의 cron 예약 작업 목록을 출력하는 명령입니다.",
  crontab: "사용자별 cron 예약 작업을 관리하는 명령입니다.",
  cron: "정기적인 작업 예약을 처리하는 스케줄러 서비스입니다.",
  initrd: "부팅 초기 단계에서 사용하는 임시 루트 파일 시스템 이미지와 관련된 용어입니다. 정기 작업 예약 명령은 아닙니다.",
  ps: "현재 실행 중인 프로세스 정보를 출력하는 명령입니다.",
  top: "프로세스와 CPU, 메모리 사용량을 실시간으로 확인하는 명령입니다.",
  kill: "PID에 시그널을 보내 프로세스 종료 등을 요청하는 명령입니다.",
  jobs: "현재 셸에서 관리하는 백그라운드/중지 작업 목록을 보여 주는 명령입니다.",
  fg: "백그라운드 또는 중지 작업을 포그라운드로 가져오는 명령입니다.",
  bg: "중지된 작업을 백그라운드에서 계속 실행시키는 명령입니다.",
  pstree: "프로세스의 부모-자식 관계를 트리 형태로 보여 주는 명령입니다.",
  "ps aux": "여러 사용자의 프로세스 정보를 자세히 확인하는 명령입니다.",
  renice: "실행 중인 프로세스의 nice 값을 변경하는 명령입니다.",
  nice: "명령 실행 시 프로세스 우선순위에 영향을 주는 nice 값을 지정합니다.",
  nohup: "로그아웃 후에도 명령이 계속 실행되도록 하는 명령입니다.",
  vi: "리눅스에서 널리 사용하는 텍스트 편집기입니다.",
  vim: "vi를 확장한 텍스트 편집기입니다.",
  startx: "X 윈도 세션을 시작하는 명령입니다.",
  "apt update": "Debian 계열에서 저장소 패키지 목록을 갱신하는 명령입니다.",
  "apt upgrade": "설치된 패키지를 저장소의 새 버전으로 업그레이드하는 명령입니다.",
  "apt install": "Debian 계열에서 저장소 패키지를 설치하는 명령입니다.",
  "apt remove": "Debian 계열에서 설치된 패키지를 제거하는 명령입니다.",
  "apt search": "Debian 계열에서 저장소 패키지를 검색하는 명령입니다.",
  "dpkg -i": "로컬 .deb 패키지를 직접 설치하는 명령입니다.",
  "dpkg -L": "지정한 Debian 패키지가 설치한 파일 목록을 확인하는 명령입니다.",
  "dpkg -S": "특정 파일이 어느 Debian 패키지에 속하는지 검색하는 명령입니다.",
  "rpm -qa": "설치된 RPM 패키지 전체를 조회하는 명령입니다.",
  "rpm -ivh": "RPM 패키지를 설치하는 명령입니다.",
  "rpm -Uvh": "RPM 패키지를 업그레이드하거나 없으면 설치하는 명령입니다.",
  "rpm -e": "설치된 RPM 패키지를 삭제하는 명령입니다.",
  "rpm -qf": "특정 파일이 어느 RPM 패키지에 속하는지 확인하는 명령입니다.",
  apt: "Debian/Ubuntu 계열에서 패키지를 설치, 삭제, 검색, 업데이트할 때 쓰는 고수준 패키지 관리 도구입니다.",
  dpkg: ".deb 패키지를 직접 설치, 조회, 삭제하는 Debian 계열 저수준 패키지 도구입니다.",
  rpm: "RPM 패키지를 직접 설치, 조회, 삭제하는 Red Hat 계열 저수준 패키지 도구입니다.",
  dnf: "Fedora와 최신 Red Hat 계열에서 사용하는 패키지 관리자입니다.",
  yum: "전통적인 Red Hat 계열 패키지 관리자입니다.",
  passwd: "사용자의 비밀번호를 변경하거나 계정 잠금/해제에 사용하는 명령입니다.",
  useradd: "새 사용자 계정을 생성하는 명령입니다.",
  usermod: "기존 사용자 계정 속성을 변경하는 명령입니다.",
  userdel: "사용자 계정을 삭제하는 명령입니다.",
  groupadd: "새 그룹을 생성하는 명령입니다.",
  groupdel: "그룹을 삭제하는 명령입니다.",
  groups: "사용자가 속한 그룹 목록을 출력하는 명령입니다.",
  id: "UID, GID, 소속 그룹 정보를 확인하는 명령입니다.",
  login: "시스템에 로그인할 때 쓰이는 명령/프로그램이며, 관리자 권한 실행 명령은 `sudo`입니다.",
  logout: "로그인 셸을 종료하는 명령이며, 관리자 권한 실행 명령은 `sudo`입니다.",
  sudo: "허가된 사용자가 다른 사용자, 보통 root 권한으로 명령을 실행하게 하는 명령입니다.",
  su: "다른 사용자 계정으로 전환하는 명령입니다.",
  alias: "명령어 별칭을 만들거나 확인하는 셸 내장 명령입니다.",
  history: "이전에 실행한 명령어 기록을 확인하는 명령입니다.",
  export: "셸 변수를 환경 변수로 내보내는 명령입니다.",
  source: "스크립트를 현재 셸에서 실행하는 명령입니다.",
  unset: "셸 변수나 환경 변수를 해제하는 명령입니다.",
  chown: "파일이나 디렉터리의 소유자를 변경하는 명령입니다.",
  chgrp: "파일이나 디렉터리의 소유 그룹을 변경하는 명령입니다.",
  chmod: "파일이나 디렉터리의 접근 권한을 변경하는 명령입니다.",
  umask: "새 파일과 디렉터리 생성 시 기본 권한에서 제거할 권한을 지정하는 명령입니다.",
  chage: "사용자 비밀번호 만료일과 계정 만료 정보를 관리하는 명령입니다.",
  ":w": "vi 마지막 행 모드에서 파일을 저장하는 명령입니다.",
  ":q": "vi 마지막 행 모드에서 종료하는 명령입니다.",
  ":wq": "vi 마지막 행 모드에서 저장 후 종료하는 명령입니다.",
  ":q!": "vi 마지막 행 모드에서 저장하지 않고 강제 종료하는 명령입니다.",
  ":set nu": "vi에서 줄 번호를 표시하는 설정 명령입니다.",
  ":r": "vi에서 다른 파일 내용을 읽어 들일 때 사용하는 명령입니다.",
  dd: "vi 명령 모드에서 현재 줄을 삭제하는 명령입니다.",
  yy: "vi 명령 모드에서 현재 줄을 복사하는 명령입니다.",
  p: "vi 명령 모드에서 복사하거나 삭제한 내용을 붙여넣는 명령입니다.",
  i: "vi 명령 모드에서 현재 커서 위치부터 입력 모드로 전환하는 명령입니다.",
};

const pathExplanations = {
  "/": "리눅스 파일 시스템의 최상위 루트 디렉터리입니다.",
  ".": "현재 디렉터리를 의미합니다.",
  "..": "상위 디렉터리를 의미합니다.",
  "~": "현재 사용자의 홈 디렉터리를 의미합니다.",
  "/home": "일반 사용자 홈 디렉터리가 주로 위치하는 디렉터리입니다.",
  "/etc": "시스템 설정 파일이 주로 위치하는 디렉터리입니다.",
  "/var": "로그, 캐시, 스풀처럼 변하는 데이터가 저장되는 디렉터리입니다.",
  "/dev": "디스크, 터미널 같은 장치 파일이 위치하는 디렉터리입니다.",
  "/proc": "프로세스와 커널 정보를 제공하는 가상 파일 시스템입니다.",
  "/boot": "커널 이미지와 부트 로더 관련 파일이 위치하는 디렉터리입니다.",
  "/root": "root 사용자의 홈 디렉터리입니다.",
  "/bin": "기본 실행 명령어가 위치하는 디렉터리입니다.",
  "/sbin": "시스템 관리용 명령어가 주로 위치하는 디렉터리입니다.",
  "/lib": "프로그램 실행에 필요한 공유 라이브러리가 위치하는 디렉터리입니다.",
  "/etc/hosts": "호스트 이름과 IP 주소의 로컬 매핑을 저장하는 파일입니다.",
  "/etc/resolv.conf": "DNS resolver 설정과 nameserver 정보를 저장하는 파일입니다.",
  "/etc/sudoers": "sudo 권한 설정을 저장하는 파일입니다.",
  "/etc/shells": "로그인 가능한 셸 목록을 저장하는 파일입니다.",
  "/var/log/messages": "시스템 전반 로그가 저장되는 전통적인 로그 파일입니다.",
  "/var/log/secure": "Red Hat 계열에서 인증 및 보안 로그가 저장되는 파일입니다.",
  "/var/log/auth.log": "Debian 계열에서 인증 관련 로그가 저장되는 파일입니다.",
  "/tmp": "임시 파일 저장 디렉터리이며 Sticky Bit가 자주 설정됩니다.",
  "/mnt": "임시 마운트 지점으로 자주 쓰이는 디렉터리입니다.",
  "/media": "USB, CD-ROM 같은 이동식 매체 마운트 위치로 자주 쓰입니다.",
  "/opt": "추가 응용 프로그램을 설치하는 위치로 자주 쓰입니다.",
};

const termExplanations = {
  "데니스 리치": "C 언어와 유닉스 개발에 큰 영향을 준 인물이지만, 리눅스 커널을 처음 공개한 인물은 아닙니다.",
  "켄 톰프슨": "유닉스 개발에 큰 영향을 준 인물이지만, 리눅스 커널을 처음 공개한 인물은 아닙니다.",
  "앤드루 타넨바움": "운영체제 교육용 MINIX와 관련 깊은 인물이며, GNU 프로젝트 주도자는 아닙니다.",
  "스티브 잡스": "Apple과 관련 깊은 인물이며, GNU 프로젝트 주도자는 아닙니다.",
  "빌 게이츠": "Microsoft와 관련 깊은 인물이며, GNU 프로젝트 주도자는 아닙니다.",
  GPL: "소스 사용, 수정, 재배포의 자유를 보장하고 파생물에도 같은 조건을 요구할 수 있는 카피레프트 라이선스입니다.",
  POSIX: "유닉스 계열 운영체제 간 호환성을 위한 표준 인터페이스입니다.",
  "리누스 토르발스": "1991년에 리눅스 커널을 공개한 인물입니다.",
  "리처드 스톨먼": "GNU 프로젝트와 자유 소프트웨어 운동을 주도한 인물입니다.",
  커널: "CPU, 메모리, 장치, 파일 시스템, 프로세스 같은 핵심 자원을 관리합니다.",
  셸: "사용자의 명령을 해석해 커널에 전달하는 명령어 해석기입니다.",
  bash: "리눅스에서 널리 쓰이는 대표적인 셸입니다.",
  root: "시스템 전체에 대한 최고 관리자 권한을 가진 계정입니다.",
  Ubuntu: "Debian 계열 배포판입니다.",
  Debian: "Debian 계열의 대표 배포판이며 .deb와 apt/dpkg와 관련됩니다.",
  "Linux Mint": "Ubuntu/Debian 계열에 가까운 데스크톱 친화 배포판입니다.",
  "Kali Linux": "Debian 계열 기반의 보안/침투 테스트 목적 배포판입니다.",
  Fedora: "Red Hat 계열과 관련 깊은 배포판이며 dnf/rpm과 관련됩니다.",
  "Rocky Linux": "RHEL 호환을 목표로 하는 Red Hat 계열 배포판입니다.",
  AlmaLinux: "RHEL 호환을 목표로 하는 Red Hat 계열 배포판입니다.",
  "웹 서버": "리눅스가 많이 활용되는 대표적인 서버 분야입니다.",
  "클라우드 서버": "리눅스가 많이 활용되는 대표적인 서버/클라우드 분야입니다.",
  "임베디드 시스템": "리눅스가 공유기, IoT 장치 같은 임베디드 환경에서도 활용되는 분야입니다.",
  "종이 문서 보관 전용 시스템": "리눅스의 대표 활용 분야로 보기 어렵습니다.",
  패키지: "프로그램 설치와 관리를 위한 소프트웨어 묶음입니다. 커널처럼 하드웨어 자원을 직접 관리하는 핵심은 아닙니다.",
  "데스크톱 테마": "GUI의 모양을 바꾸는 요소이며, 하드웨어 자원 관리를 담당하는 핵심 부분은 아닙니다.",
  daemon: "백그라운드에서 동작하는 서비스 프로세스를 뜻합니다. swap이나 파일 시스템 종류와는 다른 개념입니다.",
  MBR: "디스크의 부트 레코드/파티션 정보와 관련된 영역이며, swap과는 다른 개념입니다.",
  ISO9660: "CD-ROM 매체에서 쓰이는 파일 시스템입니다.",
  "HFS+": "macOS 계열에서 사용된 파일 시스템입니다.",
  FAT12: "FAT 계열 파일 시스템이며, 리눅스의 대표 저널링 파일 시스템은 ext4입니다.",
  GNOME: "대표적인 리눅스 데스크톱 환경입니다.",
  KDE: "대표적인 리눅스 데스크톱 환경입니다.",
  GRUB: "리눅스에서 널리 쓰이는 대표적인 부트 로더입니다.",
  DISPLAY: "X 윈도에서 그래픽 프로그램이 출력될 X 서버 위치를 지정하는 환경 변수입니다.",
  "SetUID": "실행 파일을 파일 소유자의 권한으로 실행되게 하는 특수 권한입니다.",
  "SetGID": "실행 파일은 그룹 권한으로 실행되게 하고, 디렉터리는 새 파일의 그룹 상속에 영향을 줍니다.",
  "Sticky Bit": "공유 디렉터리에서 파일 소유자나 root만 삭제할 수 있게 제한하는 특수 권한입니다.",
  SIGTERM: "프로세스에 정상 종료를 요청하는 기본 종료 시그널입니다.",
  SIGKILL: "프로세스를 강제로 종료하는 시그널입니다.",
  SIGINT: "Ctrl+C로 전달되는 인터럽트 시그널입니다.",
  PID: "프로세스를 식별하는 번호입니다.",
  PPID: "부모 프로세스의 식별 번호입니다.",
  inode: "파일의 권한, 소유자, 크기, 데이터 블록 위치 같은 메타데이터를 저장합니다.",
  swap: "물리 메모리가 부족할 때 보조로 사용하는 디스크 영역입니다.",
  ext4: "리눅스에서 널리 쓰이는 저널링 파일 시스템입니다.",
  XFS: "대용량 환경에서 많이 쓰이는 저널링 파일 시스템입니다.",
  SSH: "암호화된 원격 접속과 명령 실행을 제공하는 프로토콜입니다.",
  Telnet: "암호화되지 않은 원격 접속 프로토콜입니다.",
  DNS: "도메인 이름을 IP 주소로 변환하는 시스템입니다.",
  TCP: "연결 지향적이고 신뢰성 있는 전송을 제공하는 프로토콜입니다.",
  UDP: "연결 설정 없이 데이터를 보내는 비연결형 전송 프로토콜입니다.",
  "RAID 0": "스트라이핑 방식으로 성능을 높일 수 있지만 장애 복구 기능은 없습니다.",
  "RAID 1": "미러링 방식으로 같은 데이터를 복제해 안정성을 높입니다.",
  "RAID 5": "분산 패리티를 사용하며 최소 3개의 디스크가 필요합니다.",
  "RAID 6": "이중 패리티를 사용하며 최소 4개의 디스크가 필요합니다.",
  "RAID 10": "RAID 1 미러링과 RAID 0 스트라이핑을 결합한 방식입니다.",
  LVM: "디스크나 파티션을 물리 볼륨, 볼륨 그룹, 논리 볼륨으로 유연하게 관리하는 기능입니다.",
  PV: "Physical Volume의 약자로 LVM에서 사용할 물리 디스크나 파티션입니다.",
  VG: "Volume Group의 약자로 여러 PV를 묶은 저장 공간 풀입니다.",
  LV: "Logical Volume의 약자로 파일 시스템을 만들고 마운트할 수 있는 논리 공간입니다.",
  FTP: "파일 전송 프로토콜이며 기본 제어 포트는 21번입니다. 암호화 원격 접속의 대표 정답은 SSH입니다.",
  SMTP: "메일 전송 프로토콜이며 기본 포트는 25번입니다.",
  HTTP: "웹 통신 프로토콜이며 기본 포트는 80번입니다.",
  HTTPS: "암호화된 웹 통신 프로토콜이며 기본 포트는 443번입니다.",
  POP3: "메일 수신 프로토콜이며 기본 포트는 110번입니다.",
  IMAP: "메일 수신 프로토콜이며 기본 포트는 143번입니다.",
};

const symbolExplanations = {
  ">": "표준 출력을 파일로 보내며 기존 파일 내용은 덮어씁니다.",
  ">>": "표준 출력을 파일 끝에 추가합니다.",
  "<": "파일 내용을 표준 입력으로 전달합니다.",
  "|": "앞 명령의 표준 출력을 다음 명령의 표준 입력으로 연결합니다.",
  "&": "명령을 백그라운드로 실행할 때 사용합니다.",
  "#": "셸 스크립트나 설정 파일에서 주석 시작 기호로 자주 쓰이며, 백그라운드 실행 기호는 아닙니다.",
};

const optionExplanations = {
  "-a": "all의 의미로 숨김 항목까지 포함하는 옵션으로 자주 쓰입니다.",
  "-l": "long format의 의미로 자세한 목록 정보를 출력하는 옵션으로 자주 쓰입니다.",
  "-R": "recursive의 의미로 하위 디렉터리까지 재귀적으로 처리하는 옵션으로 자주 쓰입니다.",
  "-h": "human-readable의 의미로 사람이 읽기 쉬운 단위를 표시할 때 자주 쓰입니다.",
  "-i": "interactive 또는 inode 등 명령에 따라 의미가 달라집니다. rm에서는 삭제 전 확인, df에서는 inode 확인과 관련됩니다.",
  "-f": "force 또는 file 등 명령에 따라 의미가 달라집니다. tar에서는 파일 이름 지정 옵션입니다.",
  "-r": "recursive 또는 reverse 등 명령에 따라 의미가 달라집니다.",
  "-n": "number 관련 옵션으로 자주 쓰이며, grep -n은 줄 번호 출력입니다.",
  "-v": "verbose의 의미로 처리 과정을 자세히 출력하는 옵션으로 자주 쓰입니다.",
  "-c": "명령에 따라 count/create 등으로 쓰이며, tar에서는 아카이브 생성입니다.",
  "-x": "tar에서는 아카이브 해제를 의미합니다.",
  "-t": "tar에서는 아카이브 내부 목록 확인을 의미합니다.",
  "-z": "tar에서 gzip 압축 또는 해제와 함께 사용합니다.",
  "-j": "tar에서 bzip2 압축 또는 해제와 함께 사용합니다.",
  "-J": "tar에서 xz 압축 또는 해제와 함께 사용합니다.",
};

function isIPv4(choice) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(choice);
}

function findKnownExplanation(text, dictionary) {
  const exact = dictionary[text];
  if (exact) return exact;
  const key = Object.keys(dictionary).find((term) => term.length >= 3 && text.includes(term));
  return key ? dictionary[key] : "";
}

function parseIPv4(choice) {
  if (!isIPv4(choice)) return null;
  const parts = choice.split(".").map(Number);
  if (parts.some((part) => part < 0 || part > 255)) return null;
  return parts;
}

function isPrivateIPv4(parts) {
  return (
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168)
  );
}

function describeIPv4(choice, question) {
  const parts = parseIPv4(choice);
  if (!parts) return "";

  const isPrivate = isPrivateIPv4(parts);
  const isLoopback = parts[0] === 127;
  const isNetworkLike = parts[3] === 0;
  const isBroadcastLike = parts[3] === 255;
  const lowerQuestion = question.question.toLowerCase();

  if (isLoopback) {
    return `${choice}은(는) 자기 자신을 가리키는 루프백 주소입니다. 사설 LAN 대역을 고르는 문제와는 기준이 다릅니다.`;
  }

  if (lowerQuestion.includes("사설")) {
    if (isPrivate && isNetworkLike) {
      return `${choice}은(는) 192.168.0.0/16 사설 대역에 속할 수 있지만, 보통 /24 네트워크 주소처럼 쓰이는 값입니다. 이 문제에서는 일반 호스트 주소 예시를 기준으로 구분해야 합니다.`;
    }
    if (isPrivate) {
      return `${choice}은(는) 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 중 하나에 속하는 사설 IPv4 주소입니다.`;
    }
    return `${choice}은(는) 10/8, 172.16/12, 192.168/16 사설 IPv4 대역에 속하지 않습니다.`;
  }

  if (lowerQuestion.includes("네트워크 주소")) {
    return isNetworkLike
      ? `${choice}은(는) 호스트 부분이 0인 형태라 네트워크 주소로 볼 수 있습니다.`
      : `${choice}은(는) 호스트 부분이 남아 있는 주소라 네트워크 주소가 아닙니다.`;
  }

  if (lowerQuestion.includes("브로드캐스트")) {
    return isBroadcastLike
      ? `${choice}은(는) /24 기준에서 호스트 부분이 모두 1인 브로드캐스트 주소 형태입니다.`
      : `${choice}은(는) /24 기준 브로드캐스트 주소 형태가 아닙니다.`;
  }

  return isPrivate
    ? `${choice}은(는) 사설 IPv4 주소 대역에 속합니다.`
    : `${choice}은(는) 대표적인 사설 IPv4 대역에 속하지 않습니다.`;
}

function describeCidr(choice) {
  if (!/^\/\d{1,2}$/.test(choice)) return "";
  const bits = Number(choice.slice(1));
  if (bits === 24) return "/24는 네트워크 부분이 24비트이며 255.255.255.0과 같습니다.";
  if (bits === 16) return "/16은 네트워크 부분이 16비트이며 255.255.0.0과 같습니다.";
  if (bits === 8) return "/8은 네트워크 부분이 8비트이며 255.0.0.0과 같습니다.";
  if (bits === 32) return "/32는 단일 호스트 주소 하나를 가리킬 때 사용됩니다.";
  return `${choice}는 네트워크 부분이 ${bits}비트라는 뜻입니다.`;
}

function describePermission(choice) {
  if (!/^[0-7]{3,4}$/.test(choice)) return "";
  const short = choice.length === 4 ? choice.slice(1) : choice;
  const names = ["소유자", "그룹", "기타 사용자"];
  const parts = short.split("").map((digit, index) => {
    const value = Number(digit);
    const perms = `${value & 4 ? "읽기" : ""}${value & 2 ? "/쓰기" : ""}${value & 1 ? "/실행" : ""}`.replace(/^\//, "");
    return `${names[index]} ${perms || "권한 없음"}`;
  });
  return `${choice} 권한은 ${parts.join(", ")}을 의미합니다.`;
}

function describeCommand(text) {
  const known = findKnownExplanation(text, commandExplanations);
  if (known) return known;

  if (text.startsWith("tar ")) {
    const parts = [];
    if (text.includes("-c")) parts.push("-c는 아카이브 생성");
    if (text.includes("-x")) parts.push("-x는 아카이브 해제");
    if (text.includes("-t")) parts.push("-t는 내부 목록 확인");
    if (text.includes("-z")) parts.push("-z는 gzip 사용");
    if (text.includes("-j")) parts.push("-j는 bzip2 사용");
    if (text.includes("-J")) parts.push("-J는 xz 사용");
    if (text.includes("-v")) parts.push("-v는 처리 과정 출력");
    if (text.includes("-f")) parts.push("-f는 파일명 지정");
    return parts.length ? `tar 명령 조합입니다. ${parts.join(", ")}을 의미합니다.` : "tar는 파일을 아카이브로 묶거나 해제하는 명령입니다.";
  }

  if (text.startsWith("find ")) return "find는 파일 이름, 종류, 크기, 시간 등 조건으로 파일을 검색하는 명령입니다.";
  if (text.startsWith("grep ")) return "grep은 파일 내용에서 문자열이나 패턴이 포함된 줄을 검색하는 명령입니다.";
  if (text.startsWith("chmod ")) return "chmod는 파일이나 디렉터리 권한을 변경하는 명령입니다.";
  if (text.startsWith("chown ")) return "chown은 파일이나 디렉터리 소유자를 변경하는 명령입니다.";
  if (text.startsWith("mount ")) return "mount는 파일 시스템을 디렉터리 트리에 연결하는 명령입니다.";
  if (text.startsWith("umount ")) return "umount는 마운트된 파일 시스템을 분리하는 명령입니다.";

  return "";
}

function describeTextChoice(text) {
  const known = findKnownExplanation(text, termExplanations);
  if (known) return known;

  if (text.includes("표준 출력") && text.includes("표준 오류")) {
    return "표준 출력과 표준 오류를 함께 파일로 보내려면 보통 `명령 > 파일 2>&1` 또는 `명령 >> 파일 2>&1` 형태가 필요합니다.";
  }
  if (text.includes("파일 내용") && text.includes("이어") && text.includes("저장")) {
    return "cat file1 file2는 두 파일 내용을 이어 표준 출력으로 보내고, `>`는 그 출력을 지정한 파일에 저장합니다.";
  }
  if (text.includes("삭제 전 확인")) {
    return "삭제 전 확인 질문은 보통 `rm -i`와 관련됩니다. cat과 리다이렉션의 결과가 아닙니다.";
  }
  if (text.includes("앞 명령 성공") || text.includes("다음 명령을 이어 실행")) {
    return "`&&`는 앞 명령이 성공했을 때 다음 명령을 실행하는 연산자입니다. `>` 리다이렉션과 구분해야 합니다.";
  }
  if (text.includes("디렉터리를 만든다")) {
    return "디렉터리 생성은 `mkdir`의 기능입니다. `cat ... > 파일`은 출력 결과를 파일에 저장합니다.";
  }
  if (text.includes("권한을 바꾼다")) {
    return "권한 변경은 `chmod`의 기능입니다. `cat`은 파일 내용을 출력하는 명령입니다.";
  }
  if (text.includes("파일을 삭제") || text.includes("삭제한다")) {
    return "파일 삭제는 `rm`의 기능입니다. `cat`과 `>`는 파일 내용을 출력하고 저장하는 흐름입니다.";
  }
  if (text.includes("스트라이핑") && text.includes("장애 복구")) {
    return "RAID 0의 핵심 설명입니다. 데이터를 나누어 저장해 성능을 높일 수 있지만 장애 복구 기능은 없습니다.";
  }
  if (text.includes("동일 데이터") || text.includes("복제해 저장")) {
    return "RAID 1 미러링의 핵심 설명입니다. 같은 데이터를 복제해 저장해 안정성을 높입니다.";
  }
  if (text.includes("분산 패리티") || (text.includes("최소 3") && text.includes("패리티"))) {
    return "RAID 5의 핵심 설명입니다. 분산 패리티를 사용하며 최소 3개의 디스크가 필요합니다.";
  }
  if (text.includes("이중 패리티") || text.includes("두 디스크 장애")) {
    return "RAID 6의 핵심 설명입니다. 이중 패리티로 두 개 디스크 장애까지 견딜 수 있으며 최소 4개의 디스크가 필요합니다.";
  }
  if (text.includes("미러링") && text.includes("스트라이핑")) {
    return "RAID 10의 핵심 설명입니다. RAID 1의 미러링과 RAID 0의 스트라이핑을 결합한 방식입니다.";
  }
  if (text.includes("최소 4") && text.includes("디스크")) {
    return "최소 4개 디스크 조건은 RAID 6이나 RAID 10에서 자주 나오는 특징입니다. RAID 0의 핵심은 스트라이핑과 장애 복구 없음입니다.";
  }
  if (text.includes("파일 압축")) {
    return "파일 압축은 gzip, bzip2, xz, tar 같은 압축/아카이브 도구와 관련되며 RAID 설명이 아닙니다.";
  }
  if (text.includes("네트워크 주소 변환")) {
    return "네트워크 주소 변환은 NAT와 관련된 네트워크 개념이며 RAID 설명이 아닙니다.";
  }

  const rules = [
    [/소스 코드.*금지|공개.*금지/, "오픈소스/GPL의 핵심은 소스 코드 사용, 수정, 재배포의 자유이므로 '공개 금지' 설명은 맞지 않습니다."],
    [/개인 사용만/, "리눅스와 GPL은 개인 사용만 허용하는 개념이 아니며 사용, 수정, 배포 범위가 더 넓습니다."],
    [/상업적.*금지/, "GPL과 오픈소스는 상업적 이용 자체를 전면 금지하는 개념이 아닙니다."],
    [/단일 사용자|단일 작업/, "리눅스의 대표 특징은 다중 사용자와 다중 작업 지원입니다."],
    [/전용 하드웨어/, "리눅스는 특정 회사 전용 하드웨어에만 묶인 운영체제가 아니라 다양한 하드웨어에서 동작합니다."],
    [/암호화되지 않은/, "보안 원격 접속 문제에서는 암호화 여부가 핵심이며, 암호화되지 않은 방식은 Telnet 계열입니다."],
    [/연결 지향/, "연결 지향성과 신뢰성 있는 전송은 TCP의 핵심 특징입니다."],
    [/비연결형/, "비연결형 전송은 UDP의 핵심 특징입니다."],
    [/도메인.*IP/, "도메인 이름을 IP 주소로 바꾸는 것은 DNS의 역할입니다."],
    [/부팅.*자동 시작/, "부팅 시 자동 시작 설정은 systemctl enable과 관련됩니다. 즉시 시작은 systemctl start입니다."],
    [/즉시 시작|서비스.*시작/, "서비스를 지금 바로 시작하는 것은 systemctl start와 관련됩니다. 자동 시작 설정과 구분해야 합니다."],
    [/정상 종료/, "정상 종료 요청은 SIGTERM 또는 kill 기본 동작과 관련됩니다."],
    [/강제 종료/, "강제 종료는 SIGKILL 또는 kill -9와 관련됩니다."],
    [/같은 inode|하드 링크/, "같은 inode를 공유하는 링크는 하드 링크입니다."],
    [/원본 경로|심볼릭 링크|바로가기/, "원본 경로를 가리키는 바로가기 파일은 심볼릭 링크입니다."],
    [/패키지.*의존성|의존성/, "의존성은 패키지가 동작하기 위해 필요한 다른 패키지와의 관계입니다."],
  ];

  const matched = rules.find(([pattern]) => pattern.test(text));
  return matched ? matched[1] : "";
}

function describeChoice(choice, question) {
  if (choice === undefined || choice === null) return "";
  const text = String(choice).trim();

  if (symbolExplanations[text]) return symbolExplanations[text];
  if (optionExplanations[text]) return optionExplanations[text];

  const pathKnown = findKnownExplanation(text, pathExplanations);
  if (pathKnown) return pathKnown;

  const commandDescription = describeCommand(text);
  if (commandDescription) return commandDescription;

  const termKnown = findKnownExplanation(text, termExplanations);
  if (termKnown) return termKnown;

  const exact = explainChoice(text);
  if (exact) return exact;

  const ipDescription = describeIPv4(text, question);
  if (ipDescription) return ipDescription;

  const cidrDescription = describeCidr(text);
  if (cidrDescription) return cidrDescription;

  if (question.question.includes("포트") && portExplanations[text]) {
    return portExplanations[text];
  }

  if (question.question.includes("권한") || question.question.includes("chmod") || question.question.includes("umask")) {
    const permissionDescription = describePermission(text);
    if (permissionDescription) return permissionDescription;
  }

  if (/^\/[\w./-]+$/.test(text)) {
    return `${text}은(는) 리눅스의 경로 또는 설정 파일입니다. 이 문제에서는 해당 경로가 저장하는 정보나 용도가 정답 조건과 맞는지 확인해야 합니다.`;
  }

  if (/^[a-z][\w.-]*(\s+[-\w./*'":=]+){0,4}$/.test(text)) {
    const correctChoice = question.choices[question.answer];
    return `${text}은(는) 이 문항에서 묻는 기능을 수행하는 표준 답으로 보기 어렵습니다. 이 문제의 정답은 "${correctChoice}"이며, 근거는 ${question.explanation}`;
  }

  return describeTextChoice(text);
}

function buildFallbackDescription(choice, question, index) {
  const correctChoice = question.choices[question.answer];
  const isCorrect = index === question.answer;
  const base = isCorrect
    ? `이 보기가 정답입니다. ${question.explanation}`
    : `"${choice}"은(는) 이 문항의 정답 조건과 다릅니다. 정답은 "${correctChoice}"이며, 기준은 ${question.explanation}`;

  if (question.category === "리눅스 일반") {
    return `${base} 리눅스 일반 문제는 인물, 배포판 계열, 운영체제 구성 요소처럼 서로 다른 개념을 구분하는 것이 핵심입니다.`;
  }
  if (question.category === "기본 명령어") {
    return `${base} 명령어 문제는 명령 이름이 아니라 실제 수행 기능을 기준으로 비교해야 합니다.`;
  }
  if (question.category === "파일 시스템") {
    return `${base} 파일 시스템 문제는 경로, 장치, 파일 시스템 종류, 마운트 용도를 구분해야 합니다.`;
  }
  if (question.category === "보안") {
    return `${base} 보안 문제는 권한, 소유자, 사용자/그룹 관리, 인증 파일의 역할을 구분해야 합니다.`;
  }
  if (question.category === "프로세스") {
    return `${base} 프로세스 문제는 프로세스 확인, 작업 제어, 시그널, 서비스 관리를 구분해야 합니다.`;
  }
  if (question.category === "네트워크") {
    return `${base} 네트워크 문제는 명령어, 포트, 프로토콜, 설정 파일의 역할을 구분해야 합니다.`;
  }
  if (question.category === "패키지 관리") {
    return `${base} 패키지 문제는 배포판 계열별 도구와 압축/아카이브 옵션을 구분해야 합니다.`;
  }

  return base;
}

function getQuestionFocus(question) {
  const text = question.question;
  if (text.includes("사설") && text.includes("IPv4")) {
    return "사설 IPv4는 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 대역인지 확인합니다.";
  }
  if (text.includes("네트워크 주소")) {
    return "네트워크 주소는 주어진 프리픽스에서 호스트 비트를 모두 0으로 둔 주소입니다.";
  }
  if (text.includes("브로드캐스트")) {
    return "브로드캐스트 주소는 주어진 프리픽스에서 호스트 비트를 모두 1로 둔 주소입니다.";
  }
  if (text.includes("포트")) {
    return "서비스 이름과 기본 포트 번호를 정확히 연결해야 합니다.";
  }
  if (text.includes("명령") || text.includes("명령어")) {
    return "명령어 문제는 이름이 비슷한 보기보다 실제 기능이 문제 조건과 일치하는지 봐야 합니다.";
  }
  if (text.includes("파일") || text.includes("디렉터리") || text.includes("경로")) {
    return "파일/디렉터리 문제는 해당 경로가 어떤 정보를 저장하는지 기준으로 구분해야 합니다.";
  }
  if (text.includes("권한") || text.includes("chmod") || text.includes("umask")) {
    return "권한 문제는 r=4, w=2, x=1의 합과 소유자/그룹/기타 사용자 순서를 기준으로 계산합니다.";
  }
  return "문제에서 묻는 핵심 조건과 각 보기의 실제 의미를 비교해야 합니다.";
}

const labels = ["①", "②", "③", "④"];

export function buildChoiceExplanationLines(question, selected) {
  return question.choices.map((choice, index) => {
    const prefix = `${labels[index]} ${choice}`;
    const tags = [
      index === question.answer ? "정답" : "",
      selected === index && selected !== question.answer ? "내 선택" : "",
    ].filter(Boolean);
    const description = describeChoice(choice, question) || buildFallbackDescription(choice, question, index);
    return `${prefix}${tags.length ? ` (${tags.join(", ")})` : ""}: ${description}`;
  });
}

export function buildWrongChoiceReason(question, selected) {
  if (selected === undefined) {
    return "이 문항은 답을 선택하지 않아 오답으로 처리됩니다.\n정답 근거를 확인하고 다시 풀어보세요.";
  }

  const selectedChoice = question.choices[selected];
  const correctChoice = question.choices[question.answer];
  const selectedDescription = describeChoice(selectedChoice, question);
  const correctDescription = describeChoice(correctChoice, question);

  return [
    `선택한 답: "${selectedChoice}"`,
    selectedDescription
      ? `왜 오답인가: ${selectedDescription}`
      : `왜 오답인가: ${buildFallbackDescription(selectedChoice, question, selected)}`,
    correctDescription
      ? `정답 근거: ${correctDescription}`
      : `정답 근거: 정답은 "${correctChoice}"입니다. ${question.explanation}`,
    `시험 포인트: ${getQuestionFocus(question)}`,
  ].join("\n");
}
