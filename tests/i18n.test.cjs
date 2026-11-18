const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const React = require('react');
const { create, act } = require('react-test-renderer');
const { appWithTranslation, useTranslation } = require('next-i18next');
const { serverSideTranslations } = require('next-i18next/serverSideTranslations');
const { transformSync } = require('next/dist/build/swc');
const config = require('../next-i18next.config');
function load(file, overrides = {}) {
 const filename=path.resolve(file), localRequire=createRequire(filename);
 const {code}=transformSync(fs.readFileSync(filename,'utf8'),{filename,jsc:{parser:{syntax:'ecmascript',jsx:true},transform:{react:{runtime:'automatic'}}},module:{type:'commonjs'}});
 const exports={};vm.runInNewContext(code,{exports,console,require:name=>name in overrides?overrides[name]:name==='@constants/data'?{}:localRequire(name)});return exports;
}
const Experience=load('components/Experience.js').default;
function Identity() {const {t}=useTranslation('common');return React.createElement('p',null,t('name')+' | '+t('designation'));}
const App=appWithTranslation(({Component})=>React.createElement(Component),config);
for(const locale of ['en','ru','az']) {
 test(locale+': bundled translations load with no public directory in the runtime cwd',async()=>{
  const previous=process.cwd();let props;
  try {process.chdir(os.tmpdir());props=await serverSideTranslations(locale,['common'],config);} finally {process.chdir(previous);}
  assert.equal(props._nextI18Next.initialI18nStore[locale].common.name,config.resources[locale].common.name);
  for(const key of ['experienceArr','educationArr']) assert.deepEqual(props._nextI18Next.initialI18nStore[locale].common[key],config.resources[locale].common[key]);
 });
 test(locale+': empty homepage payload recovers identity and client navigation to Experience',async()=>{
  const props={_nextI18Next:{initialLocale:locale,initialI18nStore:{[locale]:{common:{}}},ns:['common'],userConfig:config}};
  let view; await act(async()=>{view=create(React.createElement(App,{Component:Identity,pageProps:props,router:{locale}}));});
  const identity=view.root.findByType('p').children.join('');assert.equal(identity,config.resources[locale].common.name+' | '+config.resources[locale].common.designation);
  await act(async()=>{view.update(React.createElement(App,{Component:Experience,pageProps:await serverSideTranslations(locale,['common'],config),router:{locale}}));});
  const text=JSON.stringify(view.toJSON());for(const record of [...config.resources[locale].common.experienceArr,...config.resources[locale].common.educationArr]) {assert.ok(text.includes(record.title));assert.ok(text.includes(record.desc));}
  view.unmount();
 });
 test(locale+': direct Experience renders every career and education record',async()=>{
  let view; const props=await serverSideTranslations(locale,['common'],config);
  await act(async()=>{view=create(React.createElement(App,{Component:Experience,pageProps:props,router:{locale}}));});
  const markup=JSON.stringify(view.toJSON());
  assert.ok(markup.includes(config.resources[locale].common.experience));assert.ok(markup.includes(config.resources[locale].common.education));assert.equal((markup.match(/experience-card/g)||[]).length,config.resources[locale].common.experienceArr.length+config.resources[locale].common.educationArr.length);view.unmount();
 });
}
test('Experience falls back to existing locale data and reports malformed translation arrays',()=>{
 const errors=[];const original=console.error;console.error=(...args)=>errors.push(args);
 try {
 const Broken=load('components/Experience.js',{'next-i18next':{useTranslation:()=>({t:(key,opts)=>opts?.defaultValue||key,i18n:{resolvedLanguage:'az'}})}}).default;
 let view;act(()=>{view=create(React.createElement(Broken));});assert.ok(JSON.stringify(view.toJSON()).includes(config.resources.az.common.experienceArr[0].title));assert.equal(errors.length,1);view.unmount();
 } finally {console.error=original;}
});
