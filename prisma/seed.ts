import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma  = new PrismaClient();

const fakerUser = (): any => ({
name: faker.name.firstName() +' '+ faker.name.lastName(),
email: faker.internet.email(),
hashedPassword: faker.internet.password(),
phone: faker.phone.number('+380#########'),
position_id: Math.floor(Math.random() * 4) + 1
});

async function main() {
const fakerRounds = 45;
dotenv.config();
console.log('Seeding...');

///--------- Positions ------------
await prisma.position.create({data: {name: 'Designer'}})
await prisma.position.create({data: {name: 'Lawyer'}})
await prisma.position.create({data: {name: 'Security'}})
await prisma.position.create({data: {name: 'Content manager'}}) 
/// --------- Users ---------------
for (let i = 0; i < fakerRounds; i++) {
await prisma.user.create({ data: fakerUser() });
}
};

  

main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect();
});