import { mockApi } from "./mock";
import { realApi } from "./real";
import type { DataMode, DataSourceMeta } from "./types";

export * from "./types";
export { rankProducts } from "./recommendation";

const sourceMetadata: Record<DataMode, DataSourceMeta> = {
  mock: {
    mode: "mock",
    sourceLabel: "가상 데이터",
    globalNotice:
      "가상 데이터로 기능을 체험합니다. 표시된 금리와 가입 조건은 실제 정보가 아닙니다.",
    providerLabel: "가상 금융사",
    catalogDefaultSummary: "전체 가상 상품을 보여드려요.",
    recommendationDisclaimer:
      "가상 상품을 정해진 점수 규칙으로 정렬한 탐색 결과이며, 금융상품 추천이나 가입 자격 판정이 아닙니다.",
    communityIntro:
      "상품을 고를 때 먼저 확인한 기준과 탐색 경험을 가상 사용자들의 글로 살펴보세요.",
    communityWriteNotice:
      "작성한 글은 현재 브라우저에만 저장되며, 가상 사용자 이름으로 표시됩니다.",
    communityCommentLabel: "가상 사용자의 대화입니다.",
    currencyIntro:
      "두 통화를 선택해 금액을 계산합니다. 실제 시세가 아닌 단순한 가상 기준값을 사용합니다.",
    currencyBadge: "가상 기준값",
    branchIntro: "지역과 은행을 선택해 가상 지점의 위치와 운영 시간을 확인해 보세요.",
    branchSummaryLabel: "가상 위치 데이터",
    branchMapLabel: "선택한 가상 은행 지점 위치를 표시한 지도",
    branchAttribution: "CAPY MAP · 가상 지도",
    account: {
      label: "가상 사용자",
      notice: "가상 정보만 표시되며 외부 서버로 전송되지 않습니다.",
      actionLabel: "가상 사용자로 계속",
      descriptions: {
        profile: "현재 브라우저에서 사용하는 가상 사용자 정보와 저장 상태입니다.",
        login:
          "서버 없이 모든 기능을 살펴볼 수 있도록 가상 사용자 세션이 준비되어 있습니다.",
        signup: "개인정보를 입력하지 않고 가상 사용자로 제품 흐름을 이어갈 수 있습니다.",
        findpassword: "가상 사용자 세션에는 실제 비밀번호나 이메일 발송이 필요하지 않습니다.",
        modify: "가상 사용자 정보를 편집하는 화면 흐름을 확인할 수 있습니다.",
        changepassword: "입력값은 전송하거나 저장하지 않습니다.",
      },
    },
  },
  real: {
    mode: "real",
    sourceLabel: "연결 데이터",
    globalNotice:
      "연결된 API 데이터를 표시합니다. 금리와 가입 조건은 반드시 해당 금융회사 안내와 다시 확인하세요.",
    providerLabel: "금융사",
    catalogDefaultSummary: "연결된 상품 전체를 보여드려요.",
    recommendationDisclaimer:
      "연결된 상품을 정해진 점수 규칙으로 정렬한 탐색 결과이며, 금융상품 추천이나 가입 자격 판정이 아닙니다.",
    communityIntro: "상품을 고를 때 먼저 확인한 기준과 탐색 경험을 사용자들의 글로 살펴보세요.",
    communityWriteNotice: "작성한 글은 연결된 커뮤니티 API의 정책에 따라 저장됩니다.",
    communityCommentLabel: "연결된 커뮤니티의 대화입니다.",
    currencyIntro: "두 통화를 선택해 외부 환율 조회 결과로 금액을 계산합니다.",
    currencyBadge: "외부 환율 조회",
    branchIntro: "현재 지점 검색 데이터는 연결되어 있지 않습니다.",
    branchSummaryLabel: "연결 지점 데이터",
    branchMapLabel: "연결된 은행 지점 위치를 표시하는 지도",
    branchAttribution: "CAPY MAP",
    account: {
      label: "읽기 전용 계정",
      notice: "계정 입력 기능은 현재 읽기 전용이며 외부 서버로 전송되지 않습니다.",
      actionLabel: "계정 화면으로",
      descriptions: {
        profile: "현재 데이터 소스에 연결된 사용자 정보와 저장 상태입니다.",
        login: "현재 계정 로그인 기능은 연결되어 있지 않습니다.",
        signup: "현재 새 계정 등록 기능은 연결되어 있지 않습니다.",
        findpassword: "현재 비밀번호 찾기 메일 기능은 연결되어 있지 않습니다.",
        modify: "현재 프로필 변경 기능은 연결되어 있지 않습니다.",
        changepassword: "현재 비밀번호 변경 기능은 연결되어 있지 않습니다.",
      },
    },
  },
};

/**
 * 빌드 시점 환경변수로 데이터 공급자를 한 번 선택한다.
 * real을 명시하지 않은 모든 경우에는 외부 요청이 없는 Mock 모드를 사용한다.
 */
const requestedMode: DataMode = import.meta.env.VITE_DATA_MODE === "real" ? "real" : "mock";
const activeSource = {
  mock: { api: mockApi, metadata: sourceMetadata.mock },
  real: { api: realApi, metadata: sourceMetadata.real },
}[requestedMode];

/** 화면과 store가 공유하는 단일 데이터 API와 현재 모드의 안내 문구다. */
export const dataApi = activeSource.api;
export const dataSourceMeta = activeSource.metadata;
