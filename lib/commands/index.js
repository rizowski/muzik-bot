import _ from 'lodash';

export default _.flatten([
  require('./player'),
  require('./bot'),
  require('./set')
]);
