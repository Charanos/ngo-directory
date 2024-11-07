import { auth } from "@/auth";
import NGOForm from "@/components/NGOForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="hero_container !min-h-[230px]">
        <h1 className="heading">Submit your NGO Details</h1>
      </section>
      <NGOForm />
    </>
  );
};

export default Page;
