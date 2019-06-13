<template>
  <div class="hello">

      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Lights</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group.id">
            <td>{{ group.id }}</td>
            <td>{{ group.name }}</td>
            <td>{{ group.lights }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name: 'GroupList',
        props: {},
        computed: mapState([
            'groups'
        ])
    }

</script>

<style scoped>

</style>
