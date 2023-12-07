import "./App.css";
import React, { useContext } from "react";
import ReactJson from "react-json-view";
import { DataverseContext } from "./context/DataverseContext";

const App = () => {
  const {
    connect,
    createEncryptedPost,
    createPost,
    createdEncryptedFile,
    createdIndexFile,
    collectPost,
    collectedPost,
    getDatatokenInfoByFileId,
    loadPosts,
    monetizePost,
    monetizedPost,
    pkh,
    unlockPost,
    unlockedPost,
    updatePost,
    updatedPost,
    datatokenInfos,
    posts,
  } = useContext(DataverseContext);

  /**
   * @summary import from @dataverse/hooks
   */

  /**
   * @summary custom methods
   */

  return (
    <>
      <button onClick={connect}>connect</button>
      <div className="black-text">{pkh}</div>
      <hr />
      <button onClick={createPost}>createPost</button>
      {createdIndexFile && (
        <div className="json-view">
          <ReactJson src={createdIndexFile} collapsed={true} />
        </div>
      )}
      <button onClick={createEncryptedPost}>createEncryptedPost</button>
      {createdEncryptedFile && (
        <div className="json-view">
          <ReactJson src={createdEncryptedFile} collapsed={true} />
        </div>
      )}
      <button onClick={loadPosts}>loadPosts</button>
      {posts && (
        <div className="json-view">
          <ReactJson src={posts} collapsed={true} />
        </div>
      )}
      <button onClick={updatePost}>updatePost</button>
      {updatedPost && (
        <div className="json-view">
          <ReactJson src={updatedPost} collapsed={true} />
        </div>
      )}
      <button onClick={monetizePost}>monetizePost</button>
      {monetizedPost && (
        <div className="json-view">
          <ReactJson src={monetizedPost} collapsed={true} />
        </div>
      )}
      <button onClick={getDatatokenInfoByFileId}>datatokenInfo</button>
      {datatokenInfos && (
        <div className="json-view">
          <ReactJson src={datatokenInfos} collapsed={true} />
        </div>
      )}
      <br />
      <div className="red">
        You need to switch another account to collect the post and unlock the
        post.
      </div>
      <button onClick={collectPost}>collectPost</button>
      {collectedPost && (
        <div className="json-view">
          <ReactJson src={collectedPost} collapsed={true} />
        </div>
      )}
      <button onClick={unlockPost}>unlockPost</button>
      {unlockedPost && (
        <div className="json-view">
          <ReactJson src={unlockedPost} collapsed={true} />
        </div>
      )}
      <br />
    </>
  );
};

export default App;
