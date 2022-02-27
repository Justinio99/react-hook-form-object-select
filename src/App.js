import logo from './logo.svg';
import './App.css';
import SelectComponent from'./Select'
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';

function App() {
  const [code, setCode ] = useState([]);
  const [ form, setForm ] = useState({})

  useEffect(() => {
    axios.get('http://localhost:5000/codes').then(res => setCode(res.data));
    axios.get('http://localhost:5000/testForm/').then(res => setForm(res.data));
  }, [])


  const methods = useForm({
    shouldUnregister: false,
    mode: 'onChange',
    defaultValues: useMemo(() => form, [form])
  });

  useEffect(() => {
    methods.reset(form)
  }, [form, methods])

  return (
    <div className="App" style={{marginTop: 100}}>
      <form style={{display: 'flex', justifyContent: 'center'}}>
      <FormProvider  {...methods}>
    <Stack spacing={2} width={300}>

      <SelectComponent label={"questionType"} label="questionType" name="questionType" options={code.filter(el => el.group === "questionType")}/>
      <SelectComponent label={"executionRegime"} label={"executionRegime"} name="executionRegime" options={code.filter(el => el.group === "executionRegime")}/>
      </Stack>
      </FormProvider>
      </form>
    </div>
  );
}

export default App;
