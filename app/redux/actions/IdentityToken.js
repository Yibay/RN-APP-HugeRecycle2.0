import _ from 'lodash';

export const SET_IdentityToken = 'SET_IdentityToken';

/**
 * 设置 用户身份令牌
 * @param {{
 *  'X-AUTH-TOKEN': string,
 *  h5Code: string,
 *  user: object
 * }} identityToken
 * @returns {*}
 */
export function setIdentityToken(identityToken){
  return _.merge(
    { type: SET_IdentityToken },
    identityToken
  )
}