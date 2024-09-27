import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { betAmountAtom } from '../../store/atom/betAmount';
import { walletSelector } from '../../store/selector/walletSelector';
import { minesAtom } from '../../store/atom/mines';
import { selectMinesAtoms } from '../../store/atom/selectMines';
import clickSound from '../../assets/click.wav';
import { profitTimeSelector } from '../../store/selector/profitTimesSelector';
import { betAtom } from '../../store/atom/bet';
import { intermediateBetamountAtom } from '../../store/atom/intermediateBetamount';

export const BetBar = () => {
    const setBetAmount = useSetRecoilState(betAmountAtom);
    const [intermediateBetamount , setintermediateBetamount] = useRecoilState(intermediateBetamountAtom);
    const walletAmount = useRecoilValue(walletSelector);
    const [mines, setMines] = useRecoilState(minesAtom);
    const [selectmines, setSelectMines] = useRecoilState(selectMinesAtoms);
    const [isBet, setBet] = useRecoilState(betAtom);
    const profitTimes = useRecoilValue(profitTimeSelector);
    const audio = new Audio(clickSound);
    const setBetBar = (event) => {
        const amount = event.target.value;
        if (amount < 0) {
            alert("Bet amount cannot be negative");
            return;
        }
        if (walletAmount - amount < 0) {
            alert("Insufficient Balance");
            return;
        }
        setintermediateBetamount(()=>amount);
    }

    const selectMines = () => {
        let tempMines = [...selectmines]; // Create a temporary array to hold the mines
        while (tempMines.length < mines) {
            const rowIndex = Math.floor(Math.random() * 5);
            const columnIndex = Math.floor(Math.random() * 5);
            if (tempMines.findIndex(([row, col]) => row === rowIndex && col === columnIndex) === -1) {
                tempMines.push([rowIndex, columnIndex]);
            }
        }
        setSelectMines(tempMines); // Update state once with the complete array
        setBet(true);
        setBetAmount(()=>intermediateBetamount);
        audio.play();
    }

    return (
        <div className='row-span-4 col-span-full md:col-span-1 md:row-span-10 flex items-center justify-center'>
            <div className='bg-[#213743] h-[95%] w-[90%] rounded-md p-2'>
                <div className='flex items-center justify-between text-[#A8B3C7]'>
                    <div>Bet Amount</div>
                    <div>${intermediateBetamount}</div>
                </div>
                <div className='bg-[#304553] rounded-md p-1 mt-2 text-white'>
                    <input type="number" value={intermediateBetamount} className={`bg-[#0e212e] p-2 w-[70%] outline-none border border-[#0e212e] hover:border-white ${isBet ? 'opacity-50' : ''}`} onChange={(e) => setBetBar(e)} disabled={isBet}/>
                    <button className={`w-[15%] text-center border-r border-[#A8B3C7] ${isBet? 'opacity-50' : ''}`} onClick={() => setBetBar( { "target": { "value": intermediateBetamount * 0.5 } } )} disabled={isBet}>1/2</button>
                    <button className={`w-[15%] text-center ${isBet ? 'opacity-50' : ''}`} onClick={() => setBetBar( { "target": { "value": intermediateBetamount * 2 } } )} disabled={isBet}>2x</button>
                </div>
                <div className='text-[#A8B3C7] mt-3'>Mines</div>
                <select className='w-[50%] md:w-[100%] p-2 bg-[#0e212e] text-white border-2 border-[#304553] rounded-md  outline-none hover:border-white' onChange={(e) => setMines(parseInt(e.target.value)+1)} disabled={isBet}>
                    {
                        Array.from({ length: 24 }).map((_, index) => {
                            return (
                                <option key={index}>{index + 1}</option>
                            )
                        })
                    }
                </select>
                {
                    !isBet ? <button className='w-[100%] mt-8 md:mt-4 py-3 px-2 rounded-sm bg-[#00e700] font-semibold' onClick={selectMines}>Bet</button> :
                        <div>
                            <div className='text-[#A8B3C7] mt-3'>Total profit ({profitTimes}x)</div>
                            <div className='w-[100%] p-2 bg-[#0e212e] text-white border-2 border-[#304553] rounded-md  outline-none hover:border-white'>{intermediateBetamount*profitTimes}</div>
                        </div>
                }
            </div>
        </div>
    )
}
