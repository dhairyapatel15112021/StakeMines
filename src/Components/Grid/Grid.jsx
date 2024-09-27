import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectMinesAtoms } from '../../store/atom/selectMines'
import MySvgComponent from './diamond';
import Bomb from './bomb';
import bombSound from '../../assets/bomb.mp3';
import diamondSound from '../../assets/diamond.mp3';
import { betAtom } from '../../store/atom/bet';
import { currnetMinesAtoms } from '../../store/atom/currentMines';


export const Grid = () => {
  const [selectMines,setSelectMines] = useRecoilState(selectMinesAtoms);
  const setCurrentGridNumber = useSetRecoilState(currnetMinesAtoms);
  const [isBet,setIsBet] = useRecoilState(betAtom);
  const [portalContainer, setPortalContainer] = useState([]);
  const [portalMineContainer, setPortalMineContainer] = useState(null);
  const gridRef = useRef();
  const bombAudio = new Audio(bombSound);
  const diamondAudio = new Audio(diamondSound);

  function checkMines(gridArray) {
    if (!isBet) {
      return;
    }
    if (selectMines.findIndex(([row, col]) => row === gridArray[0] && col === gridArray[1]) === -1) {
      const diamondDiv = gridRef.current.children[gridArray[2]];
      setPortalContainer(prevContainers => [...prevContainers, diamondDiv]);
      setCurrentGridNumber((number)=>number+1);
      diamondAudio.play();
    }
    else {
      const mineDiv = gridRef.current.children[gridArray[2]];
      setPortalMineContainer(mineDiv);
      setIsBet(false);
      setCurrentGridNumber(0);
      setSelectMines([]);
      bombAudio.play();
      setTimeout(()=>{
        setPortalContainer([]);
        setPortalMineContainer(null);
      },1500);
    }
  }
  
  return (
    <div className='bg-[#0e212e] row-span-6 col-span-full md:row-span-10 md:col-span-4 flex items-center justify-center p-3 md:p-0'>
      <div className='grid h-[50vmax] w-[60vmax] md:h-[650px] md:w-[650px] grid-rows-5 grid-cols-5 gap-4' ref={gridRef}>
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={index}
            className='bg-[#304553] rounded-md shadow-[0px_8px_1px_rgba(30,51,64,255)] relative cursor-pointer'
            onClick={() => checkMines([Math.floor(index / 5), index % 5, index])}
          ></div>
        ))}
      </div>
      {portalContainer.length !== 0 ? portalContainer.map((container, index) =>
        createPortal(<MySvgComponent key={index} />, container)
      ) : <></>}
      {
        portalMineContainer ? createPortal(<Bomb />, portalMineContainer) : <></>
      }
    </div>
  )
}
