import React from 'react'
import { useRecoilValue } from 'recoil'
import { walletSelector } from '../../store/selector/walletSelector'


export const Wallet = () => {
  const walletAmount = useRecoilValue(walletSelector);
  return (
    <div className='col-span-5 flex items-center justify-center text-white bg-[#213743] shadow-md'>
        <div className='bg-[#0e212e] hover:bg-[black] py-3 px-6 rounded-tl-md rounded-bl-md'>{parseFloat(walletAmount)}</div>
        <div className='bg-[#1375e1] py-3 px-3 rounded-tr-md rounded-br-md'>Wallet</div>
    </div>
  )
}
