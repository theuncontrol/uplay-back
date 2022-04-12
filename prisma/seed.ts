import { prisma } from '../src/database/prismaClient';

async function resources() {
  await prisma.resources.createMany({
    data: [
      {
        key: 'L/E',
        value: 'Ler/Editar',
      },
      {
        key: 'add/rec',
        value: 'Adicionar recursos',
      },
      {
        key: 'add/prf',
        value: 'Adicionar Perfil',
      },
      {
        key: 'add/prc',
        value: 'Adicionar Produto',
      },
      {
        key: 'rm/prc',
        value: 'Remover Produto',
      },
      {
        key: 'vw/c',
        value: 'Visualizar compras',
      },
      {
        key: 'C',
        value: 'Compra',
      },
    ],
  });
}

async function profiles() {
  const resources = await prisma.resources.findMany({});
  const basic = await prisma.resources.findMany({
    where: {
      OR: [{ key: 'C' }],
    },
  });

  await prisma.profile.createMany({
    data: [
      {
        name: 'basic_user',
        resourceIds: basic.map(({ id }) => id),
      },
      {
        name: 'admin_user',
        resourceIds: resources.map(({ id }) => id),
      },
    ],
  });
}

async function userAdmin() {
  const profile = await prisma.profile.findFirst({
    where: { name: 'admin_user' },
  });

  await prisma.user.create({
    data: {
      name: 'admin',
      password: '$2b$10$KlDU1kGhK8PHF8Kh7CLitelVO5vsP6WYawRo1SNvR1wDTLX4dE/B2',
      email: 'admin_uplay@uplay.com',
      profileId: profile?.id,
      phone: '41988602657',
    },
  });
}

async function main() {
  await resources();
  await profiles();
  await userAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
