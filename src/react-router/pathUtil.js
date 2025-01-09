import { pathToRegexp } from "path-to-regexp";

/**
 * 得到的匹配结果
 * 如果不能匹配返回 undefined
 * 如果可以匹配，匹配结果是一个对象，该对象中的属性名对应路径规则中的关键字
 * @param {*} path  路径规则
 * @param {*} url 具体体制
 * @param {*} options 相关配置，end、trailing、sensitive
 */
export const pathMatch = (path, pathname, options) => {
  const regExpObj = pathToRegexp(path, getOptions(options));
  const { keys, regexp } = regExpObj;
  const regexpResult = regexp.exec(pathname);
  if (!regexpResult) {
    return null;
  }
  const groups = Array.from(regexpResult).slice(1);
  const params = getParams(groups, keys);
  return {
    isExact: pathname === regexpResult[0],
    params,
    path,
    url: regexpResult[0],
  };
};

/**
 * pathToRegexp 的相关配置
 * @param {*} options
 * @returns
 */
const getOptions = (options = {}) => {
  const opt = { exact: false, ...options };
  return {
    ...options,
    end: opt.exact,
  };
};

/**
 * 根据匹配结果，得到一个 params 对象
 * @param {*} groups
 * @param {*} keys
 */
const getParams = (groups, keys) => {
  const params = {};
  keys.forEach((key, index) => {
    params[key.name] = groups[index];
  });
  return params;
};
