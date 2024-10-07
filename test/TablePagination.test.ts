import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TablePagination from '../src/components/TablePagination.vue'

describe('testing TablePagination.vue', () => {
  it('renders correctly with given props', () => {
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        perPage: 10,
        prevPage: () => {},
        nextPage: () => {},
      },
    })

    expect(wrapper.text()).toContain('Page 1 of 5')
  })

  it('disables prev button when on first page', () => {
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        perPage: 10,
        prevPage: () => {},
        nextPage: () => {},
      },
    })

    const prevButton = wrapper.find('button.icon-btn:first-of-type')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('enables prev button when not on first page', () => {
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
        perPage: 10,
        prevPage: () => {},
        nextPage: () => {},
      },
    })

    const prevButton = wrapper.find('button.icon-btn:first-of-type')
    expect(prevButton.attributes('disabled')).toBeUndefined()
  })

  it('disables next button when on last page', () => {
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
        perPage: 10,
        prevPage: () => {},
        nextPage: () => {},
      },
    })

    const nextButton = wrapper.find('button.icon-btn:last-of-type')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('enables next button when not on last page', () => {
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 4,
        totalPages: 5,
        perPage: 10,
        prevPage: () => {},
        nextPage: () => {},
      },
    })

    const nextButton = wrapper.find('button.icon-btn:last-of-type')
    expect(nextButton.attributes('disabled')).toBeUndefined()
  })

  it('calls prevPage when prev button is clicked', async () => {
    const prevPage = vi.fn()
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
        perPage: 10,
        prevPage,
        nextPage: () => {},
      },
    })

    const prevButton = wrapper.find('button.icon-btn:first-of-type')
    await prevButton.trigger('click')
    expect(prevPage).toHaveBeenCalled()
  })

  it('calls nextPage when next button is clicked', async () => {
    const nextPage = vi.fn()
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
        perPage: 10,
        prevPage: () => {},
        nextPage,
      },
    })

    const nextButton = wrapper.find('button.icon-btn:last-of-type')
    await nextButton.trigger('click')
    expect(nextPage).toHaveBeenCalled()
  })

  it('does not call prevPage when prev button is disabled', async () => {
    const prevPage = vi.fn()
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        perPage: 10,
        prevPage,
        nextPage: () => {},
      },
    })

    const prevButton = wrapper.find('button.icon-btn:first-of-type')
    await prevButton.trigger('click')
    expect(prevPage).not.toHaveBeenCalled()
  })

  it('does not call nextPage when next button is disabled', async () => {
    const nextPage = vi.fn()
    const wrapper = mount(TablePagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
        perPage: 10,
        prevPage: () => {},
        nextPage,
      },
    })

    const nextButton = wrapper.find('button.icon-btn:last-of-type')
    await nextButton.trigger('click')
    expect(nextPage).not.toHaveBeenCalled()
  })
})
