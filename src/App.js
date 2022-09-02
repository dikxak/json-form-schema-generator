import React, { useState } from 'react';
import Form from './components/Form/Form';

import jsonFormSchema from './JSON/json-form-schema.json';

const App = () => {
  const [jsonSchema, setJsonFormSchema] = useState(jsonFormSchema);

  return jsonSchema ? <Form schema={jsonSchema} /> : '';
};

export default App;
