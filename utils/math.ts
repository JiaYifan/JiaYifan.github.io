type Numeric = number | string | undefined | null;
/**
 * 将数字转成百分比
 * @param num 百分之 num
 * @returns
 */
export const percentageFormatter = (val: Numeric) => {
  const num = Number(val);
  if (isNaN(num)) {
    return '';
  }
  return new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(num);
};

/**
 * 计算百分比
 * @param numerator 分子
 * @param denominator 分母
 * @returns
 */
export const percentageCalc = (numerator: Numeric, denominator: Numeric) => {
  const num1 = Number(numerator);
  const num2 = Number(denominator);
  if (isNaN(num1) || isNaN(num2) || !num2) {
    return '';
  }
  return percentageFormatter(divide(num1, num2));
};
