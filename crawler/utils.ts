const REGEXP_DATE =
  "\\d{1,2}.\\s(ledna|února|března|dubna|května|června|července|srpna|září|října|listopadu|prosince)\\s\\d{4}";

const REGEXP_DATE_EXT = `((\\s)?-\\s)?(\\()?${REGEXP_DATE}(\\))?`;

export const getDate = (str: string) => {
  const found = str.match(RegExp(REGEXP_DATE));
  return found && found.length ? found[0] : null;
};

export const removeDate = (str: string) => {
  const found = str.match(RegExp(REGEXP_DATE_EXT));
  const date = found && found.length ? found[0] : null;
  return date ? str.replace(date, "") : str;
};

export const getNumber = (str: string) => {
  const found = str.match(RegExp("\\d{1,2}"));
  return found && found.length ? found[0] : null;
};

export const removeNumber = (str: string) => {
  const found = str.match(RegExp("\\d{1,2}.\\s"));
  const date = found && found.length ? found[0] : null;
  return date ? str.replace(date, "") : str;
};
