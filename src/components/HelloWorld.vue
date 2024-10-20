<template>
  <div>
    <v-dialog v-model="isActive" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" color="surface-variant" text="Open Dialog" variant="flat"></v-btn>
      </template>

      <template v-slot:default>
        <v-card title="Dialog">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close Dialog" @click="isActive = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <span id="msg">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false // Déclarez isActive ici
    };
  }
}
</script>
