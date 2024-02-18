export interface Data {
  TokenTransfers: TokenTransfer[];
}

export interface TokenTransfer {
  TokenTransfer: TokenTransferDetails[];
}

export interface TokenTransferDetails {
  tokenAddress: string;
  operator: Identity;
  to: Identity;
  token: Token;
  chain: String[],
}

export interface Identity {
  addresses: string;
}

export interface Token {
  name: string;
}
const formatFunction = (data: Data) =>
  // @ts-ignore 
  data?.TokenTransfers?.TokenTransfer?.map((transfer: TokenTransfer) => {
    // @ts-ignore
    const { operator, to } = transfer ?? {};
    const isMint = operator?.addresses?.[0] === to?.addresses?.[0];
    // @ts-ignore
    delete transfer?.operator;
    // @ts-ignore
    delete transfer?.to;
    // excluding all airdrop mints (operator != to)
    return isMint ? transfer : null;
  })?.filter(Boolean);

export default formatFunction;