import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'
import './index.css'
import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  ScrambleTextPlugin,
  useGSAP,
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
