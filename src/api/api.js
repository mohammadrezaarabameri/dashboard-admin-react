const HOST = "http://116.203.61.236:4000";

export const apiRoutes = {
  registeration: {
    register: `${HOST}/users`,
    userRole: `${HOST}/organizations/roles`,
    token: `${HOST}/channels/mychannel/chaincodes/chaincode/token`,
  },
  asset: {
    getAssetByOwner: `${HOST}/channels/mychannel/chaincodes/chaincode/assets/owner`,
    setAssetPrice: `${HOST}/channels/mychannel/chaincodes/chaincode/asset/price`,
    setAssetToSale: `${HOST}/channels/mychannel/chaincodes/chaincode/collection/Market/asset/public`
  },
  status: {
    changeStatus: `${HOST}/channels/mychannel/chaincodes/chaincode/asset/status/change`,
  },
  history: {
    getAssetHistory: `${HOST}/channels/mychannel/chaincodes/chaincode/asset/history`,
  },
  generate: {
    addBatchFull: `${HOST}/channels/mychannel/chaincodes/chaincode/batch/create/asset/bulk`,
    addBulk: `${HOST}/channels/mychannel/chaincodes/chaincode/asset/create/bulk`,
    addBatchEmpty: `${HOST}/channels/mychannel/chaincodes/chaincode/batch/create`
  },
  shop:{
    getAssetsInMarket: `${HOST}/collection/Market/objects`
  },
  changeOwner: {
    ownerShip: `${HOST}/channels/mychannel/chaincodes/chaincode/asset/owner/change`
  },
};
