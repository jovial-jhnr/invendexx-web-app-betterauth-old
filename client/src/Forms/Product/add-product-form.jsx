import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FileUploader } from "@/components/file-uploader";
import toast from "react-hot-toast";
import useStoreCategory from "@/hooks/storeHooks/use-store-category";
import useStoreLocation from "@/hooks/storeHooks/use-store-location";
import { authClient } from "@/lib/auth-client";

import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multiselect";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import backendUrl from "@/lib/backendUrl";

const addProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  discountPrice: z.number().min(0).optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  description: z.string(),
  sku: z.string(),
  length: z.number().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  productCategory: z.string().optional().nullable(),
  productStatus: z.string().optional().nullable(),
  productSize: z.string().min(1, "Product size is requires"),
  sizeUnit: z.string().min(1, "Unit size is required "),
  packaging: z.string().optional().nullable(),
  locationId: z.string().optional().nullable(),
});

export default function AddProductForm({ className }) {
  // User data from authClient
  const { data: session } = authClient.useSession();
  const { data: categories } = useStoreCategory();
  const { data: locations } = useStoreLocation();

  // Store details from authClient.
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  // The user for registration
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      discountPrice: 0,
    },
  });
  // const files = fil;

  // Example: Create FormData to send to server
  // const formData = new FormData();
  // files.forEach((file, index) => {
  //   formData.append(`file-${index}`, file);
  // });
  // Send to server
  // fetch("/api/upload", { method: "POST", body: formData });

  const onSubmit = async (data) => {
    const {
      name,
      price,
      description,
      shortDescription,
      discountPrice,
      stock,
      sku,
      productCategory,
      length,
      width,
      height,
      sizeUnit,
      productSize,
      productStatus,
      packaging,
      locationId,
    } = data;
    try {
      const response = await backendUrl.post(
        `/stores/store/${storeId}/products/add-product`,
        {
          name,
          price,
          description,
          shortDescription,
          discountPrice,
          stock,
          sku,
          productCategory,
          length,
          width,
          height,
          sizeUnit,
          productSize,
          productStatus,
          packaging,
          locationId,
        }
      );
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <>
      <form
        className={cn("grid gap-6 mx-2", className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-section">
          {/* Product Images*/}
          <div className="field items-center">
            <Label htmlFor="profile" className="text-xl mx-2">
              Profile Picture
            </Label>
            <FileUploader
              maxFiles={5}
              maxSize={1024 * 1024 * 5} // 5MB
              accept={["image/*"]}
              onFilesReady={""}
              className="w-full  items-center "
              // Optional: Enable image cropping
              enableCropping={true}
              cropAspectRatio // Fixed aspect ratio (optional)
              cropMinWidth={100}
              cropMinHeight={56}
            />
          </div>

          <h1 className="m-3 text-lg font-bold text-center">
            Product Information
          </h1>

          {/* Name Fields */}
          <div className="grid  gap-4">
            <div className="field my-2">
              <Label htmlFor="name">Product Name</Label>
              <Input type="text" id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="field my-2">
              <Label htmlFor="shortDescription">
                Short Description (Optional){" "}
              </Label>
              <Textarea id="description" {...register("shortDescription")} />
            </div>

            <div className="field my-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>
          </div>

          <div className="field my-2">
            <Label htmlFor="productCategory" cl>
              Product Category
            </Label>
            <Controller
              control={control}
              name="productCategory" // 👈 plural, array
              defaultValue={[]} // 👈 MUST be array
              render={({ field }) => (
                <MultiSelector
                  values={field?.value?.map((id) => {
                    const cats = categories.find((c) => c.id === id);
                    return { value: cats?.name, label: cats?.name || id };
                  })}
                  onValuesChange={(vals) =>
                    field.onChange(vals?.map((v) => v.value))
                  }
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select locations for products" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {categories?.map((cats) => (
                        <MultiSelectorItem
                          key={cats.id}
                          value={cats.name}
                          label={cats.name}
                        >
                          {cats.name}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              )}
            />
            {errors.productCategory && (
              <p className="text-red-500 text-sm">
                {errors.productCategory.message}
              </p>
            )}
          </div>

          <h1 className="m-3 text-lg font-bold text-center">
            Product Price and Quantity
          </h1>

          {/* Product Price and Quantity */}
          <div className="">
            <div className="field my-2">
              <Label htmlFor="price"> Product Price</Label>
              <Input
                type="number"
                id="price"
                {...register("price", { valueAsNumber: true })}
              />
            </div>
            <div className="field">
              <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
              <Input
                type="number"
                id="discountPrice"
                {...register("discountPrice", { valueAsNumber: true })}
              />
            </div>

            <div className="field my-2">
              <Label htmlFor="stock">Product Stock</Label>
              <Input
                type="number"
                id="stock"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
              )}
            </div>

            <div className="field my-2">
              <Label htmlFor="sku">Product SKU</Label>
              <Input type="text" id="sku" {...register("sku")} />
              {errors.sku && (
                <p className="text-red-500 text-sm">{errors.sku.message}</p>
              )}
            </div>

            <div className="field my-2">
              <Label htmlFor="productStatus">Product Status</Label>
              <Controller
                control={control}
                name="productStatus"
                // rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Product Status">
                        {field.value || "Select Product Status"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Product Status</SelectLabel>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Unpublished">UnPublished</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.productCategory && (
                <p className="text-red-500 text-sm">
                  {errors.productCategory.message}
                </p>
              )}
            </div>
          </div>

          <h1 className="m-3 text-lg font-bold text-center">Product Weight</h1>

          {/* Product Weight */}
          <div>
            <div className="field my-2">
              <Label htmlFor="productSize">Product Size</Label>
              <Input type="text" id="length" {...register("productSize")} />
              {errors.productSize && (
                <p className="text-red-500 text-sm">
                  {errors.productSize.message}
                </p>
              )}
            </div>

            <div className="field my-2">
              <Label htmlFor="sizeUnit">Size Unit</Label>
              <Controller
                control={control}
                name="sizeUnit"
                // rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Size Unit">
                        {field.value || "Unit Size"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unit Size</SelectLabel>
                        <SelectItem value="G">gram</SelectItem>
                        <SelectItem value="KG">kg</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.productSize && (
                <p className="text-red-500 text-sm">
                  {errors.productSize.message}
                </p>
              )}
            </div>
          </div>

          {/* Produt Measurement */}
          <div className="grid grid-cols-3 gap-3 my-3">
            <div className="field my-2">
              <Label htmlFor="length">Length</Label>
              <Input
                type="number"
                id="length"
                {...register("length", { valueAsNumber: true })}
              />
            </div>

            <div className="field my-2">
              <Label htmlFor="width">Width</Label>
              <Input
                type="number"
                id="width"
                {...register("width", { valueAsNumber: true })}
              />
            </div>

            <div className="field my-2">
              <Label htmlFor="height">Height</Label>
              <Input
                type="number"
                id="height"
                {...register("height", { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Packaging  Preferences */}
          <div>
            <div className="field my-2">
              <Label htmlFor="packaging">Packaging</Label>
              <Controller
                control={control}
                name="packaging"
                // rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Size Unit">
                        {field.value || "Packaging"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Packaging</SelectLabel>
                        <SelectItem value="Box">Box</SelectItem>
                        <SelectItem value="Packing Materials">
                          Packing Materials
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.packaging && (
                <p className="text-red-500 text-sm">
                  {errors.packaging.message}
                </p>
              )}
            </div>

            <div className="field my-2">
              <Label htmlFor="productSize">Location</Label>
              <Controller
                control={control}
                name="locationId"
                // rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Location">
                        {field.value || "location"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Country</SelectLabel>
                        {locations?.map((location, idx) => (
                          <SelectItem key={idx} value={location?.id}>
                            {location?.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {/* {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )} */}
            </div>
          </div>

          {/* Submit */}
          <div className="my-4 mx-3">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving Changes......... " : "Save Changes "}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
