import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider.tsx'
import './index.css'
import App from './App.tsx'
import { ClientOnly } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ClientOnly>
        <App />
      </ClientOnly>
    </Provider>
  </StrictMode>,
)
