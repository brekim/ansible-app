<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
        <b-link href="#/add-room">(Add Room)</b-link>
      </h2>
      <b-table
        striped
        hover
        :items="rooms"
        :fields="fields"
        id="boop"
        primary-key="room_name"
      >
        <template v-slot:cell(actions)="row">
          <b-btn size="sm" @click="join(row.item.room_name)">Join</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error">
          {{ error.message }}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomList",
  data() {
    return {
      fields: [
        {
          key: "room_name",
          label: "Room Name",
          sortable: true,
          class: "text-center"
        },
        { key: "created_date", label: "Created Date", sortable: true },
        { key: "actions", label: "Action", class: "text-center" }
      ],
      rooms: [],
      errors: []
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/api/room`)
      .then(response => {
        this.rooms = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    join(id) {
      console.log(id + " says hi");
      this.$router.push({
        name: "JoinRoom",
        params: { id: id }
      });
    }
  }
};
</script>
