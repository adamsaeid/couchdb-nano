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

const helpers = require('../../helpers/integration');
const harness = helpers.harness(__filename);
const db = harness.locals.db;
const it = harness.it;

it('should insert a bunch of items', helpers.insertThree);



it('should be able to retrieve rtsults for one query', function(assert) {
  const p = db.query({ queries:  [{limit: 2}] }, function(error, resp) {
    assert.equal(error, null, 'should work');
    assert.equal(resp.results.length, 1, 'and get 1 set of query results');
    assert.equal(resp.results[0].rows.length, 2, 'and return correct query results');
  });
  assert.ok(helpers.isPromise(p), 'returns Promise');
  p.then(function(resp) {
    assert.ok(true, 'Promise is resolved');
    assert.equal(resp.results.length, 1, 'and get 1 set of query results');
    assert.equal(resp.results[0].rows.length, 2, 'and return correct query results');
    assert.end();
  }).catch(function() {
    assert.ok(false, 'Promise is rejected');
  });
});

it('should be able to retrieve results for multiple queries', function (assert) {
  const p = db.query({ queries:  [{limit: 2}, { keys: ['foobar', 'barfoo']}] }, function(error, resp) {
    assert.equal(error, null, 'should work');
    assert.equal(resp.results.length, 2, 'and get 2 sets of query results');
    assert.equal(resp.results[0].rows.length, 2, 'and return correct results for first query');
    assert.equal(resp.results[1].rows[0].id, 'foobar', 'correct results for second query (row 1');;
    assert.equal(resp.results[1].rows[1].id, 'barfoo', 'correct results for second query (row 2)');
  });
  assert.ok(helpers.isPromise(p), 'returns Promise');
  p.then(function(resp) {
    assert.ok(true, 'Promise is resolved');
    assert.equal(resp.results.length, 2, 'and get 2 sets of query results');
    assert.equal(resp.results[0].rows.length, 2, 'and return correct results for first query');
    assert.equal(resp.results[1].rows[0].id, 'foobar', 'correct results for second query (row 1');;
    assert.equal(resp.results[1].rows[1].id, 'barfoo', 'correct results for second query (row 2)');
    assert.end();
  }).catch(function() {
    assert.ok(false, 'Promise is rejected');
  });
})
