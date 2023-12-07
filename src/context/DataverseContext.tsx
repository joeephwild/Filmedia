import {
  useApp,
  // useCollectFile,
  useCreateIndexFile,
  useUpdateIndexFile,
  useLoadDatatokens,
  useFeedsByAddress,
  useMonetizeFile,
  useStore,
  useUnlockFile,
  useCollectFile,
  FileResult,
} from "@dataverse/hooks";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { ModelParser, Output } from "@dataverse/model-parser";
import {
  ChainId,
  Currency,
  DatatokenType,
  MirrorFile,
  WALLET,
} from "@dataverse/dataverse-connector";
import { FileContent } from "@dataverse/dataverse-connector/dist/esm/types/fs";
import app from "../../output/app.json";

const postVersion = "0.0.1";
const modelParser = new ModelParser(app as Output);
const datatokenType = DatatokenType.Profileless;

type IdataverseContext = {
  connect: () => Promise<void>;
  createPost: () => Promise<void>;
  collectFile: any;
  createEncryptedPost: () => Promise<void>;
  createIndexFile: (args: {
    modelId: string;
    fileName?: string | undefined;
    fileContent: FileContent;
  }) => Promise<{
    pkh: string;
    appId: string;
    modelId: string;
    fileContent: {
      file: Omit<MirrorFile, "fileKey" | "external" | "content">;
      content: FileContent;
    };
  }>;
  createEncryptedFile: (args: {
    modelId: string;
    fileName?: string | undefined;
    fileContent: FileContent;
  }) => Promise<{
    pkh: string;
    appId: string;
    modelId: string;
    fileContent: {
      file: Omit<MirrorFile, "fileKey" | "external" | "content">;
      content: FileContent;
    };
  }>;
  createdEncryptedFile:
    | {
        pkh: string;
        appId: string;
        modelId: string;
        fileContent: {
          file: Omit<MirrorFile, "fileKey" | "external" | "content">;
          content: FileContent;
        };
      }
    | undefined;
  createdIndexFile:
    | {
        pkh: string;
        appId: string;
        modelId: string;
        fileContent: {
          file: Omit<MirrorFile, "fileKey" | "external" | "content">;
          content: FileContent;
        };
      }
    | undefined;
  updatedPost:
    | {
        fileContent: {
          file: Omit<MirrorFile, "fileKey" | "external" | "content">;
          content: FileContent;
        };
      }
    | undefined;
  monetizedPost:
    | {
        fileContent: {
          file: Omit<MirrorFile, "fileKey" | "external" | "content">;
          content: string | FileContent;
        };
      }
    | undefined;
  collectedPost: any;
  unlockedPost:
    | {
        fileContent: {
          file: Omit<MirrorFile, "fileKey" | "external" | "content">;
          content: string | FileContent;
        };
      }
    | undefined;
  getDatatokenInfoByFileId: () => Promise<void>;
  collectPost: () => Promise<void>;
  unlockPost: () => Promise<void>;
  loadPosts: () => Promise<void>;
  updatePost: () => Promise<void>;
  monetizePost: () => Promise<void>;
  pkh: string | undefined;
  datatokenInfos:
    | Partial<{
        address: string;
        collect_info: {
          collect_nft_address: string;
          sold_list: {
            owner: string;
            token_id: string;
          }[];
          price: {
            amount: string;
            currency: string;
            currency_addr: string;
          };
          sold_num: string;
          total: string;
        };
        content_uri: string;
        owner: string;
        source: string;
      }>[]
    | undefined;
  posts: {
    [modelId: string]: {
      [fileId: string]: MirrorFile &
        Partial<FileResult> & {
          datatokenInfos:
            | Partial<{
                address: string;
                collect_info: {
                  collect_nft_address: string;
                  sold_list: {
                    owner: string;
                    token_id: string;
                  }[];
                  price: {
                    amount: string;
                    currency: string;
                    currency_addr: string;
                  };
                  sold_num: string;
                  total: string;
                };
                content_uri: string;
                owner: string;
                source: string;
              }>[]
            | undefined;
        };
    };
  };
};

export const DataverseContext = createContext<IdataverseContext>({
  connect: () => Promise.resolve(),
  getDatatokenInfoByFileId: () => Promise.resolve(),
  collectPost: () => Promise.resolve(),
  monetizePost: () => Promise.resolve(),
  datatokenInfos: undefined,
  collectedPost: undefined,
  collectFile: undefined,
  unlockedPost: undefined,
  createIndexFile: (args: {
    modelId: string;
    fileName?: string | undefined;
    fileContent: FileContent;
  }) => {
    // Your implementation here
    return new Promise((resolve, reject) => {
      // Your implementation here
    });
  },
  createEncryptedFile: (args: {
    modelId: string;
    fileName?: string | undefined;
    fileContent: FileContent;
  }) => {
    // Your implementation here
    return new Promise((resolve, reject) => {
      // Your implementation here
    });
  },
  loadPosts: () => Promise.resolve(),
  createdEncryptedFile: undefined,
  createdIndexFile: undefined,
  createEncryptedPost: () => Promise.resolve(),
  createPost: () => Promise.resolve(),
  updatedPost: undefined,
  monetizedPost: undefined,
  unlockPost: () => Promise.resolve(),
  updatePost: () => Promise.resolve(),
  pkh: undefined,
  posts: {},
});

export const DataverseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentFileId, setCurrentFileId] = useState<string>();
  const postModel = modelParser.getModelByName("post");
  const { pkh, filesMap: posts } = useStore();

  const { createdIndexFile, createIndexFile } = useCreateIndexFile({
    onSuccess: (result) => {
      console.log("[createFile]create file success:", result);
      setCurrentFileId(result.fileContent.file.fileId);
    },
  });

  const {
    createdIndexFile: createdEncryptedFile,
    createIndexFile: createEncryptedFile,
  } = useCreateIndexFile({
    onSuccess: (result) => {
      console.log(
        "[createEncryptedFile]create encrypted file success:",
        result
      );
      setCurrentFileId(result.fileContent.file.fileId);
    },
  });

  const { connectApp } = useApp({
    appId: modelParser.appId,
    autoConnect: true,
    onSuccess: (result) => {
      console.log("[connect]connect app success, result:", result);
    },
  });

  const connect = useCallback(async () => {
    connectApp({
      wallet: WALLET.METAMASK,
    });
  }, [connectApp]);

  const createPost = useCallback(async () => {
    if (!postModel) {
      console.error("postModel undefined");
      return;
    }

    createIndexFile({
      modelId: postModel.streams[postModel.streams.length - 1].modelId,
      fileName: "create file test",
      fileContent: {
        modelVersion: postVersion,
        text: "hello",
        images: [
          "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        ],
        videos: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }, [postModel, createIndexFile]);

  const createEncryptedPost = useCallback(async () => {
    if (!postModel) {
      console.error("postModel undefined");
      return;
    }

    createEncryptedFile({
      modelId: postModel.streams[postModel.streams.length - 1].modelId,
      fileName: "create file test",
      fileContent: {
        modelVersion: postVersion,
        text: "hello",
        images: [
          "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        ],
        videos: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        encrypted: {
          text: true,
          images: true,
          videos: false,
        },
      },
    });
  }, [postModel, createEncryptedFile]);

  const { loadFeedsByAddress } = useFeedsByAddress({
    model: postModel,
    onError: (error) => {
      console.error("[loadPosts]load files failed,", error);
    },
    onSuccess: (result) => {
      console.log("[loadPosts]load files success, result:", result);
    },
  });

  const { updatedFileContent: updatedPost, updateIndexFile } =
    useUpdateIndexFile({
      onSuccess: (result) => {
        console.log("[updateFile]update file success, result:", result);
      },
    });

  const { monetizedFileContent: monetizedPost, monetizeFile } = useMonetizeFile(
    {
      onSuccess: (result) => {
        console.log("[monetize]monetize file success, result:", result);
      },
    }
  );

  const { datatokenInfos, loadDatatokens } = useLoadDatatokens({
    onSuccess: (result) => {
      console.log("[datatokenInfo]get datatoken info success, result:", result);
    },
  });

  const { collectedFileContent: collectedPost, collectFile } = useCollectFile({
    onSuccess: (result) => {
      console.log("[collectFile]collect file success, result:", result);
    },
  });

  const { unlockedFileContent: unlockedPost, unlockFile } = useUnlockFile({
    onSuccess: (result) => {
      console.log("[unlockPost]unlock file success, result:", result);
    },
  });

  const loadPosts = useCallback(async () => {
    if (!postModel) {
      console.error("postModel undefined");
      return;
    }
    if (!pkh) {
      console.error("pkh undefined");
      return;
    }

    await loadFeedsByAddress(pkh);
  }, [postModel, pkh, loadFeedsByAddress]);

  const updatePost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    updateIndexFile({
      fileId: currentFileId,
      fileName: "update file test",
      fileContent: {
        text: "update my post -- " + new Date().toISOString(),
        images: [
          "https://bafkreidhjbco3nh4uc7wwt5c7auirotd76ch6hlzpps7bwdvgckflp7zmi.ipfs.w3s.link",
        ],
      },
      encrypted: {
        text: true,
        images: true,
        videos: false,
      },
    });
  }, [currentFileId, updateIndexFile]);

  const monetizePost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }

    monetizeFile({
      fileId: currentFileId,
      datatokenVars: {
        type: datatokenType,
        collectModule: "LimitedFeeCollectModule",
        chainId: ChainId.Mumbai,
        currency: Currency.WMATIC,
        amount: 0.0001,
        collectLimit: 1000,
      },
      unlockingTimeStamp: String(Date.now() / 1000 + 5 * 60),
    });
  }, [currentFileId, monetizeFile]);

  const getDatatokenInfoByFileId = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    loadDatatokens([currentFileId]);
  }, [loadDatatokens, currentFileId]);

  const collectPost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    collectFile({ fileId: currentFileId });
  }, [collectFile]);

  const unlockPost = useCallback(async () => {
    if (!currentFileId) {
      console.error("currentFileId undefined");
      return;
    }
    unlockFile(currentFileId);
  }, [unlockFile]);

  const value = {
    connect,
    createIndexFile,
    createEncryptedFile,
    createdEncryptedFile,
    createdIndexFile,
    createPost,
    createEncryptedPost,
    updatedPost,
    monetizedPost,
    datatokenInfos,
    loadDatatokens,
    collectFile,
    collectedPost,
    unlockedPost,
    unlockFile,
    getDatatokenInfoByFileId,
    collectPost,
    unlockPost,
    loadPosts,
    updatePost,
    monetizePost,
    posts,
    pkh,
  };
  return (
    <DataverseContext.Provider value={value}>
      {children}
    </DataverseContext.Provider>
  );
};
