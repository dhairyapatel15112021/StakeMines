import { selector } from "recoil";
import { minesAtom } from "../atom/mines";
import { currnetMinesAtoms } from "../atom/currentMines";

export const profitTimeSelector = selector({
    key : "profitTimeSelector",
    get : ({get})=>{
        const numberOfMines = get(minesAtom);
        const currentSelectedMines = get(currnetMinesAtoms);
        let multiplier = 1+(((currentSelectedMines)/(25-numberOfMines))) * Math.log(1+currentSelectedMines);
        return multiplier;
    }
})