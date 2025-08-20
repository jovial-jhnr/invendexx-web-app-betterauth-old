import NormalModalLayout from "../NormalModalLayout";
import EditModalLayout from "../EditModalLayout";
import EditLocationForm from "@/app/Forms/Locations/edit-location-form";
import AddLocationForm from "@/app/Forms/Locations/add-location-form";

function AddLocationModal() {
  const stats = [
    {
      title: "Add Location Form",
      action_button: "Add Location",
      description: "Add location details here",
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

  return (
    <div className="">
      {stats.map((stat, index) => (
        <EditModalLayout
          key={index}
          title={stat.title}
          description={stat.description}
          // action_button={stat.action_button}
          open={open}
          onOpenChange={onOpenChange}
        >
          <div className="text-xl mx-2">
            <EditLocationForm location={location} onSuccess={onSuccess} />
          </div>
        </EditModalLayout>
      ))}
    </div>
  );
}

export { EditLocationModal, AddLocationModal };
