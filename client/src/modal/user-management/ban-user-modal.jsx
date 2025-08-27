import BanUserForm from "@/Forms/user-management/ban-user-form";
import EditModalLayout from "../modal-layouts/EditModalLayout";

export default function BanUserModal({ open, onOpenChange, user, onSuccess }) {
  const stats = [
    {
      title: "Set Users Role Form",
      action_button: "Change Role",
      description: "Set users role here",
      open,
      onOpenChange,
    },
  ];

  return (
    <div className="">
      {stats.map((stat, index) => (
        <EditModalLayout
          key={index}
          title={stat.title}
          description={stat.description}
          //   action_button={stat.action_button}
          open={open}
          onOpenChange={onOpenChange}
          className="text-green-500 bg-blue-600"
        >
          <div className="text-xl mx-1">
            <BanUserForm user={user} onSuccess={onSuccess} open={open} />
          </div>
        </EditModalLayout>
      ))}
    </div>
  );
}
