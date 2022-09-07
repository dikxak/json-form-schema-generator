import React, { useState } from 'react';
import Form from './components/Form/Form';

import jsonFormSchema from './JSON/json-form-schema.json';
import formData from './JSON/form-data.json';
import BarGraph from './components/BarGraph/BarGraph';

const App = () => {
  const [jsonSchema, setJsonFormSchema] = useState(jsonFormSchema);
  const [jsonFormData, setJsonFormData] = useState(formData);

  return <BarGraph />;
  // return jsonSchema ? <Form data={jsonFormData} schema={jsonSchema} /> : '';
};

export default App;
