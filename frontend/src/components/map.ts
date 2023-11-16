declare global {
  interface Window {
    kakao: any;
  }
}
let latitude = 0;
let longitude = 0;
let level = 0;
let map: any = null;

const mountMap = (
  _map: any,
  _latitude: number,
  _longitude: number,
  _level: number
) => {
  latitude = _latitude;
  longitude = _longitude;
  level = _level;
  map = _map;

  const script = document.createElement("script");
  /* global kakao */
  script.onload = () => window.kakao.maps.load(initMap);
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a2804ef4ab032a17fb5d9d5814076bac`;
  document.head.appendChild(script);
};

const initMap = () => {
  const container = document.getElementById("map");
  console.log(map, container);
  console.log(latitude, longitude);
  const options = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: level,
  };
  // 지도 객체를 등록합니다.
  // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new window.kakao.maps.Map(container, options);

  addMarker(latitude, longitude);
};
const addMarker = (latitude: number, longitude: number) => {
  // 마커가 표시될 위치입니다
  var markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

  // 마커를 생성합니다
  var marker = new window.kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);
};

export { mountMap, initMap };
