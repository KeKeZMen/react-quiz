export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const shufleQuestionsArray = (array: Array<string>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[j], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
