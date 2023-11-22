<template>
  <div class="map-component-under">
    <v-chip elevation="2" class="mb-5 map-search-btn" @click="searchOnMap"
      >검색하기</v-chip
    >
    <!-- 지도를 표시할 컨테이너 -->
    <div ref="mapContainer" style="width: 100%; height: 350px"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  props: {
    province: String,
    city: String,
    bank: String,
  },
  data() {
    return {
      map: null,
      infowindow: null,
      markers: [], // 마커를 저장할 배열 추가
      searchKeyword: "", // 검색어를 저장할 변수 추가
    };
  },
  mounted() {
    // Kakao 지도 API 스크립트 동적으로 추가
    this.loadKakaoMap();
    // 창 크기가 변경될 때의 이벤트 리스너 추가
    window.addEventListener("resize", this.handleWindowResize);
  },
  beforeDestroy() {
    // 컴포넌트가 파괴될 때 이벤트 리스너 제거
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    loadKakaoMap() {
      // Kakao 지도 API 스크립트 동적으로 추가
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=49d9fdc65f1121f75aa647ca6d396313&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        // Kakao 지도 API 로드 완료 후 실행할 콜백 함수
        kakao.maps.load(() => {
          this.initializeKakaoMap();
        });
      };

      document.head.appendChild(script);
    },
    initializeKakaoMap() {
      // Kakao 지도 API 초기화
      console.log("Initializing Kakao Map");
      const mapContainer = this.$refs.mapContainer;
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    },
    handleWindowResize() {
      // 창 크기가 변경될 때 지도 크기 업데이트
      if (this.map) {
        this.map.relayout();
      }
    },
    searchOnMap() {
      console.log("Button clicked");
      this.isLoading = true;
      const searchKeyword = `${this.province} ${this.city} ${this.bank}`;
      console.log("Search Keyword:", searchKeyword);
      this.searchPlaces(searchKeyword);
    },
    searchPlaces(keyword) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, this.placesSearchCB);
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색 결과가 OK일 때 기존 마커들을 모두 제거
        this.removeAllMarkers();
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        this.map.setBounds(bounds);
        // 이전에 열린 인포윈도우 닫기
        this.infowindow.close();
      }
    },
    displayMarker(place) {
      const marker = new window.kakao.maps.Marker({
        map: this.map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", () => {
        this.infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        this.infowindow.open(this.map, marker);
      });

      // 생성된 마커를 배열에 추가
      this.markers.push(marker);
    },
    removeAllMarkers() {
      // 배열에 저장된 모든 마커를 제거
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      // 배열 비우기
      this.markers = [];
    },
  },
};
</script>

<style scoped lang="scss">
$colors: (
  first: #59452c,
  second: #8c704f,
  third: #d9bb96,
  forth: #402a17,
  fifth: #f2f2f2,
);
.map-component-under {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.map-search-btn {
  width: fit-content;

  background-color: map-get($map: $colors, $key: second);
  color: map-get($map: $colors, $key: fifth);
}
</style>
