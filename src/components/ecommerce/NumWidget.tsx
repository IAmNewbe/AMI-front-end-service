import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

interface NumWidgetProps {
  title: string;
  value: number;
  units: string;
}

export default function NumWidget({title, value, units}: NumWidgetProps) {
  return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-1">
          <div>
            <span className="text-base font-bold text-gray-700 dark:text-gray-400">
              {title}
            </span>
            <p className="mt-2 font-medium md:font-semibold text-gray-800 text-lg md:text-xl dark:text-white/90">
              {value}
            </p>
          </div>
          <Badge color="success">
            {units}
            {/* <ArrowUpIcon /> */}
              
          </Badge>
        </div>
      </div>
  );
}
