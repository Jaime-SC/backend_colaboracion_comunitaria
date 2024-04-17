/* eslint-disable @typescript-eslint/no-unused-vars */
import * as faker from 'faker/locale/es'; // Importa el idioma español
import { writeFileSync } from 'fs';

interface Volunteering {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  organizacion_id: number;
}

function generateVolunteerings(count: number): Volunteering[] {
  const volunteerings: Volunteering[] = [];

  for (let i = 1; i <= count; i++) {
    const volunteering: Volunteering = {
      id: i,
      titulo: faker.lorem
        .words(3)
        .split(' ')
        .map((word) =>
          faker.random.arrayElement([
            'ayuda',
            'colaboración',
            'voluntariado',
            'comunidad',
          ]),
        )
        .join(' '),
      descripcion: faker.lorem.paragraph(),
      fecha_inicio: faker.date.future(),
      fecha_fin: faker.date.future(),
      organizacion_id: faker.datatype.number({ min: 1, max: 10 }), // Suponiendo que hay 10 organizaciones
    };

    volunteerings.push(volunteering);
  }

  return volunteerings;
}

const volunteerings = generateVolunteerings(50); // Genera 50 registros de voluntariados
const data = JSON.stringify(volunteerings, null, 2);

writeFileSync('volunteerings.json', data);

console.log('Volunteerings data generated successfully.');
