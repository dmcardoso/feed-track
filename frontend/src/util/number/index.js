const numberOrZero = value => (isNaN(value) || value === '' ? 0 : value);

export { numberOrZero };
