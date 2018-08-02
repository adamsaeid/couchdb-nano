// Licensed under the Apache License, Version 2.0 (the 'License'); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

'use strict';

const queryDocument = require('../../helpers/unit').unit([
  'document',
  'query'
]);

queryDocument({
  queries: [{ limit :2},{keys:['foobar', 'barfoo']}]
}, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    accept: 'application/json'
  },
  uri: '/mock/_all_docs/queries',
  qs: { include_docs: true },
  body: '{"queries":[{"limit":2},{"keys":["foobar","barfoo"]}]}'}
);