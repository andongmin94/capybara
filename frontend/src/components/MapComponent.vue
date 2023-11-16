<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

declare global {
  interface Window {
    kakao: any;
  }
}

export default {
  name: "MapComponent",
  setup() {
    let latitude = ref(0);
    let longitude = ref(0);
    let level = ref(0);
    let map = ref(null);

    const mountMap = (
      _latitude: number,
      _longitude: number,
      _level: number
    ) => {
      latitude.value = _latitude;
      longitude.value = _longitude;
      level.value = _level;

      const script = document.createElement("script");
      script.onload = () => window.kakao.maps.load(initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a2804ef4ab032a17fb5d9d5814076bac";
      document.head.appendChild(script);
    };

    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(latitude.value, longitude.value),
        level: level.value,
      };

      // 지도 객체를 등록합니다.
      map.value = new window.kakao.maps.Map(container, options);

      addMarker(latitude.value, longitude.value);
    };

    const addMarker = (_latitude: number, _longitude: number) => {
      // 마커가 표시될 위치입니다
      var markerPosition = new window.kakao.maps.LatLng(_latitude, _longitude);

      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map.value);
    };

    onMounted(() => {
      mountMap(37.5665, 126.978, 10); // Default values, replace with your desired values
    });

    return { map };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
#map {
  width: 100%;
  height: 400px;
}
</style>
