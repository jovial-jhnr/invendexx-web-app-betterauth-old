import StoreSettingsFormV2 from "@/Forms/Store Settings/store-settings-formV2";
import NormalModalLayout from "../modal-layouts/NormalModalLayout";
import StoreSettingsFormV1 from "@/Forms/Store Settings/store-settings-form-V1";

export default function StoreSettingsModal() {
  const stats = [
    {
      title: "Store Settings",
      action_button: "Store Information",
      description:
        "Store settings are used to manage your store information and preferences. .You can update your store name, address, and others.",
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
            <StoreSettingsFormV1 />
          </div>
        </NormalModalLayout>
      ))}
    </div>
  );
}
