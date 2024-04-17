import * as faker from 'faker/locale/es';
import { writeFileSync } from 'fs';
import * as bcrypt from 'bcrypt';

interface UserData {
  username: string;
  email: string;
  password: string;
  role: string;
}

function generateUserData(count: number): UserData[] {
  const userData: UserData[] = [];

  for (let i = 1; i <= count; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const role = faker.random.arrayElement(['admin', 'user']);

    userData.push({
      username,
      email,
      password,
      role,
    });
  }

  return userData;
}

const userData = generateUserData(50);
const hashedUserData = userData.map((user) => ({
  ...user,
  passwordHash: bcrypt.hashSync(user.password, 10),
}));

const data = JSON.stringify(hashedUserData, null, 2);
writeFileSync('users.json', data);

console.log('User data generated successfully.');
