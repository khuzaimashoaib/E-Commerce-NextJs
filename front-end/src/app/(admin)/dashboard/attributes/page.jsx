import AttributesClient from "@/components/admin/attributes/AttributesClient";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";

export default function AttributesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Attributes"
        actionText="Add Attribute"
        actionHref="/dashboard/attributes/add"
        className="mb-3"
      />
      <AttributesClient />
    </div>
  );
}
