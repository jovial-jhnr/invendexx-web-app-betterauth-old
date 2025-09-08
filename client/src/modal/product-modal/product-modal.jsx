import AddProductForm from "@/Forms/product/add-product-form";
import EditModalLayout from "../modal-layouts/EditModalLayout";
import NormalModalLayout from "../modal-layouts/NormalModalLayout";
import EditProductForm from "@/Forms/product/edit-product-form";

export default function AddProductModal() {
  const stats = [
    {
      title: "Add Product Form",
      action_button: "Add Product",
      description: "Add new products here",
    },
  ];

  return (
    <div className="">
      {stats.map((stat, index) => (
        <NormalModalLayout
          key={index}
          title={stat.title}
          description={stat.description}
          action_button={stat.action_button}
          className="text-green-500 bg-blue-600"
        >
          <div className="text-xl mx-1">
            <AddProductForm />
          </div>
        </NormalModalLayout>
      ))}
    </div>
  );
}

function EditProductModal({ open, onOpenChange, product, onSuccess }) {
  const stats = [
    {
      title: "Edit Location Form",
      // action_button: "Edit Location",
      description: "Edit location details here",
    },
  ];

  // console.log({ open, location });
  return (
    <div className="">
      {stats.map((stat, index) => (
        <EditModalLayout
          key={index}
          title={stat.title}
          description={stat.description}
          action_button={stat.action_button} // This is not needed.
          open={open}
          onOpenChange={onOpenChange}
        >
          <div className="text-xl mx-2">
            <EditProductForm
              product={product}
              onSuccess={onSuccess}
              open={open}
            />
          </div>
        </EditModalLayout>
      ))}
    </div>
  );
}

export { AddProductModal, EditProductModal };
