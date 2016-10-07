import { default as app } from './app/reducer';
import { default as dao } from './dao/reducer';
import { default as acl } from './acl/reducer';
import { default as token } from './token/reducer';
import { default as tokenAcl } from './tokenAcl/reducer';
import { default as market } from './market/reducer';
import { default as ambix } from './ambix/reducer';
import { default as log } from './log/reducer';
import { default as admin } from './admin/reducer';

export {
  app,
  dao,
  acl,
  token,
  tokenAcl,
  ambix,
  market,
  log,
  admin
};
