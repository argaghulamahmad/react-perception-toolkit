/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if(!self.perceptionToolkitLoader){const e=async e=>{if(!n[e]&&(await new Promise(async o=>{if("document"in self){const n=document.createElement("script");n.src=function(){let e="";return window.PerceptionToolkit&&window.PerceptionToolkit.config&&window.PerceptionToolkit.config.root&&(e=window.PerceptionToolkit.config.root),`${e}/lib/bundled`}()+e.slice(1),n.defer=!0,document.head.appendChild(n),n.onload=o}else importScripts(e),o()}),!n[e]))throw new Error(`Module ${e} didn’t register its module`);return n[e]},o=async(o,n)=>{const t=await Promise.all(o.map(e));n(1===t.length?t[0]:t)},n={require:Promise.resolve(o)};self.perceptionToolkitLoader=((o,t,i)=>{n[o]||(n[o]=new Promise(async o=>{let n={};const r={uri:location.origin+function(){let e="";return window.PerceptionToolkit&&window.PerceptionToolkit.config&&window.PerceptionToolkit.config.root&&(e=window.PerceptionToolkit.config.root),`${e}/lib/bundled`}()+name.slice(1)},a=await Promise.all(t.map(o=>"exports"===o?n:"module"===o?r:e(o))),d=i(...a);n.default||(n.default=d),o(n)}))})}perceptionToolkitLoader("./onboarding.js",["exports","./pt-chunk-bc29be45.js"],function(e,o){"use strict";window.addEventListener("keyup",e=>{const n=document.activeElement;if(n.tagName===o.OnboardingCard.defaultTagName.toUpperCase())switch(e.key){case" ":n.next();break;case"Escape":o.fire(o.OnboardingCard.onboardingFinishedEvent,n);break;default:return}}),window.addEventListener(o.OnboardingCard.onboardingFinishedEvent,e=>{const n=e.target,t=o.OnboardingCard.defaultTagName.toUpperCase();n&&n.tagName===t&&(n.remove(),document.body.focus())}),customElements.define(o.OnboardingCard.defaultTagName,o.OnboardingCard),e.startOnboardingProcess=async function(e){const{config:n}=window.PerceptionToolkit||{config:{root:""}},{root:t=""}=n,i=new o.OnboardingCard({polyfillPrefix:t});await i.ready,i.mode="fade";const r=await async function(e){const o=e.map(e=>new Promise((o,n)=>{const t=new Image;t.src=e,t.onerror=n,t.onload=(()=>o(t))}));return await Promise.all(o)}(e);for(const e of r)e.width=.5*e.naturalWidth,e.height=.5*e.naturalHeight,0!==i.width&&0!==i.height||(i.width=e.width,i.height=e.height),i.appendChild(e);document.body.appendChild(i)},Object.defineProperty(e,"__esModule",{value:!0})});
