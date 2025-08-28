import NormalModalLayout from "../modal-layouts/NormalModalLayout";
import EditModalLayout from "../modal-layouts/EditModalLayout";
import EditLocationForm from "@/Forms/locations/edit-location-form";
import AddLocationForm from "@/Forms/locations/add-location-form";
import { MapPinPlus } from "lucide-react";

function AddLocationModal() {
  const stats = [
    {
      title: "Add Location Form",
      action_button: "Add New Location",
      description: "Add New Location details here",
      icon: <MapPinPlus />,
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
        >
          <div className="text-xl mx-1">
            <AddLocationForm />
          </div>
        </NormalModalLayout>
      ))}
    </div>
  );
}

function EditLocationModal({ open, onOpenChange, location, onSuccess }) {
  const stats = [
    {
      title: "Edit Location Form",
      action_button: "Edit Location",
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
            <EditLocationForm
              location={location}
              onSuccess={onSuccess}
              open={open}
            />
          </div>
        </EditModalLayout>
      ))}
    </div>
  );
}

export { EditLocationModal, AddLocationModal };
