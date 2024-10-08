import { generateBowtiePath } from "@/app/components/Card";

export const useOutputs = ({
  butterfly,
  totalHeight,
  outputsCount,
  height,
  inputHeight,
  inputsCount,
}: {
  butterfly: any;
  totalHeight: number;
  outputsCount: number;
  height: number;
  inputHeight: number;
  inputsCount: number;
}) => {
  const paths = [];

  const inputX = 184;
  const outputX = -174;
  const outputY = inputHeight / 2;

  for (let i = 0; i < outputsCount; i++) {
    let inputY = height / 2 + height * i;

    const pathData = generateBowtiePath(inputX, inputY, outputX, outputY);

    const strangeness = butterfly.outputs[i].value / 1000;
    const strangenessAdjusted =
      strangeness > 4 ? 4 : strangeness < 2 ? 2 : strangeness;

    const isEven = inputsCount % 2 !== 0;
    const mode = Math.floor(inputsCount / 2);
    const stroke = isEven && mode === i ? "#feb47b" : `url(#gradient-2-${i})`;

    paths.push(
      <svg
        key={i}
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 200 ${totalHeight}`}
        overflow={"visible"}
      >
        <defs>
          <linearGradient
            id={`gradient-2-${i}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#feb47b", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ff7e5f", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d={pathData}
          stroke={stroke}
          strokeWidth={strangenessAdjusted}
          fill="none"
        />
      </svg>
    );
  }

  const feePathDataYnputY = -130;

  const feePathData = generateBowtiePath(
    inputX,
    feePathDataYnputY,
    outputX,
    outputY
  );

  paths.unshift(
    <svg
      key="fee"
      className="absolute top-0 left-0 w-full h-full z-[-1]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 200 ${totalHeight}`}
      overflow={"visible"}
    >
      <defs>
        <linearGradient id={`gradient-2-000`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#feb47b", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#ff7e5f", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        d={feePathData}
        stroke={`url(#gradient-2-000)`}
        strokeWidth={"1"}
        fill="none"
      />
    </svg>
  );

  return paths;
};
