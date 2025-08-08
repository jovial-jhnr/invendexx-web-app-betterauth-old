import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function DashboardCard({
  title,
  icon: Icon,
  description,
  children,
  footer,
}) {
  return (
    <Card className="rounded-lg p-2">
      <CardHeader className="p-0 mb-2 font-sans">
        <div className="flex items-center justify-between">
          {title && <CardTitle className="text-sm">{title}</CardTitle>}
          {Icon && <Icon className="w-5 h-5 size-4 text-green-600" />}
        </div>
      </CardHeader>

      <CardContent className="text-md font-bold font-inter items-center text-center p-2">
        {children}

        {description && (
          <CardDescription className="text-xs sm:text-sm text-center text-muted-foreground mt-1">
            {description}
          </CardDescription>
        )}
      </CardContent>

      {footer && <CardFooter className="">{footer}</CardFooter>}
    </Card>
  );
}
