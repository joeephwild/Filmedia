const formatFunction = (data) =>
  data?.TokenTransfers?.TokenTransfer?.map((transfer) => {
    const { operator, to } = transfer ?? {};
    const isMint = operator?.addresses?.[0] === to?.addresses?.[0];
    delete transfer?.operator;
    delete transfer?.to;
    // excluding all airdrop mints (operator != to)
    return isMint ? transfer : null;
  })?.filter(Boolean);

export default formatFunction;