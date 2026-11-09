export function isComplete(test, answers) {
  return test.questions.every((question) => answers?.[question.id]);
}

export function scoreTest(test, answers) {
  const totals = Object.fromEntries(test.characters.map((character) => [character.id, 0]));
  const hits = Object.fromEntries(test.characters.map((character) => [character.id, 0]));
  const contributions = [];

  for (const question of test.questions) {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (!option) continue;
    for (const [characterId, points] of Object.entries(option.scores)) {
      totals[characterId] = (totals[characterId] || 0) + points;
      if (points >= 3) hits[characterId] += 1;
      contributions.push({
        characterId,
        points,
        scene: question.scene,
        question: question.text,
        answer: option.text,
        link: option.links[characterId],
      });
    }
  }

  const maxFor = (characterId) =>
    test.questions.reduce((sum, question) => {
      const best = Math.max(0, ...question.options.map((option) => option.scores[characterId] || 0));
      return sum + best;
    }, 0);

  const ranked = test.characters
    .map((character) => ({
      character,
      points: totals[character.id] || 0,
      hits: hits[character.id] || 0,
      max: maxFor(character.id),
    }))
    .sort((a, b) => b.points - a.points || b.hits - a.hits);

  const winner = ranked[0];
  const reasons = contributions
    .filter((item) => item.characterId === winner.character.id && item.link)
    .sort((a, b) => b.points - a.points);

  return { ranked, winner, reasons };
}
