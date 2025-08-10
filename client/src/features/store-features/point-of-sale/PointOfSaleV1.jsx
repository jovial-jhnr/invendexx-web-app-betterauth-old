import { SearchCheck } from "lucide-react";

export default function PointOfSaleV1() {
  return (
    <>
      <div>
        <div className=" m-3 ">
          <h1 className="font-bold text-xl ">Point Of Sale</h1>
          <p className="font-semibold ">Manage point of sales</p>
        </div>

        <div className="">
          <div className="relative w-[250px] pt-3">
            <SearchCheck className="absolute right-1 top-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search products by name and SKU...."
              className="border border-blue-400 p-2  rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
