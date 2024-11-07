import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { EyeIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { cn, FormatDate } from "@/lib/utils";
import { Author, Ngo } from "@/sanity/types";

export type NGOCardType = Omit<Ngo, "author"> & { author?: Author };

const NGOCard = ({ post }: { post: NGOCardType }) => {
  const { _id, bio, views, title, image, author, category, _createdAt } = post;

  return (
    <li className="ngo-card group font-nunito">
      <div className="flex-between items-center">
        <p className="ngo-card_date uppercase font-montserrat">
          {FormatDate(_createdAt)}
        </p>

        <div className="flex gap-1.5 items-center">
          <EyeIcon className="size-5 text-primary" />
          <span className="text-14-normal !text-primary font-montserrat">
            {views}
          </span>
        </div>
      </div>

      <div className="mt-5 flex-between gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-14-medium line-clamp-1 !text-muted-foreground">
              {author?.name}
            </p>
          </Link>

          <Link href={`/ngo/${_id}`}>
            <h3 className="text-26-medium font-montserrat line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>

        <div className="w-10 h-10 relative">
          <Link href={`/user/${author?._id}`}>
            <Image
              fill
              alt={author?.name!}
              src={author?.image!}
              className="rounded-full absolute"
            />
          </Link>
        </div>
      </div>

      <Link href={`/ngo/${_id}`}>
        <p className="ngo-card_desc">{bio}</p>

        <img src={image} alt="placeholder" className="ngo-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>

        <Button className="ngo-card_btn" asChild>
          <Link href={`/ngo/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const NgoCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="ngo-card_skeleton" />
      </li>
    ))}
  </>
);

export default NGOCard;
