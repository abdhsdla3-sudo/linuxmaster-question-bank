function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function unique(items) {
  return [...new Set(items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean))];
}

function getCorrectChoice(question) {
  return question.choices[question.answer];
}

function getChoiceType(choice) {
  if (/^\/\d{1,2}$/.test(choice)) return "cidr";
  if (/^\d{1,3}(\.\d{1,3}){3}(\/\d{1,2})?$/.test(choice)) return "ip";
  if (/^\.[\w.-]+$/.test(choice)) return "extension";
  if (/^-/.test(choice)) return "option";
  if (/^\d+(\.\d+){0,3}(\/\d+)?$/.test(choice)) return "number";
  if (/^\/[\w./-]*$/.test(choice)) return "path";
  if (/^[A-Z0-9]{2,}$/.test(choice)) return "protocol";
  if (/^[a-z][\w.-]{1,}(\s+[-\w./*'":=]+){0,3}$/.test(choice)) return "command";
  return "text";
}

function getTextSubtype(choice) {
  const text = String(choice ?? "").trim();
  if (/[가-힣].*(다|한다|된다|있다|없다|이다|한다)$/.test(text) || text.length >= 18) return "sentence";
  return "term";
}

function getDistractorCandidates(question, questionPool) {
  const correctChoice = getCorrectChoice(question);
  const correctType = getChoiceType(correctChoice);
  const correctTextSubtype = correctType === "text" ? getTextSubtype(correctChoice) : "";
  const originalDistractors = question.choices.filter((choice, index) => index !== question.answer);

  if (["ip", "cidr", "number"].includes(correctType)) {
    return unique(originalDistractors).filter((choice) => choice !== correctChoice);
  }

  const sameCategoryQuestions = questionPool.filter(
    (candidate) => candidate.id !== question.id && candidate.category === question.category,
  );

  const sameCategoryCorrectAnswers = sameCategoryQuestions.map(getCorrectChoice);
  const typedCandidates =
    correctType === "text"
      ? sameCategoryCorrectAnswers.filter(
          (choice) => getChoiceType(choice) === "text" && getTextSubtype(choice) === correctTextSubtype,
        )
      : sameCategoryCorrectAnswers.filter((choice) => getChoiceType(choice) === correctType);

  const typedOriginalDistractors =
    correctType === "text"
      ? originalDistractors.filter((choice) => getChoiceType(choice) === "text" && getTextSubtype(choice) === correctTextSubtype)
      : originalDistractors.filter((choice) => getChoiceType(choice) === correctType);

  const fallbackOriginalDistractors = originalDistractors.filter((choice) => choice !== correctChoice);

  return unique([...typedOriginalDistractors, ...typedCandidates, ...fallbackOriginalDistractors]).filter(
    (choice) => choice !== correctChoice,
  );
}

export function buildChoiceVariant(question, questionPool) {
  const correctChoice = getCorrectChoice(question);
  const distractors = shuffle(getDistractorCandidates(question, questionPool)).slice(0, 3);

  if (distractors.length < 3) {
    const mixedChoices = shuffle(question.choices);
    return {
      ...question,
      choices: mixedChoices,
      answer: mixedChoices.indexOf(correctChoice),
    };
  }

  const mixedChoices = shuffle([correctChoice, ...distractors]);
  return {
    ...question,
    choices: mixedChoices,
    answer: mixedChoices.indexOf(correctChoice),
  };
}

export function buildChoiceVariants(questions, questionPool) {
  return questions.map((question) => buildChoiceVariant(question, questionPool));
}
