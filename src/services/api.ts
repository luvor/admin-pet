import { driverGenerator, truckGenerator } from '@/utils/mock'
import type { Driver, Truck } from '@/types/models'
import type { PaginatedResponse, PaginationParams } from '@/types/utils'

const trucks = useStorage(
  'trucks',
  truckGenerator(100) as Truck[],
  localStorage,
)
const drivers = useStorage(
  'drivers',
  driverGenerator(125) as Driver[],
  localStorage,
)

export const api = {
  getTrucks: async (params: PaginationParams) => {
    const start = (params.page - 1) * params.limit
    const end = params.page * params.limit
    const total = trucks.value.length
    return new Promise<PaginatedResponse<Truck>>(resolve =>
      setTimeout(
        () => resolve({ data: trucks.value.slice(start, end), total }),
        500,
      ),
    )
  },
  addTruck: async (truck: Truck): Promise<void> => {
    trucks.value.push(truck)
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  getTruck: async (id: number): Promise<Truck> => {
    return new Promise(resolve =>
      setTimeout(() => {
        const truck = trucks.value.find(t => t.id === id)
        if (truck) {
          resolve(toRaw(truck))
        }
        else {
          throw new Error('Truck not found')
        }
      }, 500),
    )
  },
  updateTruck: async (truck: Truck): Promise<void> => {
    const index = trucks.value.findIndex(t => t.id === truck.id)
    trucks.value[index] = truck
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  deleteTruck: async (id: number): Promise<void> => {
    const index = trucks.value.findIndex(t => t.id === id)
    trucks.value.splice(index, 1)
    return new Promise(resolve => setTimeout(resolve, 500))
  },

  getDrivers: async (params: PaginationParams) => {
    const start = (params.page - 1) * params.limit
    const end = params.page * params.limit
    const total = drivers.value.length
    return new Promise<PaginatedResponse<Driver>>(resolve =>
      setTimeout(
        () => resolve({ data: drivers.value.slice(start, end), total }),
        500,
      ),
    )
  },
  addDriver: async (driver: Driver): Promise<void> => {
    drivers.value.push(driver)
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  getDriver: async (id: number): Promise<Driver> => {
    return new Promise(resolve =>
      setTimeout(() => {
        const driver = drivers.value.find(d => d.id === id)
        if (driver) {
          resolve(driver)
        }
        else {
          throw new Error('Driver not found')
        }
      }, 500),
    )
  },
  updateDriver: async (driver: Driver): Promise<void> => {
    const index = drivers.value.findIndex(d => d.id === driver.id)
    drivers.value[index] = driver
    return new Promise(resolve => setTimeout(resolve, 500))
  },
  deleteDriver: async (id: number): Promise<void> => {
    const index = drivers.value.findIndex(d => d.id === id)
    drivers.value.splice(index, 1)
    return new Promise(resolve => setTimeout(resolve, 500))
  },
}
