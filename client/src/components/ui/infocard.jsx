// components/InfoCard.js
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function InfoCard({
  title,
  icon: Icon,
  description,
  children,
  footer,
}) {
  return (
    <Card className="border rounded-lg ">
      <CardHeader className="text-left p-2 mb-2">
        <section className="flex justify-between gap-2">
          {title && (
            <CardTitle className="text-md items-center flex justify-between gap-2 font-semibold">
              {title}
            </CardTitle>
          )}
          {Icon && <Icon className="w-5 h-5  rounded-md  " />}
        </section>
      </CardHeader>
      {description && <CardDescription>{description}</CardDescription>}

      <CardContent className="text-md p-3 font-bold text-center">
        {children}
      </CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
