const getErrorMessage = (status: number) => {
  switch (status) {
    case 401: {
      return '접근 권한이 없습니다.';
    }
    case 403: {
      return '접근 권한이 없습니다.';
    }
    case 404: {
      return '잘못된 접근입니다.';
    }
    case 500: {
      return '서버 에러가 발생했습니다.';
    }
    default: {
      return '서비스가 원활하지 않습니다.';
    }
  }
};

export default getErrorMessage;
