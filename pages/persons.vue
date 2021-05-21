<template>
  <div class="container">
    <b-row>
      <b-col class="form">
        <b-form-input
          v-model="text"
          class="input"
          placeholder="Persons"
        ></b-form-input>
        <b-button class="btn" variant="primary" @click="addPerson"
          >Add</b-button
        ></b-col
      >
    </b-row>
    <b-row>
      <b-col>
        <div>
          <b-table striped small hover :items="persons" :fields="fields">
            <template #cell(btn)="data">
              <b-button variant="danger" @click="deletePerson(data.item._id)">
                Delete
              </b-button>
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: '_id',
          label: 'Id',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'btn',
          label: '',
        },
      ],
      text: '',
    }
  },
  mounted() {
    this.$store.dispatch('persons/getPersons')
  },
  computed: {
    persons() {
      return this.$store.state.persons.persons
    },
  },
  methods: {
    addPerson() {
      if (!this.text) return

      const newData = {
        name: this.text,
      }
      this.$store.dispatch('persons/addPerson', newData)
    },
    deletePerson(id) {
      this.$store.dispatch('persons/deletePerson', id)
    },
  },
}
</script>
<style scoped>
.form {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
.form input {
  margin-right: 10px;
}
.btn {
  max-width: 200px;
}
</style>
