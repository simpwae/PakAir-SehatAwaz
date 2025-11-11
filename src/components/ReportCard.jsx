import { memo } from "react";
import { MapPin, Clock } from "lucide-react";
import VerifiedBadge from "./ui/VerifiedBadge";

function ReportCard({ report }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={report.img}
          alt={report.title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {report.verified && (
          <div className="absolute top-3 right-3">
            <VerifiedBadge />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-primary-500" />
            <span className="font-medium">{report.location}</span>
          </div>
        </div>
        <p className="text-sm text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {report.title}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 mr-1 text-primary-400" />
            {report.time}
          </div>
          <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ReportCard);
