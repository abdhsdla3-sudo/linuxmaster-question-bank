export const EXAM_DIFFICULTY_RATIO = {
  "기초": 0.25,
  "중간": 0.35,
  "실전": 0.15,
  "헷갈림": 0.15,
  "어려움": 0.1,
};

export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function getConceptKey(question) {
  const correctChoice = question.choices[question.answer];
  return `${question.category}|${correctChoice}|${question.explanation}`;
}

export function pickDifficultyMix(questionList, target) {
  const picked = [];
  const usedIds = new Set();
  const difficulties = Object.entries(EXAM_DIFFICULTY_RATIO);

  difficulties.forEach(([difficulty, ratio], index) => {
    const remainingSlots = target - picked.length;
    if (remainingSlots <= 0) return;
    const count = index === difficulties.length - 1 ? remainingSlots : Math.round(target * ratio);
    shuffle(questionList)
      .filter((question) => question.difficulty === difficulty && !usedIds.has(question.id))
      .slice(0, Math.min(count, remainingSlots))
      .forEach((question) => {
        picked.push(question);
        usedIds.add(question.id);
      });
  });

  if (picked.length < target) {
    shuffle(questionList)
      .filter((question) => !usedIds.has(question.id))
      .slice(0, target - picked.length)
      .forEach((question) => picked.push(question));
  }

  return shuffle(picked);
}

export function pickUniqueDifficultyMixedQuestions(questionList, size) {
  const groups = new Map();

  shuffle(questionList).forEach((question) => {
    const key = getConceptKey(question);
    groups.set(key, [...(groups.get(key) ?? []), question]);
  });

  const representatives = shuffle([...groups.values()]).map((group) => shuffle(group)[0]);
  return pickDifficultyMix(representatives, Math.min(size, representatives.length));
}
