export const required = value => {
  if (value) return;
  return 'Field is required';
}

export const maxLengthCreator = maxlength=>value => {
  if (value && value.length > maxlength) return 'Too much text!!!';
  return undefined;
}

export const minLengthCreator = minlength=>value => {
  if (value && value.length < minlength) return 'Too few symbols))';
  return undefined;
}
