import { TokenTransferDetails } from "./format";

interface TokenTransferWithScore extends TokenTransferDetails {
    score: number;
}

const filterFunction = (data: TokenTransferWithScore, threshold: number) =>
    // @ts-ignore
    data?.filter((val: any) => val?.score >= threshold);

export default filterFunction;