<template>
  <div class="panorama-view">
    <LocationCard v-for="loc in locations" :key="loc.id" :location="loc" @enter="enterLocation" />
    <LocationView v-if="currentLocation" :location="currentLocation" @back="leaveLocation" @found="onFoundItem" />
  </div>
</template>

<script>
import LocationCard from './LocationCard.vue';
import LocationView from './LocationView.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'PanoramaView',
  components: { LocationCard, LocationView },
  computed: {
    ...mapState(['locations', 'currentLocation'])
  },
  methods: {
    ...mapMutations(['setCurrentLocation', 'addFoundItem']),
    enterLocation(id) {
      this.setCurrentLocation(id);
    },
    leaveLocation() {
      this.setCurrentLocation(null);
    },
    onFoundItem(item) {
      this.addFoundItem(item);
    }
  }
};
</script>

<style scoped>
.panorama-view {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
