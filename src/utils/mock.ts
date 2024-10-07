import type { Driver, Truck } from '@/types/models'

export function truckGenerator(len: number): Truck[] {
  const trucks: Truck[] = []

  const plateVariants = ['ABC', 'XYZ', 'DEF', 'GHI', 'JKL']
  const typeVariants: Truck['type'][] = ['Construction', 'General']

  for (let i = 0; i < len; i++) {
    trucks.push({
      id: i + 1,
      plate: `${plateVariants[i % 5]}-${i + 1}`,
      type: typeVariants[i % 2],
      vin: `1HGCM82633A00435${i}`,
    })
  }

  return trucks
}

export function driverGenerator(len: number): Driver[] {
  const drivers: Driver[] = []

  const nameVariants = ['John', 'Jane', 'Alice', 'Bob', 'Charlie']
  const surnameVariants = ['Doe', 'Smith', 'Brown', 'Black', 'White']

  for (let i = 0; i < len; i++) {
    drivers.push({
      id: i + 1,
      name: nameVariants[i % 5],
      surname: surnameVariants[i % 5],
      phone: `123456789${i}`,
      truckId: i + 1,
    })
  }

  return drivers
}
