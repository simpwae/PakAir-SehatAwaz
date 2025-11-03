import { AlertTriangle, School, Building2 } from "lucide-react";
import CustomButton from "./ui/Button";

const severityColors = {
  high: "bg-red-50 border-red-200",
  medium: "bg-orange-50 border-orange-200",
  low: "bg-yellow-50 border-yellow-200",
};

const severityIconColors = {
  high: "text-red-600",
  medium: "text-orange-500",
  low: "text-yellow-500",
};

export default function AlertCard({ alert }) {
  return (
    <div
      className={`p-6 rounded-lg border ${severityColors[alert.severity]} mb-4`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <AlertTriangle
            className={`w-6 h-6 ${severityIconColors[alert.severity]}`}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {alert.type}: {alert.location}
            </h3>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">
            Observation:
          </h4>
          <p className="text-gray-600">{alert.observation}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">
            Recommendation:
          </h4>
          <p className="text-gray-600">{alert.recommendation}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {alert.stats.schools} Schools
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {alert.stats.hospitals} Hospitals
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">AQI:</span>
            <span
              className={`text-sm font-semibold ${
                severityIconColors[alert.severity]
              }`}
            >
              {alert.stats.aqi}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CustomButton variant="primary" className="bg-green-700">
            Send Alert to Schools
          </CustomButton>
          <CustomButton variant="primary" className="bg-green-600">
            Notify Hospitals
          </CustomButton>
          <CustomButton variant="default">Draft Public Advisory</CustomButton>
        </div>
      </div>
    </div>
  );
}
