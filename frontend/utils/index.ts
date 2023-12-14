import { image1, image2, image3 } from "../assets/images";

export type Network = {
  name: string;
  rpcUrl: string;
  chainId: string;
  symbol: string;
  explorer: string;
  image: string;
};

export type Option = {
  title: string;
  icon: string; // Use the FontAwesomeIconName type here
  networks: string[];
  // ... rest of the properties ...
};

export const lib = [
  {
    value: "Favourite",
    iconName: "heart-outline",
  },
  {
    value: "Downloads",
    iconName: "download-outline",
  },
  {
    value: "Playlist",
    iconName: "list",
  },
  {
    value: "Music",
    iconName: "musical-notes",
  },
  {
    value: "Albums",
    iconName: "albums-outline",
  },
  {
    value: "Podcast",
    iconName: "headset",
  },
  {
    value: "Videos",
    iconName: "archive",
  },
  {
    value: "Creators",
    iconName: "people",
  },
  {
    value: "Recorded live session",
    iconName: "recording",
  },
  {
    value: "Event",
    iconName: "glasses",
  },
  {
    value: "Nft",
    iconName: "contrast",
  },
];

export function hasHttpsCaseInsensitive(str: string) {
  return str.toLowerCase().startsWith("https://");
}

export const networks: Network[] = [
  {
    name: "Avalanche",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    chainId: "0xa86a",
    symbol: "AVAX",
    explorer: "https://cchain.explorer.avax.network/",
    image: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  },
  {
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainId: "0x38",
    symbol: "BNB",
    explorer: "https://bscscan.com/",
    image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  },
  {
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_ID",
    chainId: "0x1",
    symbol: "ETH",
    explorer: "https://etherscan.io/",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Polygon (Matic)",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    chainId: "0x89",
    symbol: "MATIC",
    explorer: "https://explorer.matic.network/",
    image: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
];

export const options: Option[] = [
  {
    title: "Wallet",
    icon: "google-wallet",
    networks: [
      "https://cdn3d.iconscout.com/3d/premium/thumb/binance-coin-4059200-3364052.png?f=webp",
      "https://cryptologos.cc/logos/avalanche-avax-logo.png",
      "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp",
      "https://avatars.githubusercontent.com/u/108554348?s=280&v=4",
    ],
    // actve: () => {
    //   return <View>wallet</View>;
    // },
  },
  {
    title: "Scan QR Code",
    icon: "qrcode",
    networks: [
      "https://cdn3d.iconscout.com/3d/premium/thumb/binance-coin-4059200-3364052.png?f=webp",
      "https://cryptologos.cc/logos/avalanche-avax-logo.png",
      "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp",
      "https://avatars.githubusercontent.com/u/108554348?s=280&v=4",
    ],
  },
  {
    title: "Cards",
    icon: "cc-visa",
    networks: [
      "data:image/png;base64,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",
      "https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg",
    ],
  },
  {
    title: "Coinbase Pay",
    icon: "https://dvh1deh6tagwk.cloudfront.net/finder-au/wp-uploads/2017/09/Coinbaselogo_Supplied_250x250-2.png",
    networks: [
      // "https://cdn3d.iconscout.com/3d/premium/thumb/binance-coin-4059200-3364052.png?f=webp",
      // "https://cdn3d.iconscout.com/3d/premium/thumb/binance-coin-4059200-3364052.png?f=webp",
    ],
  },
  {
    title: "Binance Pay",
    icon: "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png",
    networks: [
      // "https://cdn3d.iconscout.com/3d/premium/thumb/binance-coin-4059200-3364052.png?f=webp",
      // "https://cdn3d.iconscout.com/3d/premium/thumb/binance-coin-4059200-3364052.png?f=webp",
    ],
  },
];

export const songs = [
  {
    name: "Synthwave Reverie",
    description: "An immersive journey through retro-futuristic soundscapes.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmVq7FjdMEVrBKsdLV2SpBmA16XswYqYWSdSbf3w9Y4Vun",
    external_url:
      "https://gateway.pinata.cloud/ipfs/QmQsPcQNUEQgo5wMMtz6aFN5YrVXR6bqnzyshk2ZUpuD94",
    attributes: [
      {
        trait_type: "Artist",
        value: "Eva Synth",
      },
      {
        trait_type: "Genre",
        value: "Synthwave",
      },
      {
        trait_type: "Duration",
        value: "6:00",
      },
    ],
    properties: {
      royalties: {
        artist: 85,
        platform: 10,
        remixers: 5,
      },
      file: {
        format: "audio/flac",
        url: "https://www.evasynth.com/synthwave-reverie.flac",
      },
    },
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/synthwave-reverie",
      },
      {
        name: "Rarible",
        url: "https://rarible.com/evasynth",
      },
    ],
  },
  {
    name: "Rhythmic Fusion",
    description:
      "A dynamic fusion of electronic beats and world music influences.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmezmoYbznYyV7stwtU8hUDnEQ9VHNfNFaXogc8uaGdrpv",
    external_url:
      "https://gateway.pinata.cloud/ipfs/QmS7miWViZk9N7URkoiNbBfQcRH7YJxDWKxjhRTcysiftJ",
    attributes: [
      {
        trait_type: "Artist",
        value: "Carlos Beats",
      },
      {
        trait_type: "Genre",
        value: "Electronic World",
      },
      {
        trait_type: "Duration",
        value: "4:15",
      },
    ],
    properties: {
      royalties: {
        artist: 75,
        platform: 15,
        featured_artists: 10,
      },
      file: {
        format: "audio/wav",
        url: "https://www.carlosbeats.com/rhythmic-fusion.wav",
      },
    },
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/rhythmic-fusion",
      },
      {
        name: "OpenSea",
        url: "https://opensea.io/carlosbeats",
      },
    ],
  },
  {
    name: "Ethereal Symphony",
    description:
      "A mesmerizing orchestral composition that transcends boundaries.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmU8aESnXp7Q7CRQBELH5bTzzP6RUdJpQSZgCXgZus6Ggy",
    external_url:
      "https://gateway.pinata.cloud/ipfs/QmRS6G1vtW4Q37knbSJMqxi4eWYNXEo2xzr4Sn8YbAfKnf",
    attributes: [
      {
        trait_type: "Artist",
        value: "Sophia Harmony",
      },
      {
        trait_type: "Genre",
        value: "Orchestral",
      },
      {
        trait_type: "Duration",
        value: "5:30",
      },
    ],
    properties: {
      royalties: {
        artist: 80,
        platform: 10,
        collaborators: 10,
      },
      file: {
        format: "audio/mp3",
        url: "https://www.sophiaharmony.com/ethereal-symphony.mp3",
      },
    },
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/ethereal-symphony",
      },
      {
        name: "Mintable",
        url: "https://mintable.app/sophiaharmony",
      },
    ],
  },
];

export const truncate = (text: string, count = 35) =>
  text?.length > count ? `${text.substring(0, count)}...` : text;

export const artistsArr = [
  {
    name: "Alice Artistry",
    owner: "0x930F888B18a3Af35f6e7d01eF5072d183403bAf0",
    description:
      "An innovative artist pushing the boundaries of traditional and digital art forms.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmevqC9pXa1K31SR5TgD3iK4iq7a1sLHgdhq6HDKjuYWmY",
    external_url: "https://www.aliceartistry.com",
    attributes: [
      {
        trait_type: "Style",
        value: "Surreal",
      },
      {
        trait_type: "Medium",
        value: "Mixed Media",
      },
      {
        trait_type: "Dimensions",
        value: "1800x1800",
      },
    ],
    properties: {
      creation_date: "2023-05-20T15:30:00Z",
      edition: {
        total: 8,
        current: 3,
      },
      royalties: {
        artist: 75,
        platform: 15,
        community: 10,
      },
    },
    followers: 1200,
    following: 350,
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/alice-artistry-001",
      },
      {
        name: "Rarible",
        url: "https://rarible.com/aliceartistry",
      },
    ],
  },
  {
    name: "David Dreamer",
    owner: "0xCD387d3D0F41dD17Fe0c2f9462fDEC6B54D7819D",
    description:
      "A dream-inspired artist, turning imagination into captivating visual experiences.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmWrxkw5HWZ8FFooWz2vikAcBWXxJncMrmGXDcQ6ecs96s",
    external_url: "https://www.daviddreamer.com",
    attributes: [
      {
        trait_type: "Style",
        value: "Fantasy",
      },
      {
        trait_type: "Medium",
        value: "Digital Painting",
      },
      {
        trait_type: "Dimensions",
        value: "2500x2500",
      },
    ],
    properties: {
      creation_date: "2023-06-10T10:45:00Z",
      edition: {
        total: 15,
        current: 5,
      },
      royalties: {
        artist: 85,
        platform: 10,
        community: 5,
      },
    },
    followers: 2500,
    following: 120,
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/david-dreamer-001",
      },
      {
        name: "SuperRare",
        url: "https://superrare.com/daviddreamer",
      },
    ],
  },
  {
    name: "John Doe",
    owner: "0xB58720FD2732C861718e276F1dA28d398F766c96",
    description:
      "A passionate artist exploring the intersection of technology and creativity.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmdTHfosZu1GA76bdKiF1CkUUpwbrD782L9JixJ47V4B9g",
    external_url: "https://www.johndoeart.com",
    attributes: [
      {
        trait_type: "Style",
        value: "Abstract",
      },
      {
        trait_type: "Medium",
        value: "Digital",
      },
      {
        trait_type: "Dimensions",
        value: "2000x2000",
      },
    ],
    properties: {
      creation_date: "2023-04-15T12:00:00Z",
      edition: {
        total: 10,
        current: 1,
      },
      royalties: {
        artist: 80,
        platform: 10,
        community: 10,
      },
    },
    followers: 1800,
    following: 500,
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/artistic-masterpiece-001",
      },
      {
        name: "OpenSea",
        url: "https://opensea.io/artistic-masterpiece-001",
      },
    ],
  },
];

export const artistsnft = [
  {
    name: "Davido: L1",
    description:
      "An innovative artist pushing the boundaries of traditional and digital art forms.",
    image:
      "https://gateway.pinata.cloud/ipfs/Qme5QCjUVwvEhrThwQjXJHTRkAcyQ9r5KjknAEAEpggLhc",
    external_url: "https://www.aliceartistry.com",
    attributes: [
      {
        level_stage: 1,
      },
      {
        trait_type: "Style",
        value: "Surreal",
      },
      {
        trait_type: "Medium",
        value: "Mixed Media",
      },
      {
        trait_type: "Dimensions",
        value: "1800x1800",
      },
    ],
    properties: {
      creation_date: "2023-05-20T15:30:00Z",
      edition: {
        total: 8,
        current: 3,
      },
      royalties: {
        artist: 75,
        platform: 15,
        community: 10,
      },
    },
    followers: 1200,
    following: 350,
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/alice-artistry-001",
      },
      {
        name: "Rarible",
        url: "https://rarible.com/aliceartistry",
      },
    ],
  },
  {
    name: "Wizkid: L1",
    description:
      "A dream-inspired artist, turning imagination into captivating visual experiences.",
    image:
      "https://gateway.pinata.cloud/ipfs/Qmb2PL2fq5MsvTxPxEXXcf8eNnMc3jdcAL9uStM7DSo8Ne",
    external_url: "https://www.daviddreamer.com",
    attributes: [
      {
        level_stage: 1,
      },
      {
        trait_type: "Style",
        value: "Fantasy",
      },
      {
        trait_type: "Medium",
        value: "Digital Painting",
      },
      {
        trait_type: "Dimensions",
        value: "2500x2500",
      },
    ],
    properties: {
      creation_date: "2023-06-10T10:45:00Z",
      edition: {
        total: 15,
        current: 5,
      },
      royalties: {
        artist: 85,
        platform: 10,
        community: 5,
      },
    },
    followers: 2500,
    following: 120,
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/david-dreamer-001",
      },
      {
        name: "SuperRare",
        url: "https://superrare.com/daviddreamer",
      },
    ],
  },
  {
    name: "Wizkid: L3",
    description:
      "A passionate artist exploring the intersection of technology and creativity.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmRB7qokSuF9PVJVdCT4NERjBMbQA889gn2KsocHbvfpAc",
    external_url: "https://www.johndoeart.com",
    attributes: [
      {
        level_stage: 3,
      },
      {
        trait_type: "Style",
        value: "Abstract",
      },
      {
        trait_type: "Medium",
        value: "Digital",
      },
      {
        trait_type: "Dimensions",
        value: "2000x2000",
      },
    ],
    properties: {
      creation_date: "2023-04-15T12:00:00Z",
      edition: {
        total: 10,
        current: 1,
      },
      royalties: {
        artist: 80,
        platform: 10,
        community: 10,
      },
    },
    followers: 1800,
    following: 500,
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/artistic-masterpiece-001",
      },
      {
        name: "OpenSea",
        url: "https://opensea.io/artistic-masterpiece-001",
      },
    ],
  },
  {
    name: "Asake: L2",
    description:
      "A passionate artist exploring the intersection of technology and creativity.",
    image:
      "https://gateway.pinata.cloud/ipfs/QmcaGQu4tT7Q3JfjdCeqS3y5tNebTafCk1VjygrdaNY8q1",
    external_url: "https://www.johndoeart.com",
    attributes: [
      {
        level_stage: 3,
      },
      {
        trait_type: "Style",
        value: "Abstract",
      },
      {
        trait_type: "Medium",
        value: "Digital",
      },
      {
        trait_type: "Dimensions",
        value: "2000x2000",
      },
    ],
    properties: {
      creation_date: "2023-04-15T12:00:00Z",
      edition: {
        total: 10,
        current: 1,
      },
      royalties: {
        artist: 80,
        platform: 10,
        community: 10,
      },
    },
    followers: 1800,
    following: 500,
    external_links: [
      {
        name: "Auction",
        url: "https://www.auctionplatform.com/artistic-masterpiece-001",
      },
      {
        name: "OpenSea",
        url: "https://opensea.io/artistic-masterpiece-001",
      },
    ],
  },
];

export const city = [
  {
    "city": "Paris",
    "monument": "Eiffel Tower",
    "image": "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
  },
  {
    "city": "New York",
    "monument": "Statue of Liberty",
    "image": "https://images.pexels.com/photos/600622/pexels-photo-600622.jpeg"
  },
  {
    "city": "Rome",
    "monument": "Colosseum",
    "image": "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg"
  },
  {
    "city": "London",
    "monument": "Big Ben",
    "image": "https://images.pexels.com/photos/326807/pexels-photo-326807.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    "city": "Sydney",
    "monument": "Sydney Opera House",
    "image": "https://images.pexels.com/photos/462331/pexels-photo-462331.jpeg"
  },
  {
    "city": "Cairo",
    "monument": "Pyramids of Giza",
    "image": "https://images.pexels.com/photos/3689859/pexels-photo-3689859.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
]
