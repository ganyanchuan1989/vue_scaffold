import request from '@/utils/request';

export const queryUserAll = async () => {
  const ret = await request({
    url: '/api/user/list',
  });
  if (ret.code === 0) {
    return ret.data;
  }
  return null;
};
