// Libraries
import Vuetify from 'vuetify'

// Components
import GithubRepoCard from '@/components/GithubRepoCard.vue'

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
    return mount(GithubRepoCard, {
      localVue,
      vuetify,
      ...options,
    })
  }

  it('should render main props', () => {
    const name = 'Test repo name'
    const stars = 10
    const owner = 'Hehehe'
    const openIssues = 20

    const wrapper = mountFunction({
      propsData: {
        name,
        stars,
        owner,
        openIssues,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    const title = wrapper.find('.v-list-item__title')
    expect(title.text()).toBe(name)
    const starsSpan = wrapper.find('span#stars')
    expect(starsSpan.text()).toBe(stars.toString())
    const openIssuesSpan = wrapper.find('span#open-issues')
    expect(openIssuesSpan.text()).toBe(openIssues.toString())
  })

  it('should render owner and repo links', () => {
    const name = 'Nice repo'
    const url = 'https://example.com/nice-repo'
    const owner = 'Haha'
    const ownerUrl = 'https://example.com/nice-owner-url'

    const wrapper = mountFunction({
      propsData: {
        name,
        url,
        owner,
        ownerUrl
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    // Owner link
    const ownerLink = wrapper.find('a#owner-link')
    expect(ownerLink.text()).toBe(owner)
    expect(ownerLink.attributes('href')).toBe(ownerUrl)

    // Repo link
    const repoLink = wrapper.find('a#repo-link')
    expect(repoLink.attributes('href')).toBe(url)
  })
})
