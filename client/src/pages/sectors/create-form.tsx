"use client"

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type SectorFormProps = {
  onSubmit: (data: { name: string; slug: string }) => void;
  isLoading?: boolean;
  initialValues?: { name?: string; slug?: string };
  onClose: () => void;
};

export default function SectorCreateForm({
  onSubmit,
  isLoading = false,
  initialValues = {},
  onClose,
}: SectorFormProps) {
  const [name, setName] = React.useState(initialValues.name || "");
  const [slug, setSlug] = React.useState(initialValues.slug || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, slug });
  }

  return (
   <Dialog open onOpenChange={onClose}>
    <DialogContent className="pt-6" >
        <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="sector-name">Title</Label>
        <Input
          id="sector-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter sector title"
          required
        />
      </div>
      <div>
        <Label htmlFor="sector-slug">Slug</Label>
        <Input
          id="sector-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter sector slug"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
    </DialogContent>
   </Dialog>
  );
}
