export function generateISBN13(): string {
  const prefix = '978';
  let body = '';

  for (let i = 0; i < 9; i++) {
    body += Math.floor(Math.random() * 10);
  }

  const partial = prefix + body;

  let sum = 0;
  for (let i = 0; i < partial.length; i++) {
    const digit = parseInt(partial[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  const checkDigit = (10 - (sum % 10)) % 10;

  return partial + checkDigit;
}