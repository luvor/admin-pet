import { driverGenerator, truckGenerator } from '@/utils/mock'
import type { Driver, Truck } from '@/types/models'
import type { PaginatedResponse, PaginationParams } from '@/types/utils'

const trucks: Truck[] = truckGenerator(100)
const drivers: Driver[] = driverGenerator(125)

export const api = {
  getTrucks: async (params: PaginationParams) => {
    const start = (params.page - 1) * params.limit
    const end = params.page * params.limit
    const total = trucks.length
    return new Promise<PaginatedResponse<Truck>>(resolve =>
      setTimeout(() => resolve({ data: trucks.slice(start, end), total }), 500),
    )
  },
  addTruck: async (truck: Truck): Promise<void> => {
    trucks.push(truck)
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  updateTruck: async (truck: Truck): Promise<void> => {
    const index = trucks.findIndex(t => t.id === truck.id)
    trucks[index] = truck
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  deleteTruck: async (id: number): Promise<void> => {
    const index = trucks.findIndex(t => t.id === id)
    trucks.splice(index, 1)
    return new Promise(resolve => setTimeout(resolve, 500))
  },

  getDrivers: async (params: PaginationParams) => {
    const start = (params.page - 1) * params.limit
    const end = params.page * params.limit
    const total = drivers.length
    return new Promise<PaginatedResponse<Driver>>(resolve =>
      setTimeout(
        () => resolve({ data: drivers.slice(start, end), total }),
        500,
      ),
    )
  },
  addDriver: async (driver: Driver): Promise<void> => {
    drivers.push(driver)
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  updateDriver: async (driver: Driver): Promise<void> => {
    const index = drivers.findIndex(d => d.id === driver.id)
    drivers[index] = driver
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  deleteDriver: async (id: number): Promise<void> => {
    const index = drivers.findIndex(d => d.id === id)
    drivers.splice(index, 1)
    return new Promise(resolve => setTimeout(resolve, 500))
  },
}
