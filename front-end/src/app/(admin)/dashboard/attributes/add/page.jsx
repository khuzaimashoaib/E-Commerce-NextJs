import AttributeForm from "@/components/admin/attributes/AttributeForm";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";

export default function AddAttributePage() {
  return (
    <div>
      <AdminPageHeader title="Add Attribute" />
      <AttributeForm />
    </div>
  );
}
