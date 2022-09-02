import React from 'react';
import Form from './components/Form/Form';

import jsonFormSchema from './JSON/json-form-schema.json';

const App = () => {
  return jsonFormSchema ? <Form schema={jsonFormSchema} /> : '';
};

export default App;
