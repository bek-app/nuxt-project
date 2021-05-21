export const state = () => ({
  persons: [],
})

export const mutations = {
  setPersons(state, persons) {
    state.persons = persons
  },
  addPerson(state, person) {
    state.persons.push(person)
  },
  deletePerson(state, id) {
    const index = state.persons.findIndex((person) => person._id === id)
    state.persons.splice(index, 1)
  },
}

export const actions = {
  async getPersons({ commit }) {
    const persons = await this.$axios.$get('/api/').catch((error) => {
      console.log(error)
    })

    commit('setPersons', persons)
  },
  async addPerson({ commit }, newData) {
    await this.$axios
      .$post('/api/', newData)
      .then((res) => {
        commit('addPerson', res)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  async deletePerson({ commit }, id) {
    await this.$axios
      .$delete(`/api/${id}`)
      .then(() => {
        commit('deletePerson', id)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
