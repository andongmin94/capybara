<template>
  <div class="map-component-under">
    <v-chip elevation="2" class="mb-5 map-search-btn" @click="searchOnMap"
      >검색하기</v-chip
    >
    <!-- 지도를 표시할 컨테이너 -->
    <div id="mapContainer" style="width: 100%; height: 350px"></div>
    <v-container>
      <v-row>
        <v-col cols="4" offset="4">
          <v-card variant="tonal" class="mt-6">
            <v-card-text class="d-flex flex-column align-center">
              <h4 class="ch-password-tip mb-2">❓ 화면이 바뀌지 않아요!</h4>
              <p>검색결과가 없기 때문입니다.</p>
              <p>다른 은행을 선택해주세요.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
declare global {
  interface Window {
    kakao: any;
  }
}
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
  beforeDestroy() {
    // 컴포넌트가 파괴될 때 이벤트 리스너 제거
    window.removeEventListener("resize", handleWindowResize);
  },
};
</script>

<script setup lang="ts">
import { onMounted } from "vue";

const loadKakaoMap = function () {
  // Kakao 지도 API 스크립트 동적으로 추가
  const script = document.createElement("script");
  const KAKAO_KEY = "2d49c44ef06bff45b8438e3fd6d4b4e0";
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
  script.async = true;
  script.onload = () => {
    // Kakao 지도 API 로드 완료 후 실행할 콜백 함수
    window.kakao.maps.load(function (this: any) {
      initializeKakaoMap();
    });
  };

  document.head.appendChild(script);
};

const initializeKakaoMap = function (this: any) {
  // Kakao 지도 API 초기화
  console.log("Initializing Kakao Map");
  const mapContainer = document.querySelector("#mapContainer");
  const mapOption = {
    center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };

  this.map = new window.kakao.maps.Map(mapContainer, mapOption);
  this.infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
};

const handleWindowResize = function (this: any) {
  // 창 크기가 변경될 때 지도 크기 업데이트
  if (this.map) {
    this.map.relayout();
  }
};

onMounted(() => {
  // Kakao 지도 API 스크립트 동적으로 추가
  loadKakaoMap();
  // 창 크기가 변경될 때의 이벤트 리스너 추가
  window.addEventListener("resize", handleWindowResize);
});

const searchOnMap = function (this: any) {
  console.log("Button clicked");
  this.isLoading = true;
  const searchKeyword = `${this.province} ${this.city} ${this.bank}`;
  console.log("Search Keyword:", searchKeyword);
  searchPlaces(searchKeyword);
};

const searchPlaces = function (this: any, keyword: any) {
  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(keyword, placesSearchCB);
};
const placesSearchCB = function (
  this: any,
  data: any,
  status: any,
  pagination: any
) {
  if (status === window.kakao.maps.services.Status.OK) {
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
};

const displayMarker = function (this: any, place: any) {
  const marker = new window.kakao.maps.Marker({
    map: this.map,
    position: new window.kakao.maps.LatLng(place.y, place.x),
  });

  window.kakao.maps.event.addListener(marker, "click", () => {
    this.infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
    );
    this.infowindow.open(this.map, marker);
  });

  // 생성된 마커를 배열에 추가
  this.markers.push(marker);
};

const removeAllMarkers = function (this: any) {
  // 배열에 저장된 모든 마커를 제거
  for (let i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }
  // 배열 비우기
  this.markers = [];
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
* {
  font-family: Pretendard-regular;
}
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
