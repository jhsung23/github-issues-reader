# Github Issues Reader

> - 개발자: 성지현
> - 개발 기간: 2023.08.30

facebook/react repository의 issues 목록과 상세 내용을 확인하는 웹 사이트입니다.

## 📄 요구사항

- 이슈 목록 및 상세 화면 구현
    - 목록은 open된 이슈를 코멘트가 많은 순으로 표시
    - 다섯 번째 셀마다 광고 이미지 출력
        - 광고 이미지 클릭 시 원티드 사이트로 이동
    - 이슈 목록은 인피니티 스크롤로 구현
- 데이터 요청 중 로딩 표시
- 에러 화면 구현

## 🔗 배포 링크

[https://github-issues-reader.vercel.app](https://github-issues-reader.vercel.app)

## 🏃‍♂️ 실행 방법

본 레포지토리를 clone한 후, 다음 절차를 따라주세요.

1. 패키지 설치
```bash
yarn
```

2. root 디렉토리에 `.env` 파일을 만들어 환경 변수를 등록해 주세요.
```bash
VITE_GITHUB_AUTH_TOKEN = YOUR_GITHUB_AUTH_TOKEN
```  

3. 개발 환경에서 실행
```bash
yarn dev
```
위 명령어 입력 후 `http://localhost:5173/`에 접속해 주세요.

## 🎬 실행 화면

![Sep-11-2023 16-31-11](https://github.com/jhsung23/github-issues-reader/assets/69228045/55e34c8a-49f6-435d-ba5f-168262137954)

## 🧑🏻‍💻 개발 내용

### issue 목록 불러오기

`octokit` 라이브러리를 사용해 주어진 조건에 맞는 이슈들을 페칭했습니다.

```tsx
octokitInstance()
	.request(ENDPOINT, {
		owner: REPO.OWNER,
		repo: REPO.NAME,
		page: pageNumber,
		per_page: PER_PAGE,
		state: 'open',
		sort: 'comments',
})
```

issue 페칭과 관련 있는 로직을 분리하기 위해 [useIssueQuery 훅](https://github.com/jhsung23/github-issues-reader/blob/main/src/apis/useIssueQuery.tsx)을 만들었고, 해당 훅이 호출되면 effect를 사용해 fetchIssues 함수를 실행합니다.

훅 내부에서 서로 연관있는 상태는 `useReducer`를 사용해 하나로 묶어 업데이트할 수 있도록 했습니다.

```tsx
const fetchIssues = useCallback(async (pageNumber: number) => {
    try {
      const responseData = await getIssues(pageNumber, PER_PAGE);
      dispatch({
        type: 'loadIssue',
        issues: responseData,
        hasNextPage: responseData.length < PER_PAGE || responseData.length === 0 ? false : true,
      });
    } catch (e) {
      window.alert(e);
    }
  }, []);
```

### issue 목록 인피니티 스크롤

리스트의 최하단부가 뷰포트 내부에 들어왔는지 감지하기 위해 `intersection observer API`를 사용한 [useIntersectionObserver 훅](https://github.com/jhsung23/github-issues-reader/blob/main/src/hooks/useIntersectionObserver.tsx)을 만들었습니다.

훅으로부터 감시하고자 하는 대상에 달아줄 `ref`와 해당 ref를 가진 요소가 뷰포트 내부에 들어왔는지 알려줄 `inView` 값을 받습니다.

```tsx
const [observerRef, inView] = useIntersectionObserver({ threshold: 0.3 });
```

스크롤이 최하단까지 내려졌는지 확인하기 위한 `div` 요소를 리스트 아래에 두고, `inView`가 true일 때 `fetchIssues`를 실행합니다.

```tsx
useEffect(() => {
    if (!isLoading && inView) fetchNextPageIssues();
  }, [isLoading, inView, fetchNextPageIssues]);
```

이렇게 새로 업데이트된 issues 목록을 UI로 보여줍니다.

### issue의 상세 내용 보여주기

목록의 아이템을 `react-router-dom`의 `Link` 컴포넌트로 감싸 클릭 시 이슈 상세 내용 페이지로 이동할 수 있게 헀습니다.

이때 `Link`의 `state` prop으로 issue 내용을 넘겨주어 fetch 호출을 줄였습니다.

```tsx
<Li>
  <StyledLink to={`/issues/${issue.issueId}`} state={issue}>
    <IssueInfo issue={issue} />
  </StyledLink>
</Li>
```

```tsx
const IssueDetailPage = () => {
  const { state: issue }: { state: Issue } = useLocation();
  //...
}
```

### 목록의 스크롤 값이 issue의 상세 내용 페이지에도 적용되는 문제

목록을 살피다가 issue를 클릭하여 이슈 상세 페이지로 이동했을 때, 페이지의 스크롤이 상단으로 이동하지 않는 문제가 있었습니다.





## 🛠️ 기술 스택

<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/react router-CA4245?style=flat&logo=react router&logoColor=white">
  <img src="https://img.shields.io/badge/octokit-343539?style=flat&logo=octokit&logoColor=white">
</div>
