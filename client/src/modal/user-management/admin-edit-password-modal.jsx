import EditModalLayout from "../modal-layouts/EditModalLayout";
import AdminEditPasswordForm from "@/Forms/user-management/admin-edit-password-form";

export default function AdminEditPasswordModal({
  open,
  onOpenChange,
  user,
  onSuccess,
}) {
  const stats = [
    {
      title: "Set Users Password Form",
      action_button: "Change Password ",
      description: "Set users password here emergency only!!",
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
            <AdminEditPasswordForm
              user={user}
              onSuccess={onSuccess}
              open={open}
            />
          </div>
        </EditModalLayout>
      ))}
    </div>
  );
}
