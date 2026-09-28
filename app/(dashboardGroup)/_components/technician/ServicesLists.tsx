"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";
import { Heading } from "./Heading";
import { ApiResponse } from "@/types/api";
import { Category } from "@/types/category";
import { CreateServiceRequest, Service } from "@/types/services";
import {
  createService,
  deleteService,
  updateService,
} from "../../_actions/technicianActions";
import { toast } from "sonner";
import { EmptyServices } from "./EmptyServices";

export default function TechnicianServiceLists({
  services,
  categories,
}: {
  services: Service[];
  categories: ApiResponse<Category[]> | undefined;
}) {
  const [items, setItems] = useState(services);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const durationValue = [
    { value: "1", label: "1 Hour" },
    { value: "2", label: "2 Hours" },
    { value: "3", label: "3 Hours" },
    { value: "4", label: "4 Hours" },
    { value: "8", label: "8 hours" },
    { value: "24", label: "1 Days" },
  ];
  const formReset: CreateServiceRequest = {
    name: "",
    category: categories?.data[0].name,
    description: "",
    price: 0,
    duration: Number(durationValue[0].value),
    thumbnail: "",
  };
  const [form, setForm] = useState(formReset);

  function createServiceAction() {
    setForm(formReset);
    setEditing(null);
    setOpen(true);
  }

  const [state, action, pending] = useActionState(
    async (prevState: ApiResponse<Service>, formData: FormData) => {
      const id = formData.get("id") as string | null;

      // UPDATE
      if (id) {
        const result = await updateService(prevState, formData);

        if (result.success && result.data) {
          setItems((prev) =>
            prev.map((item) =>
              item.id === result.data.id ? result.data : item,
            ),
          );
          setOpen(false);
          toast.success("Service Updated Successfully");
        }

        return result;
      }

      const result = await createService(prevState, formData);

      if (result.success && result.data) {
        setItems((prev) => [...prev, result.data]);
        setOpen(false);
        toast.success("Service Created Successfully");
      }

      return result;
    },
    false,
  );

  return (
    <>
      <Heading
        title="Services"
        description="Manage the services customers can book from your profile."
        action={
          <Button
            onClick={createServiceAction}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 size-4" />
            Add service
          </Button>
        }
      />
      {items && items.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Your services</CardTitle>
            <CardDescription>{items.length} services listed</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    {[
                      "Service",
                      "Category",
                      "Description",
                      "Price",
                      "Duration",
                      // "Status",
                      "Actions",
                    ].map((h) => (
                      <th key={h} className="px-5 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="px-5 py-4 font-semibold">{item.name}</td>
                      <td className="px-5 py-4">{item.category?.name}</td>
                      <td className="max-w-xs px-5 py-4 text-slate-500">
                        <p className="line-clamp-2">{item.description}</p>
                      </td>
                      <td className="px-5 py-4 font-semibold">{item.price}</td>
                      <td className="px-5 py-4">
                        {
                          durationValue.find(
                            (d) => Number(d.value) === item.duration,
                          )?.label
                        }
                      </td>
                      {/* <td className="px-5 py-4">
                        <Badge
                          className={
                            item.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td> */}
                      <td className="px-5 py-4">
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Edit service"
                            onClick={() => {
                              setEditing(item.id);
                              setForm({
                                category: item.category?.name,
                                name: item.name,
                                thumbnail: item.thumbnail ? item.thumbnail : "",
                                description: item.description
                                  ? item.description
                                  : "",
                                price: item.price,
                                duration: item.duration
                                  ? Number(item.duration)
                                  : Number(durationValue[0].value),
                              });
                              setOpen(true);
                            }}
                          >
                            <Edit3 className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Delete service"
                            onClick={async () => {
                              const result = await deleteService(item.id);
                              if (result.success) {
                                setItems(
                                  items.filter((_, index) => index !== i),
                                );
                                toast.success(result.message);
                              }
                            }}
                          >
                            <Trash2 className="size-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <EmptyServices onAction={createServiceAction}/>
        </Card>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form action={action}>
            <DialogHeader>
              <DialogTitle>
                {editing === null ? "Add service" : "Edit service"}
              </DialogTitle>
              <DialogDescription>
                Describe the service customers can book.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 my-6">
              {editing && <input type="hidden" name="id" value={editing} />}
              <div>
                <Label>Category</Label>
                <Select
                  name="category"
                  value={form.category}
                  disabled={editing !== null}
                  onValueChange={(category) => setForm({ ...form, category })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.data.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="service-name">Name</Label>
                <Input
                  name="name"
                  id="service-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="service-thumbnail">Thumbnail</Label>
                <Input
                  name="thumbnail"
                  id="service-thumbnail"
                  value={form.thumbnail}
                  onChange={(e) =>
                    setForm({ ...form, thumbnail: e.target.value })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  name="description"
                  id="service-description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="mt-2"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Price</Label>
                  <Input
                    name="price"
                    defaultValue={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                    type="number"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Select
                    name="duration"
                    value={String(form.duration)}
                    onValueChange={(duration) =>
                      setForm({ ...form, duration: Number(duration) })
                    }
                  >
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {durationValue.map((d) => (
                        <SelectItem
                          defaultValue={d.value}
                          key={d.value}
                          value={d.value}
                        >
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                // onClick={save}
                disabled={!form.name || !form.price || pending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editing ? "Update Service" : "Create Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
