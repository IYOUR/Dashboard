/**
 * @file home
 * Created by haner on 2017/3/30.
 */

import Mock from 'mockjs';
//import data from './mapData';

/**
 * 首页列表
 */
Mock.mock(
  '/iop/parks', {
    "code": "1",
    "message": "success",
    "data": 'data'
  }
);

export default Mock;
