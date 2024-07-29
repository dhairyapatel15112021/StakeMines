import { selector } from "recoil";
import { betAmountAtom } from "../atom/betAmount";

export const walletSelector = selector({
    key : "walletSelector",
    get : ({get})=>{
        const betAmount = get(betAmountAtom);
        return 40-betAmount;
    }
})