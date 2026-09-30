"use client";

import { useEffect, useState } from "react";

import { Eye, Plus } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { Category } from "@/types/category";
import {
  createAdminCategory,
  getAdminCategories,
} from "../../_actions/adminActions";

export default function AdminCategoryLists() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [creating, setCreating] = useState(false);

  const [selected, setSelected] = useState<Category | null>(null);

  async function loadCategories() {
    try {
      setLoading(true);

      const response = await getAdminCategories();

      setCategories(response.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load categories.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleCreate() {
    if (!name.trim()) {
      setError("Category name is required.");

      return;
    }

    try {
      setCreating(true);
      setError(null);

      await createAdminCategory({
        name: name.trim(),
        description: description.trim(),
      });

      setName("");
      setDescription("");
      setOpen(false);

      await loadCategories();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create category.",
      );
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">Loading categories...</CardContent>
      </Card>
    );
  }

  return (
    <>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Service categories</CardTitle>

          <CardDescription>{categories.length} categories</CardDescription>
          <CardAction>
            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 size-4" />
              Add category
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Category</th>

                  <th className="px-5 py-3">Description</th>

                  <th className="px-5 py-3">Services</th>

                  <th className="px-5 py-3">Status</th>

                  <th className="px-5 py-3">Created</th>

                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="px-5 py-4 font-semibold">{category.name}</td>

                    <td className="px-5 py-4 text-slate-500">
                      {category.description || "No description"}
                    </td>

                    <td className="px-5 py-4">
                      {category._count?.services ??
                        category.services?.length ??
                        0}
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant={category.isActive ? "default" : "secondary"}
                      >
                        {category.isActive ? "ACTIVE" : "INACTIVE"}
                      </Badge>
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelected(category)}
                      >
                        <Eye className="mr-1.5 size-3.5" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {categories.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              No categories found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>

            <DialogDescription>
              Create a new service category.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="category-name">Name</Label>

              <Input
                id="category-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2"
                placeholder="e.g. HVAC"
              />
            </div>

            <div>
              <Label htmlFor="category-description">Description</Label>

              <Textarea
                id="category-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-2"
                placeholder="What services belong here?"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button disabled={creating} onClick={handleCreate}>
              {creating ? "Creating..." : "Create category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>

            <DialogDescription>
              Category and service information.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-5">
              <div className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                <Info label="Description" value={selected.description} />

                <Info
                  label="Status"
                  value={selected.isActive ? "ACTIVE" : "INACTIVE"}
                />

                <Info
                  label="Services"
                  value={
                    selected.services?.length ?? selected._count?.services ?? 0
                  }
                />

                <Info
                  label="Created"
                  value={new Date(selected.createdAt).toLocaleString()}
                />
              </div>

              <div>
                <h3 className="font-semibold">Services</h3>

                <div className="mt-3 space-y-2">
                  {selected.services?.length ? (
                    selected.services.map((service) => (
                      <div key={service.id} className="rounded-lg border p-3">
                        <p className="font-medium">{service.name}</p>

                        <p className="text-sm text-slate-500">
                          ${service.price}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No services available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  function Info({ label, value }: { label: string; value: unknown }) {
    return (
      <div>
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-1 font-medium">
          {value == null || value === "" ? "Not provided" : String(value)}
        </p>
      </div>
    );
  }
}
