import EditModalLayout from "../../modal-layouts/EditModalLayout";
import NormalModalLayout from "../../modal-layouts/NormalModalLayout";
import StoreAddRoleForm from "@/Forms/roles-setup/store-roles/store-add-role-form";
import { UserCheck } from "lucide-react";

export default function StoreAddRoleModal() {
  const stats = [
    {
      title: "Add Role Form",
      action_button: "Add New Role",
      description: "Add new roles here",
      icon: <UserCheck />,
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
          icon={stat.icon}
          className="text-green-500 bg-blue-600"
        >
          <div className="text-xl mx-1">
            <StoreAddRoleForm />
          </div>
        </NormalModalLayout>
      ))}
    </div>
  );
}

function StoreEditRoleModal({ open, onOpenChange, product, onSuccess }) {
  const stats = [
    {
      title: "Edit Role Form",
      // action_button: "Edit Location",
      description: "Edit role details here",
    },
  ];

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

export { StoreAddRoleModal, StoreEditRoleModal };
