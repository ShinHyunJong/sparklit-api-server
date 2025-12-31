export function formatSheetString(str) {
  // 1. 문자열의 시작과 끝 부분의 공백 제거
  const trimmedStr = str.trim();

  // 2. _ 이외의 모든 특수 문자, 마침표(.) 삭제
  //    정규식 설명:
  //    [^a-z0-9_ ] : 영문 소문자(a-z), 숫자(0-9), 밑줄(_), 공백( )이 아닌 모든 문자
  //    g           : 전역(global) 플래그로, 문자열 내의 모든 일치 항목을 찾아서 바꿉니다.
  const cleanedStr = trimmedStr.replace(/[^a-zA-Z0-9_ \uAC00-\uD7A3]/g, '');

  // 3. 모든 문자를 소문자로 변환
  const lowercasedStr = cleanedStr.toLowerCase();

  // 4. 모든 공백을 밑줄로 대체
  const formattedStr = lowercasedStr.replace(/ /g, '_');

  return formattedStr;
}

/**
 * 엑셀에서 가져온 값을 포매팅합니다.
 * - 값이 문자열이면 그대로 반환합니다.
 * - 값이 숫자이고, 소수점 자릿수가 지정된 자릿수 이상일 경우에만 toFixed를 적용합니다.
 *
 * @param {*} value - 엑셀에서 가져온 어떤 타입의 값.
 * @param {number} [targetDecimalPlaces=2] - toFixed를 적용할 목표 소수점 자릿수 (기본값: 2).
 * @returns {string|number|*} 포매팅된 문자열, 숫자 또는 원본 값.
 */
export function formatExcelValueByType(
  value: number | string | null | undefined,
  targetDecimalPlaces = 2,
) {
  // 1. 값의 타입이 'string'인 경우, 그대로 반환
  if (typeof value === 'string') {
    return value;
  }

  // 2. 값이 'number' 타입인지 확인하고 숫자 포매팅 로직 적용
  if (typeof value === 'number') {
    // NaN 또는 Infinity 같은 유효하지 않은 숫자 값은 그대로 반환 (숫자로 변환될 수 없는 문자열은 이미 위에서 걸러짐)
    if (!isFinite(value) || isNaN(value)) {
      return value.toString();
    }

    const numString = String(value); // 숫자를 문자열로 변환하여 소수점 자릿수 파악
    const decimalPointIndex = numString.indexOf('.');

    if (decimalPointIndex !== -1) {
      // 소수점이 있는 경우
      const currentDecimalPlaces = numString.length - 1 - decimalPointIndex;

      if (currentDecimalPlaces >= targetDecimalPlaces) {
        // 현재 소수점 자릿수가 목표 자릿수 이상이면 toFixed 적용
        return value.toFixed(targetDecimalPlaces).toString(); // 결과는 문자열
      } else {
        // 현재 소수점 자릿수가 목표 자릿수보다 적으면 그대로 반환 (숫자 타입 유지)
        return value.toString();
      }
    } else {
      // 소수점이 없는 정수인 경우 그대로 반환 (숫자 타입 유지)
      return value.toString();
    }
  }
  return value || null;
}
