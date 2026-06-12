import Image from "next/image";
import { Asset } from "../model";

interface AssetIconProps {
  asset: Asset;
  size?: number;
  className?: string;
}

const AssetIcon = ({ asset, size = 24, className }: AssetIconProps) => {
  return (
    <Image
      src={asset.assetImage}
      alt={asset.symbol}
      width={size}
      height={size}
      className={`shrink-0 rounded-full ${className ?? ""}`}
    />
  );
};

export default AssetIcon;
