// Libraries
import Vuetify from 'vuetify'

// Components
import SearchBar from '@/components/SearchBar.vue'

// Utilities
import { mount, createLocalVue } from '@vue/test-utils'
import './setup'

const localVue = createLocalVue()

describe('GithubRepoCard.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = options => {
    return mount(SearchBar, {
      localVue,
      vuetify,
      ...options,
    })
  }

  it('should indicate loading', () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true,
        selectableOptions: [],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    
    const inputDiv = wrapper.find('div.v-input.v-text-field')
    expect(inputDiv.classes()).toContain('v-input--is-loading')
  })

  it('should not indicate loading', () => {
    const wrapper = mountFunction({
      propsData: {
        loading: false,
        selectableOptions: [],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    
    const inputDiv = wrapper.find('div.v-input.v-text-field')
    expect(inputDiv.classes()).not.toContain('v-input--is-loading')
  })

  it('should emit search event on search icon click', () => {
    const searchTerm = 'Test search term'

    const wrapper = mountFunction({
      propsData: {
        loading: false,
        selectableOptions: [],
      },
    })

    expect(wrapper.emitted().search).toBeFalsy()
    wrapper.find('[data-cy="search-input"]').setValue(searchTerm)
    wrapper.find('.v-input__icon--append > button').trigger('click')
    expect(wrapper.emitted().search).toHaveLength(1)
    expect(wrapper.emitted().search[0][0]).toBe(searchTerm)
  })

  it('should emit search event on enter keyup', () => {
    const searchTerm = 'Test search term'

    const wrapper = mountFunction({
      propsData: {
        loading: false,
        selectableOptions: [],
      },
    })

    expect(wrapper.emitted().search).toBeFalsy()
    wrapper.find('[data-cy="search-input"]').setValue(searchTerm)
    wrapper.find('[data-cy="search-input"]').trigger('keyup.enter')
    expect(wrapper.emitted().search).toHaveLength(1)
    expect(wrapper.emitted().search[0][0]).toBe(searchTerm)
  })
})
