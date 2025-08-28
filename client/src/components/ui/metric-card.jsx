import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function MetricCard({
  title,
  icon: Icon,
  description,
  children,
  footer,
}) {
  return (
    <Card className="border rounded-lg p-0 overflow-x-auto">
      <CardHeader className="p-1 mb-2">
        <div className="flex items-center justify-between gap-2">
          {title && (
            <CardTitle className="text-md font-semibold">{title}</CardTitle>
          )}
          {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
        </div>
        <div className="">
          {description && (
            <CardDescription className="text-sm text-center text-muted-foreground mt-1">
              {description}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-md ">{children}</CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
