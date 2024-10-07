import type { Truck } from '@/types/models'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TruckForm from '../src/components/TruckForm.vue'

describe('truckForm.vue', () => {
  it('renders the form correctly', () => {
    const wrapper = mount(TruckForm)

    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Plate')
    expect(wrapper.findAll('input')).toHaveLength(2) // Plate and VIN
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('initializes with empty fields when no props are passed', () => {
    const wrapper = mount(TruckForm)

    const plateInput = wrapper.find('input[name="plate"]')
    const vinInput = wrapper.find('input[name="vin"]')

    expect(plateInput.element.textContent).toBe('')
    expect(vinInput.element.textContent).toBe('')
  })

  it('updates data when input fields change', async () => {
    const wrapper = mount(TruckForm)

    const plateInput = wrapper.find('input[name="plate"]')
    const vinInput = wrapper.find('input[name="vin"]')
    const typeSelect = wrapper.find('select[name="type"]')

    await plateInput.setValue('XYZ789')
    await vinInput.setValue('1HGCM82633A004353')
    await typeSelect.setValue('Construction')

    // @ts-expect-error type mismatch
    expect(wrapper.vm.truck.plate).toBe('XYZ789')
    // @ts-expect-error type mismatch
    expect(wrapper.vm.truck.vin).toBe('1HGCM82633A004353')
    // @ts-expect-error type mismatch
    expect(wrapper.vm.truck.type).toBe('Construction')
  })

  it('emits "saved" event with truck data when form is submitted', async () => {
    const wrapper = mount(TruckForm)

    const plateInput = wrapper.find('input[name="plate"]')
    const vinInput = wrapper.find('input[name="vin"]')
    const typeSelect = wrapper.find('select[name="type"]')

    await plateInput.setValue('LMN456')
    await vinInput.setValue('1HGCM82633A004354')
    await typeSelect.setValue('General')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('saved')).toBeTruthy()
    const emittedData = wrapper.emitted('saved')![0][0] as Truck

    expect(emittedData.plate).toBe('LMN456')
    expect(emittedData.vin).toBe('1HGCM82633A004354')
    expect(emittedData.type).toBe('General')
    expect(typeof emittedData.id).toBe('number')
  })
})
