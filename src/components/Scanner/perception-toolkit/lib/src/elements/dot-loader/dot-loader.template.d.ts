/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare const styles = "\n:host {\n  --color: #999;\n  --dotSize: 8px;\n  --dotMargin: 4px;\n  display: flex;\n}\n\n.dot {\n  border-radius: 50%;\n  width: var(--dotSize);\n  height: var(--dotSize);\n  background: var(--color);\n  margin: var(--dotMargin);\n  animation: bounceHorizontal 1s infinite cubic-bezier(0, 0, 0.4, 1);\n}\n\n:host([vertical]) .dot {\n  animation-name: bounceVertical;\n}\n\n.dot:nth-of-type(2) {\n  animation-delay: 0.1s;\n}\n\n.dot:nth-of-type(3) {\n  animation-delay: 0.2s;\n}\n\n.dot:nth-of-type(4) {\n  animation-delay: 0.3s;\n}\n\n@keyframes bounceHorizontal {\n  0% {\n    transform: none;\n  }\n\n  50% {\n    transform: translateX(-10px);\n  }\n\n  100% {\n    transform: none;\n  }\n}\n\n@keyframes bounceVertical {\n  0% {\n    transform: none;\n    animation-timing-function: ease-in;\n  }\n\n  10% {\n    transform: translateY(-4px);\n    animation-timing-function: ease-in-out;\n  }\n\n  30% {\n    transform: translateY(4px);\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    transform: none;\n  }\n\n  100% {\n    transform: none;\n  }\n}\n";
export declare const html = "\n  <div class=\"dot\"></div>\n  <div class=\"dot\"></div>\n  <div class=\"dot\"></div>\n  <div class=\"dot\"></div>";
