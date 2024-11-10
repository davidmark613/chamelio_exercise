import './App.css';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { EmailForm } from './components/EmailForm';
import { Search } from './components/Search';

function App() {

  return (
    <div className='app'>
      <div>
        <h1>Task 1 - React component</h1>
        <EmailForm />
      </div>
      <div>
        <h1>Task 2 Word JS Add In</h1>
        <ChakraProvider value={defaultSystem}>
          <Search />
        </ChakraProvider>
      </div>
    </div>
  )
}

export default App
