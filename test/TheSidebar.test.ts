import { mount, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import TheSidebar from '../src/components/TheSidebar.vue'

// Mocking vue-router
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
    }),
    useRoute: () => ({
      path: '/trucks',
    }),
  }
})

describe('theSidebar.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [],
    })

    setActivePinia(createPinia())

    wrapper = mount(TheSidebar, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  })

  it('renders the component correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Racoon AI')
    expect(wrapper.findAll('li')).toHaveLength(3)
  })

  it('highlights the active route', () => {
    const activeLink = wrapper.find('.bg-gray-100')
    expect(activeLink.exists()).toBe(true)
    expect(activeLink.text()).toContain('Trucks')
  })

  it('navigates to the correct route when a menu item is clicked', async () => {
    const driversLink = wrapper
      .findAllComponents(RouterLinkStub)
      .find(link => link.props().to === '/drivers')
    expect(driversLink).toBeDefined()
    await driversLink?.trigger('click')
    expect(driversLink?.props().to).toBe('/drivers')
  })
})
