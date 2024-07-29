import './App.css'
import { Wallet } from './Components/Wallet/Wallet'
import { BetBar } from './Components/BetBar/BetBar'
import { Grid } from './Components/Grid/Grid'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <RecoilRoot>
      <div className='w-[100vw] h-[100vh] grid grid-rows-11 grid-cols-5 bg-[#1a2b38]'>
        <Wallet />
        <BetBar />
        <Grid />
      </div>
    </RecoilRoot>
  )
}

export default App
