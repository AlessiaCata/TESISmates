import bcrypt from 'bcryptjs';

const pwd = process.argv[2];
if (!pwd) {
  console.error('Uso: npm run hash -- <password>');
  process.exit(1);
}
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(pwd, salt);
console.log('Hash bcrypt ->', hash);
