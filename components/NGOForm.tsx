"use client";

import { z } from "zod";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createNGO } from "@/lib/actions";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "@/lib/validation";
import { useActionState, useState } from "react";

const NGOForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        description,
        bio: formData.get("bio") as string,
        link: formData.get("link") as string,
        title: formData.get("title") as string,
        category: formData.get("category") as string,
      };

      await formSchema.parseAsync(formValues);

      const result = await createNGO(prevState, formData, description);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your NGO has been setup successfully!",
        });

        router.push(`/ngo/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your form inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation Failed", status: "Error" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occured!",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occured!",
        status: "Error",
      };
    }
  };
  const [start, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="ngo-form shadow-md">
      {/* title  */}
      <div>
        <label htmlFor="title" className="ngo-form_label">
          Title
        </label>
        <Input
          required
          id="title"
          name="title"
          placeholder="NGO Title"
          className="ngo-form_input"
        />

        {errors.title && <p className="ngo-form_error">{errors.title}</p>}
      </div>

      {/* bio  */}
      <div>
        <label htmlFor="bio" className="ngo-form_label">
          Tag Line / Bio / Motto
        </label>
        <Textarea
          required
          id="bio"
          name="bio"
          placeholder="NGO Tag Line "
          className="ngo-form_textarea"
        />

        {errors.bio && <p className="ngo-form_error">{errors.bio}</p>}
      </div>

      {/* category */}
      <div>
        <label htmlFor="category" className="ngo-form_label">
          Category
        </label>
        <Input
          required
          id="category"
          name="category"
          placeholder="NGO Category (Disability activism, Labour rights, Corporate and financial lobbying, Religious activism etc)"
          className="ngo-form_input"
        />

        {errors.category && <p className="ngo-form_error">{errors.category}</p>}
      </div>

      {/* image  */}
      <div>
        <label htmlFor="Link" className="ngo-form_label">
          Image URL
        </label>
        <Input
          required
          id="link"
          name="link"
          placeholder="NGO Image URL"
          className="ngo-form_input"
        />

        {errors.link && <p className="ngo-form_error">{errors.link}</p>}
      </div>

      {/* description  */}
      <div data-color-mode="light">
        <label htmlFor="Description" className="ngo-form_label">
          NGO Description
        </label>

        <MDEditor
          id="desc"
          height={300}
          preview="edit"
          value={description}
          onChange={(value) => setDescription(value as string)}
          style={{
            overflow: "hidden",
            borderRadius: 10,
            marginTop: 10,
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          textareaProps={{
            placeholder:
              "Describe your NGO details, mission, vision and activities",
          }}
        />

        {errors.description && (
          <p className="ngo-form_error">{errors.description}</p>
        )}
      </div>

      <Button type="submit" className="ngo-form_btn" disabled={isPending}>
        {isPending ? "Submitting your NGO. Please Wait..." : "Submit your NGO"}
        <Send className="size-10 ml-2" />
      </Button>
    </form>
  );
};

export default NGOForm;
