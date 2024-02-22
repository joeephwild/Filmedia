import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilProvider: React.FC = ({ children }:any) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;