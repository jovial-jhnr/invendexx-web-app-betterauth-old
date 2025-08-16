import NormalModalLayout from "../NormalModalLayout";
import UserProfileForm from "../../Forms/UserProfile/user-profile-form";

export default function UserProfileModal() {
  const stats = [
    {
      title: "User Profile Form",
      action_button: "User Profile Form",
      description:
        " Make changes to your profile here. Click save when you're done.",
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
        >
          <div className="text-xl mx-1">
            <UserProfileForm />
          </div>
        </NormalModalLayout>
      ))}
    </div>
  );
}
