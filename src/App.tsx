import { useState, FormEvent } from 'react'
import { useMultistepForm } from './useMultistepForm'
import { UserForm } from './UserForm'
import { AddressForm } from './AddressForm'
import { AccountForm } from './AccountForm' 

type FormData = {
  firstName: String,
  lastName: String,
  age: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  email: String,
  password: String,
}

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: '',
}

function App() {
  const [data, setData] = useState(INITIAL_DATA)

  function updateFields(fields: Partial<FormData>) {
    setData(previous => {
      return {...previous, ...fields}
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } = useMultistepForm([
    <UserForm {...data} updateFields={updateFields} />, 
    <AddressForm {...data} updateFields={updateFields} />, 
    <AccountForm {...data} updateFields={updateFields} />
  ])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isLastStep) return next()
    alert('Successful Account Creation')
  }

  return (
    <div style={{
      position: 'relative',
      background: 'white',
      border: '1px solid black',
      padding: '2rem',
      margin: '1rem',
      borderRadius: '.5rem',
      fontFamily:'Arial'
    }}>
      <form onSubmit={onSubmit}>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end'}}>
          {!isFirstStep && <button type='button' onClick={back}>Back</button>}
          <button type='submit'>
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
