import AttributeForm from "@/components/admin/attributes/AttributeForm";

export default async function EditAttributePage({ params }) {
  const { id } = await params;
  return (
    <div>
      <AttributeForm attributeId={id} />
    </div>
  );
}
