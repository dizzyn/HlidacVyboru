const regex = (pref = "") =>
  RegExp(
    pref +
      "\\d{1,2}.\\s(ledna|února|března|dubna|května|června|července|srpna|září|října|listopadu|prosince)\\s\\d{4}",
    "g"
  );

export const getDate = (str: string) => {
  const found = str.match(regex());
  return found && found.length ? found[0] : null;
};

export const removeDate = (str: string) => {
  const found = str.match(regex("((\\s)?-\\s)?"));
  const date = found && found.length ? found[0] : null;
  return date ? str.replace(date, "") : str;
};
