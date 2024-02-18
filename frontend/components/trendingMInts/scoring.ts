import { TokenTransferDetails } from "./format";

const scoringFunction = (data: TokenTransferDetails[]) => {
    let trendingMints: any = [];

    data.forEach((val) => {
        const { tokenAddress, chain } = val ?? {};
        // @ts-ignore
        const valIndex = trendingMints.findIndex((value) => {
            return value?.tokenAddress === tokenAddress && value?.chain === chain;
        });
        if (valIndex !== -1) {
            trendingMints[valIndex] = {
                ...trendingMints[valIndex],
                // For each new mints, add score of 1
                score: trendingMints[valIndex]?.score + 1,
            };
        } else {
            // For new token mints, assigned initial score of 1
            trendingMints.push({ ...val, score: 1 });
        }
    });

    return trendingMints;
};

export default scoringFunction;