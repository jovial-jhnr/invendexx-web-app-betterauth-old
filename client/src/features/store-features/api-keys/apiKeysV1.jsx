import ApiKeysTable from "@/components/tables/store-tables/api-keys-table/apikeys-table";

function ApiKeysV1() {
  return (
    <>
      <div>
        <div>
          <h1 className="m-3 text-xl font-semibold">Api Keys</h1>
        </div>
        <div>
          <ApiKeysTable />
        </div>
      </div>
    </>
  );
}

export default ApiKeysV1;
