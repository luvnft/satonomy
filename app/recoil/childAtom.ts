import { OrdinalData } from "@/app/recoil/ordinalsAtom"
import { RunesUtxo } from "@/app/recoil/runesAtom"
import { atom, atomFamily } from "recoil"

export interface Status {
  confirmed: boolean
  block_height: number
  block_hash: string
  block_time: number
}

export interface IChild {
  vout: number
  value: number
  address: string
  txid?: string
  wallet?: string
  status?: Status
  type?: string
  runesValue?: number
  inscription?: OrdinalData
  rune?: RunesUtxo
  isInput?: boolean
}

export const childAtom = atom<IChild>({
  key: "childState",
  default: undefined,
})

export const childFamily = atomFamily<IChild[], string>({
  key: "childFamily",
  default: [],
})
