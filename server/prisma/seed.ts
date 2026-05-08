import { prisma } from '../src/db';

async function main() {
  console.log('🌱 Iniciando Seed...');

  // Creamos un usuario de prueba
  const user = await prisma.user.create({
    data: {
      nombre: 'Vecino Test',
      email: 'test@costadeoro.com',
      telefono: '099123456',
      localidad: 'MARINDIA',
      role: 'SUPER_ADMIN'
    }
  });

  // Creamos un par de posts para ver en la cartelera
  await prisma.post.createMany({
    data: [
      {
        authorId: user.id,
        titulo: 'Vendo Hummus Orgánico',
        contenido: 'Hecho en casa, entrega en el Fortín.',
        localidad: 'MARINDIA',
        categoria: 'SERVICIOS',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().split(' ')[0],
        subCategoria: 'Productos artesanales',
      },
      {
        authorId: user.id,
        titulo: 'Busco paseador de perros',
        contenido: 'Para Rex, zona Salinas sur.',
        localidad: 'MARINDIA',
        categoria: 'MASCOTAS',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().split(' ')[0],
        subCategoria: 'Cuidados de mascotas',
      }
    ]
  });

  console.log('✅ Seed finalizado con éxito');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });