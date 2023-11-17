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

    let map = ref<any>(null);
    let infowindow = ref<any>(null);
    let ps = ref<any>(null);

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

      // addMarker(latitude.value, longitude.value);

      infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      ps = new window.kakao.maps.services.Places(map.value);
      ps.value.categorySearch("BK9", placesSearchCB, { useMapBounds: true });
    };

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    const placesSearchCB = (data: any, status: any, pagination: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
      }
    };

    // 지도에 마커를 표시하는 함수입니다
    const displayMarker = (place: any) => {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "click", () => {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.value.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map.value, marker);
      });
    };

    // onMounted(async () => {
    //   if (window.kakao && window.kakao.maps) {
    //     initMap();
    //     console.log("if b", infowindow);
    //   } else {
    //     const script = document.createElement("script");
    //     /* global kakao */
    //     script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a2804ef4ab032a17fb5d9d5814076bac&libraries=services`;
    //     document.head.appendChild(script);
    //     script.onload = () => {
    //       window.kakao.maps.load(initMap);
    //     };
    //   }
    // }

    // );

    // /////////////////////
    // const addMarker = (_latitude: number, _longitude: number) => {
    //   // 마커가 표시될 위치입니다
    //   // var markerPosition = new window.kakao.maps.LatLng(_latitude, _longitude);

    //   // 여기를 은행목록으로 고쳐야 함
    //   var positions = [
    //     {
    //       title: "카카오",
    //       latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
    //     },
    //     {
    //       title: "생태연못",
    //       latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
    //     },
    //     {
    //       title: "텃밭",
    //       latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
    //     },
    //     {
    //       title: "근린공원",
    //       latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
    //     },
    //   ];

    //   var imageSrc =
    //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    //   for (var i = 0; i < positions.length; i++) {
    //     // 마커 이미지의 이미지 크기 입니다
    //     var imageSize = new window.kakao.maps.Size(24, 35);

    //     // 마커 이미지를 생성합니다
    //     var markerImage = new window.kakao.maps.MarkerImage(
    //       imageSrc,
    //       imageSize
    //     );

    //     // 마커를 생성합니다
    //     var marker = new window.kakao.maps.Marker({
    //       map: map, // 마커를 표시할 지도
    //       position: positions[i].latlng, // 마커를 표시할 위치
    //       title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //       image: markerImage, // 마커 이미지
    //     });

    //     // 마커를 생성합니다
    //     // var marker = new window.kakao.maps.Marker({
    //     //   position: markerPosition,
    //     // });
    //     // marker.setMap(map.value);
    //     // }

    onMounted(() => {
      mountMap(37.5665, 126.978, 10); // 기본값
    });
    // }
    /////////////////////////////////
    // };
    return { map };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
#map {
  width: 50%;
  min-width: 400px;
  height: 400px;
}
</style>
