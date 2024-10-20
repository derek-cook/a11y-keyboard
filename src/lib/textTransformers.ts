export const capitalizeFirstLetterOfSentences = (text: string) => {
  return text.replace(/(^\w{1}|\.\s*\w{1})/g, (char) => char.toUpperCase());
};
