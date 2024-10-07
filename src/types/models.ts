export interface Truck {
  id: number
  plate: string
  type: 'Construction' | 'General'
  vin: string
}

export interface Driver {
  id: number
  name: string
  surname: string
  phone: string
  truckId: number
}
