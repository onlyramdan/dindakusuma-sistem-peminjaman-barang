import { thousandNumberFormat } from "@/helpers/formatter";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { FC } from "react";

interface MetricsCardProps {
  title: string;
  value: number;
  Icon: JSX.Element;
}

const MetricsCard: FC<MetricsCardProps> = ({ title, value, Icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {thousandNumberFormat.format(value)}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
