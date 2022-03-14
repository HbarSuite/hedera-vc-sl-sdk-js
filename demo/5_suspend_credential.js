const { PrivateKey, Client, FileId } = require("@hashgraph/sdk");
const { HcsRl } = require("../dist");
const {
    OPERATOR_ID,
    OPERATOR_KEY,
    REVOCATION_LIST_OWNER_PRIVATE_KEY,
    REVOCATION_LIST_FILE_ID,
} = require("./.env.json");

async function main() {
    /**
     * Client setup
     */
    const client = Client.forTestnet();
    client.setOperator(OPERATOR_ID, OPERATOR_KEY);

    const hcsVc = new HcsRl(
        PrivateKey.fromString(OPERATOR_KEY), // this is to sign transaction
        client,
        PrivateKey.fromString(REVOCATION_LIST_OWNER_PRIVATE_KEY)
    );

    const revocationListFileId = FileId.fromString(REVOCATION_LIST_FILE_ID);

    const updatedList = await hcsVc.suspendByIndex(revocationListFileId, 0);

    console.log("==== list ====");
    console.log(updatedList);
}

main();
