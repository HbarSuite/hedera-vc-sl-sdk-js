const { PrivateKey, Client, FileId } = require("@hashgraph/sdk");
const { HfsVcSl } = require("../dist");
const { OPERATOR_ID, OPERATOR_KEY, VC_STATUS_LIST_OWNER_PRIVATE_KEY, VC_STATUS_LIST_FILE_ID } = require("./.env.json");

async function main() {
    /**
     * Client setup
     */
    const client = Client.forTestnet();
    client.setOperator(OPERATOR_ID, OPERATOR_KEY);

    const hfsVc = new HfsVcSl(
        PrivateKey.fromString(OPERATOR_KEY), // this is to sign transaction
        client,
        PrivateKey.fromString(VC_STATUS_LIST_OWNER_PRIVATE_KEY)
    );

    const revocationListFileId = FileId.fromString(VC_STATUS_LIST_FILE_ID);

    await hfsVc.revokeByIndex(revocationListFileId, 0);

    console.log("REVOKED");
}

main();
