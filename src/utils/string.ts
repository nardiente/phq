export const getStringBetweenChars = (str: string) => {
  const match = str.match(/>(.*?)</);
  return match ? match[1] : '';
};

export const removeHtmlTags = (str: string): string => {
  return str.replace(/<[^>]*>/g, ' ').trim();
};
