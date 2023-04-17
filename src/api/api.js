const HOST = "http://116.203.61.236:4000";

export const apiRoutes = {
  registeration: {
    register: `${HOST}/users`,
    userRole: `${HOST}/organizations/roles`,
    token: `${HOST}/channels/mychannel/chaincodes/chaincode/token`,
  },
  asset: {
    getAssetByOwner: `${HOST}/channels/mychannel/chaincodes/chaincode/assets/owner`,
  },
  status: {
    changeStatus: `${HOST}/channels/mychannel/chaincodes/chaincode/asset/status/change`,
  },
};
