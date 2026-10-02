const dom = {
  form: document.getElementById("quizForm"),
  total: document.getElementById("quizTotal"),
  bar: document.getElementById("progressBar"),
  percent: document.getElementById("progressPercent"),
  counter: document.getElementById("progressCounter"),
  submit: document.getElementById("submitBtn"),
  warning: document.getElementById("quizWarning"),
  result: document.getElementById("result"),
  resultSection: document.getElementById("hasil"),
  badge: document.getElementById("resultBadge"),
  name: document.getElementById("resultName"),
  tagline: document.getElementById("resultTagline"),
  description: document.getElementById("resultDescription"),
  share: document.getElementById("resultShare"),
  ranking: document.getElementById("resultRanking"),
  chips: document.getElementById("resultFeatures"),
  traits: document.getElementById("resultTraits"),
  profile: document.getElementById("resultProfile"),
  restart: document.getElementById("restartBtn")
};

const chrome = {
  toggle: document.getElementById("navToggle"),
  menu: document.getElementById("nav"),
  toTop: document.getElementById("toTop")
};

const state = {
  answers: {},
  type: null
};

const NEUTRAL = 3;

function hasAnswer(questionId) {
  return Object.prototype.hasOwnProperty.call(state.answers, questionId);
}

function readForm() {
  const next = {};

  dom.form.querySelectorAll('input[type="radio"]:checked').forEach((input) => {
    next[input.name] = Number(input.value);
  });

  return next;
}

function buildOption(question, option) {
  const label = document.createElement("label");
  label.className = "scale-option";

  const input = document.createElement("input");
  input.type = "radio";
  input.name = question.id;
  input.value = String(option.value);

  const dot = document.createElement("span");
  dot.className = "scale-option__dot";
  dot.innerHTML = '<i class="fa-solid fa-check"></i>';

  const text = document.createElement("span");
  text.className = "scale-option__text";
  text.textContent = option.short;

  label.append(input, dot, text);

  return label;
}

function buildQuestion(question, index) {
  const item = document.createElement("div");
  item.className = "question";
  item.dataset.question = question.id;

  const head = document.createElement("p");
  head.className = "question__number";
  head.textContent = String(index + 1).padStart(2, "0");

  const text = document.createElement("p");
  text.className = "question__text";
  text.id = question.id + "-text";
  text.textContent = question.text;

  const scale = document.createElement("div");
  scale.className = "scale";
  scale.setAttribute("role", "radiogroup");
  scale.setAttribute("aria-labelledby", question.id + "-text");
  SCALE.forEach((option) => scale.append(buildOption(question, option)));

  item.append(head, text, scale);

  return item;
}

function buildFieldset(config) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "question-group";

  const legend = document.createElement("legend");
  legend.className = "question-group__title";
  legend.textContent = config.title;

  const note = document.createElement("p");
  note.className = "question-group__note";
  note.textContent = config.note;

  const grid = document.createElement("div");
  grid.className = "question-list";
  config.questions.forEach((question, index) => grid.append(buildQuestion(question, index)));

  fieldset.append(legend, note, grid);

  return fieldset;
}

function renderQuestions() {
  dom.form.append(
    buildFieldset({
      title: "Bagian 1 — Ciri dan karakter",
      note: "Jawab sesuai apa yang paling sering Anda lakukan.",
      questions: QUESTIONS
    }),
    buildFieldset({
      title: "Bagian 2 — Gaya hidup",
      note: "Bagian ini tidak menentukan golongan darah, hanya profil tambahan.",
      questions: PROFILE_QUESTIONS
    })
  );

  dom.total.textContent = String(QUESTIONS.length + PROFILE_QUESTIONS.length);
}

function updateProgress() {
  const total = QUESTIONS.length + PROFILE_QUESTIONS.length;
  const answered = Object.keys(state.answers).length;
  const ratio = Math.round((answered / total) * 100);

  dom.bar.style.width = ratio + "%";
  dom.percent.textContent = ratio + "%";
  dom.counter.textContent = answered + " dari " + total + " terjawab";
  dom.submit.disabled = answered === 0;

  return answered;
}

function markAnswered() {
  state.answers = readForm();

  dom.form.querySelectorAll(".question").forEach((item) => {
    item.classList.toggle("is-answered", hasAnswer(item.dataset.question));
  });

  dom.warning.hidden = true;

  return updateProgress();
}

function firstUnanswered() {
  return dom.form.querySelector(".question:not(.is-answered)");
}

function computeScores() {
  const scores = { A: 0, B: 0, AB: 0, O: 0 };
  const features = {};

  QUESTIONS.forEach((question) => {
    if (!hasAnswer(question.id)) {
      return;
    }

    const delta = state.answers[question.id] - NEUTRAL;

    TYPES.forEach((type) => {
      scores[type] += FEATURES[question.feature][type] * delta;
    });

    features[question.feature] = (features[question.feature] || 0) + delta;
  });

  return { scores, features };
}

function topFeatures(features, type) {
  return Object.keys(FEATURES)
    .map((key) => ({
      label: FEATURES[key].label,
      value: (features[key] || 0) * FEATURES[key][type]
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

function ranking(scores) {
  const values = TYPES.map((type) => scores[type]);
  const best = Math.max(...values);
  const worst = Math.min(...values);

  return TYPES.map((type) => ({
    type,
    score: scores[type],
    percent: best === worst ? 25 : Math.round(((scores[type] - worst) / (best - worst)) * 100)
  })).sort((a, b) => b.score - a.score);
}

function shareOf(ranked) {
  const positive = ranked.map((item) => Math.max(item.score, 0));
  const total = positive.reduce((sum, value) => sum + value, 0);
  const best = ranked[0].score;

  return total > 0 && best > 0 ? Math.round((best / total) * 100) : 0;
}

function buildProfile() {
  const sums = {};

  PROFILE_QUESTIONS.forEach((question) => {
    if (!hasAnswer(question.id)) {
      return;
    }

    const key = question.dimension;
    sums[key] = sums[key] || [];
    sums[key].push(state.answers[question.id]);
  });

  return Object.keys(PROFILE_DIMENSIONS).map((key) => {
    const values = sums[key] || [];
    const mean = values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : NEUTRAL;

    return {
      label: PROFILE_DIMENSIONS[key],
      percent: Math.round(((mean - 1) / 4) * 100)
    };
  });
}

function buildRanking(ranked) {
  return ranked.map((item) => {
    const row = document.createElement("div");
    row.className = "rank";

    const label = document.createElement("span");
    label.className = "rank__label";
    label.textContent = "Golongan " + item.type;

    const track = document.createElement("span");
    track.className = "rank__track";

    const fill = document.createElement("span");
    fill.className = "rank__fill";
    fill.style.width = item.percent + "%";
    fill.style.background = RESULTS[item.type].color;

    const value = document.createElement("span");
    value.className = "rank__value";
    value.textContent = item.percent + "%";

    track.append(fill);
    row.append(label, track, value);

    return row;
  });
}

function buildChips(items) {
  return items.map((item) => {
    const chip = document.createElement("li");
    chip.className = "chip";
    chip.textContent = item.label;
    return chip;
  });
}

function buildList(values) {
  return values.map((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    return item;
  });
}

function buildBars(profile) {
  return profile.map((item) => {
    const row = document.createElement("div");
    row.className = "bar-row";

    const label = document.createElement("span");
    label.className = "bar-row__label";
    label.textContent = item.label;

    const track = document.createElement("span");
    track.className = "bar-row__track";

    const fill = document.createElement("span");
    fill.className = "bar-row__fill";
    fill.style.width = item.percent + "%";

    const value = document.createElement("span");
    value.className = "bar-row__value";
    value.textContent = item.percent + "%";

    track.append(fill);
    row.append(label, track, value);

    return row;
  });
}

function renderResult() {
  const { scores, features } = computeScores();
  const ranked = ranking(scores);
  const winner = ranked[0].type;
  const share = shareOf(ranked);
  const result = RESULTS[winner];

  state.type = winner;

  dom.result.style.setProperty("--type-color", result.color);
  dom.badge.textContent = winner;
  dom.name.textContent = result.name;
  dom.tagline.textContent = result.tagline;
  dom.description.textContent = result.description;
  dom.share.textContent = share > 0 ? share + "% kecocokan" : "hasil belum merujuk satu golongan";

  dom.ranking.replaceChildren(...buildRanking(ranked));
  dom.chips.replaceChildren(...buildChips(topFeatures(features, winner)));
  dom.traits.replaceChildren(...buildList(result.traits));
  dom.profile.replaceChildren(...buildBars(buildProfile()));

  dom.resultSection.hidden = false;
  dom.result.hidden = false;
  dom.resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function submit(event) {
  event.preventDefault();

  markAnswered();

  const missing = QUESTIONS.length + PROFILE_QUESTIONS.length - Object.keys(state.answers).length;

  if (missing > 0) {
    dom.warning.hidden = false;
    dom.warning.textContent = "Masih ada " + missing + " pertanyaan belum dijawab.";
    firstUnanswered().scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  renderResult();
}

function reset(event) {
  event.preventDefault();

  dom.form.reset();
  state.answers = {};
  dom.result.hidden = true;
  dom.resultSection.hidden = true;
  dom.warning.hidden = true;

  dom.form.querySelectorAll(".question").forEach((item) => item.classList.remove("is-answered"));

  updateProgress();
  dom.form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSources() {
  const list = document.getElementById("sourceList");

  list.replaceChildren(
    ...SOURCES.map((source) => {
      const item = document.createElement("li");
      item.className = "source";

      const label = document.createElement("p");
      label.className = "source__label";
      label.textContent = source.label;

      const detail = document.createElement("p");
      detail.className = "source__detail";
      detail.textContent = source.detail;

      item.append(label, detail);

      return item;
    })
  );
}

function setMenu(open) {
  chrome.menu.classList.toggle("is-open", open);
  chrome.toggle.setAttribute("aria-expanded", String(open));
  chrome.toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initMenu() {
  chrome.toggle.addEventListener("click", () => {
    setMenu(chrome.toggle.getAttribute("aria-expanded") !== "true");
  });

  chrome.menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenu(false);
    }
  });
}

function initToTop() {
  window.addEventListener(
    "scroll",
    () => {
      chrome.toTop.classList.toggle("is-visible", window.scrollY > 420);
    },
    { passive: true }
  );

  chrome.toTop.addEventListener("click", scrollToTop);

  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToTop();
      history.replaceState(null, "", "#top");
    });
  });
}

dom.form.addEventListener("change", markAnswered);
dom.form.addEventListener("submit", submit);
dom.restart.addEventListener("click", reset);
document.getElementById("year").textContent = String(new Date().getFullYear());

renderQuestions();
renderSources();
initMenu();
initToTop();
updateProgress();