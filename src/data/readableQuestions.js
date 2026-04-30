const generatedQuestionStartId = 301;

const subjectPatterns = [
  /^(.*?)에 대한 설명으로.*것/,
  /^다음 중\s*(.*?)으로 가장.*것/,
  /^(.*?)를 묻는 문제.*것/,
  /^리눅스.*범위에서\s*(.*?)와 가장.*것/,
  /^(.*?)에 대한 올바른 설명/,
];

function cleanSubject(subject) {
  return subject
    .replace(/\s+/g, " ")
    .replace(/[?？]\s*$/, "")
    .replace(/(을|를)\/$/u, "")
    .replace(/(을|를)$/u, "")
    .replace(/란$/, "")
    .trim();
}

function extractSubject(questionText) {
  for (const pattern of subjectPatterns) {
    const match = questionText.match(pattern);
    if (match?.[1]) {
      return cleanSubject(match[1]);
    }
  }

  return "";
}

function makeReadableGeneratedQuestion(question) {
  const subject = extractSubject(question.question);

  if (!subject) {
    return question.question;
  }

  if (subject.includes("인물")) {
    return `다음 설명에 해당하는 인물로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("명령")) {
    return `다음 설명에 해당하는 리눅스 명령어로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("옵션")) {
    return `다음 설명에 해당하는 옵션으로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("확장자")) {
    return `다음 설명에 해당하는 파일 확장자로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("디렉터리") || subject.includes("위치") || subject.includes("파일")) {
    return `다음 설명에 해당하는 파일 또는 디렉터리로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("포트")) {
    return `다음 설명에 해당하는 포트 번호로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("권한") || subject.includes("숫자")) {
    return `다음 설명에 해당하는 권한 값으로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("계열") || subject.includes("배포판")) {
    return `다음 설명에 해당하는 리눅스 배포판 또는 계열로 알맞은 것은?\n${subject}`;
  }

  if (subject.includes("특징") || subject.includes("역할") || subject.includes("용도")) {
    return `다음 중 ${subject}에 대한 설명으로 알맞은 것은?`;
  }

  return `다음 중 ${subject}에 해당하는 것으로 알맞은 것은?`;
}

function polishCommonQuestionText(questionText) {
  return questionText
    .replace(/가장 관련 깊은 것/g, "가장 알맞은 것")
    .replace(/가장 관련 있는 것/g, "가장 알맞은 것")
    .replace(/정답으로 알맞은 것/g, "알맞은 것")
    .replace(/고르시오\./g, "고르세요.")
    .trim();
}

export function makeReadableQuestion(question) {
  const readableQuestion =
    question.id >= generatedQuestionStartId ? makeReadableGeneratedQuestion(question) : question.question;

  return polishCommonQuestionText(readableQuestion);
}
