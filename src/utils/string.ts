export const getDigits = (str?: string) => {
  if (str === undefined) {
    return undefined;
  }
  return parseInt(str.replace(/\D/g, ''), 10);
};

export const getStringBetweenChars = (str: string) => {
  const match = str.match(/>(.*?)</);
  return match ? match[1] : '';
};

export const removeHtmlTags = (str: string): string => {
  return str.replace(/<[^>]*>/g, ' ').trim();
};
