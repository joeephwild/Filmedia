import { init, useQuery, useQueryWithPagination } from '@airstack/airstack-react';
import dayjs, { Dayjs } from "dayjs";
import { chains, interval, limit, tokenType } from "../../utils/contants";
import formatFunction from "./format";
import scoringFunction from './scoring';
import filterFunction from './filter';

const AIRSTACK_API_KEY = "1b12f927657d44dce9727a129dc65907a";

init(AIRSTACK_API_KEY);

const query = `
query MyQuery(
  $startTime: Time,
  $endTime: Time,
  $tokenType: [TokenType!],
  $chain: TokenBlockchain!,
  $limit: Int
) {
  TokenTransfers(
    input: {
      filter: {
        from: {_eq: "0x0000000000000000000000000000000000000000"},
        blockTimestamp: {_gte: $startTime, _lte: $endTime},
        tokenType: {_in: $tokenType},
      }
      blockchain: $chain,
      order: {blockTimestamp: DESC},
      limit: $limit
    }
  ) {
    TokenTransfer {
      tokenAddress
      operator {
        addresses
      }
      to {
        addresses
      }
      token {
        name
      }
    }
  }
}
`;



const trendingMints = async (currentTime: Dayjs) => {
  var mintsData: any = [];
  // Iterate over all blockchain
  const { data, error, loading } = useQuery(query, {
    startTime: dayjs(currentTime?.subtract(interval, "h")).format(
      "YYYY-MM-DDTHH:mm:ss[Z]"
    ),
    endTime: currentTime?.format("YYYY-MM-DDTHH:mm:ss[Z]"),
    chain: "ethereum",
    limit,
    tokenType,
  });



  if (!error) {
    mintsData = [
      ...mintsData,
      ...(formatFunction(data)?.map((mint: any) => ({
        ...mint,
        chain: "ethereum",
      })) ?? []),
    ];
  } else {
    console.error("Error: ", error);
  }

  const scoredData = await scoringFunction(mintsData);
  const filteredData = await filterFunction(scoredData, 9); // only mints with more than 9 score are returned
  return filteredData;

};

export default trendingMints;