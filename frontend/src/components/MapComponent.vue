<template>
  <div>
    <p style="margin-top: -12px"></p>
    <!-- 검색창 추가 -->
    <input
      v-model="searchKeyword"
      @keyup.enter="searchPlaces"
      placeholder="은행명을 검색하세요"
    />
    <!-- 지도를 표시할 컨테이너 -->
    <div ref="mapContainer" style="width: 100%; height: 350px"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
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
      const mapContainer = this.$refs.mapContainer;
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      // 지도 객체를 등록합니다.
      map.value = new window.kakao.maps.Map(container, options);

      infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      ps = new window.kakao.maps.services.Places(map.value);
      ps.value.categorySearch("BK9", placesSearchCB, { useMapBounds: true });
    };

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    const placesSearchCB = (data: any, status: any, pagination: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          // 기존 마커 제거
          this.removeAllMarkers();

          // 지도 범위 재설정
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

<style>
/* 여기에 스타일을 추가하세요 */
</style>
