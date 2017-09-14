import { addRoute } from 'meteor/vulcan:core';

import '../components/counters/CountersList.jsx';

addRoute({ name: 'counters', path: '/', componentName: 'CountersList' });
