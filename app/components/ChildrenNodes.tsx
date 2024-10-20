import Image from "next/image"
import { useRecoilValue } from "recoil"

import {
  CARD_TYPES,
  CARD_TYPES_COLOR,
  CARD_TYPES_COLOR_SECONDARY,
  Category,
} from "@/app/components/CardType"
import { btcPriceAtom } from "@/app/recoil/btcPriceAtom"
import { IChild } from "@/app/recoil/childAtom"
import { formatAddress, formatNumber } from "@/app/utils/format"

export const ChildrenNodes = ({ children }: { children: IChild[] }) => {
  const btcUsdPrice = useRecoilValue(btcPriceAtom)
  const child = children?.[0]

  if (!child) return null

  return (
    <div>
      <div className="absolute flex flex-col gap-4 top-0 left-[-120px] items-end">
        <div className="opacity-30">
          <div>INPUT #{child?.vout}</div>
        </div>

        <div className="opacity-30">
          {child?.address ? formatAddress(child.address) : ""}
        </div>

        <button
          className="opacity-30 hover:opacity-100"
          onClick={() => {}}
          disabled={true}
        >
          REMOVE 🗑️
        </button>

        <button className={`opacity-30 `}>Sign ✍️</button>
      </div>
      <div className="h-[300px] relative max-w-52 min-w-52 bg-transparent rounded-xl  flex flex-col gap-3 items-center justify-center">
        <BtcLogo />
        <span className="font-bold">Bitcoin</span>
        <div className="w-32 h-12 text-center text-white text-xl font-medium pointer-events-none">
          {formatNumber(child?.value, 0, 0, false, false)} sats
        </div>
        <div className="opacity-50 text-[12px]">
          ${formatNumber((child?.value / 100000000) * btcUsdPrice)}
        </div>

        <BtcCategory />
        <BtcBorder />
      </div>
    </div>
  )
}

const BtcCategory = () => {
  return (
    <div className="absolute top-[-3px] right-[-3px] pointer-events-none ">
      <Category color={CARD_TYPES_COLOR.BTC} type={CARD_TYPES.BTC} />
    </div>
  )
}
const BtcLogo = () => {
  return (
    <>
      <Image
        className="w-14 h-14 pointer-events-none"
        src="/bitcoin.png"
        alt="Bitcoin"
        width={54}
        height={54}
        loading="lazy"
      />
    </>
  )
}
const BtcBorder = () => {
  return (
    <div
      className="absolute inset-0 rounded-xl z-[-1]"
      style={{
        margin: "-3px", // Adjust to match the border thickness
        padding: "4px", // Adjust to match the border thickness
        background: `linear-gradient(180deg, ${CARD_TYPES_COLOR.BTC} 0%, ${CARD_TYPES_COLOR.BTC} 50%, ${CARD_TYPES_COLOR_SECONDARY.BTC} 95%, ${CARD_TYPES_COLOR_SECONDARY.BTC} 115%)`,
        borderRadius: "inherit", // Ensure the radius matches the card's radius
      }}
    >
      <div
        className="w-full h-full rounded-xl bg-zinc-900"
        style={{
          borderRadius: "inherit",
        }}
      ></div>
    </div>
  )
}
