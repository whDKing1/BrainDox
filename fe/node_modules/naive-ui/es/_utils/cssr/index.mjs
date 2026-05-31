import { plugin as BemPlugin } from '@css-render/plugin-bem';
import { CssRender } from 'css-render';
const namespace = 'n';
const prefix = `.${namespace}-`;
const elementPrefix = '__';
const modifierPrefix = '--';
const cssr = CssRender();
const plugin = BemPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
});
cssr.use(plugin);
const {
  c,
  find
} = cssr;
const {
  cB,
  cE,
  cM,
  cNotM
} = plugin;
function insideModal(style) {
  return c(({
    props: {
      bPrefix
    }
  }) => `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`, [style]);
}
function insidePopover(style) {
  return c(({
    props: {
      bPrefix
    }
  }) => `${bPrefix || prefix}popover`, [style]);
}
function asModal(style) {
  return c(({
    props: {
      bPrefix
    }
  }) => `&${bPrefix || prefix}modal`, style);
}
// child block
const cCB = (...args) => {
  return c('>', [cB(...args)]);
};
function createKey(prefix, suffix) {
  return prefix + (suffix === 'default' ? '' : suffix.replace(/^[a-z]/, startChar => startChar.toUpperCase()));
}
export { asModal, c, cB, cCB, cE, cM, cNotM, createKey, find, insideModal, insidePopover, namespace, prefix };