import AddProductForm from "@/app/Forms/Product/add-product-form";
import NormalModalLayout from "../NormalModalLayout";

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
