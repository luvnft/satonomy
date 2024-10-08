import React, { useState, useEffect } from "react";
import { formatAddress } from "@/app/utils/format";
import { useAccounts, useConnectModal } from "@particle-network/btc-connectkit";

export const ConnectButton = () => {
  const { openConnectModal, disconnect } = useConnectModal();
  const { accounts } = useAccounts();

  const account = accounts[0];
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY;
    const x = e.clientX;

    if (y < rect.top || y > rect.bottom || x < rect.left || x > rect.right) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownVisible &&
        !document
          .querySelector(".dropdown-container")
          ?.contains(e.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div
      className="relative dropdown-container gap-3 flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="text-white bg-zinc-900 px-4 py-2 rounded-md"
        onClick={() => {
          if (!account) {
            openConnectModal?.();
          }
        }}
      >
        {account ? formatAddress(account) : "Connect Wallet"}
      </button>

      {account && dropdownVisible && (
        <div
          className="absolute left-0 "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="w-[148px] text-white bg-zinc-600 px-4 py-2 rounded-md"
            onClick={() => {
              disconnect?.();
              setDropdownVisible(false);
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};
