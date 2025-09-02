import { RENT_DURATION } from "@/constant/constant";

export const data = {
  engine: "Gas",
  area: "Main Lake",
  engines: [
    { name: "Gas", label: "Gas", price: "15hp" },
    { name: "Electric", label: "Electric", price: "20e" },
  ],
  areas: [
    { name: "Main Lake", label: "Main Lake" },
    { name: "Lagoon", label: "Lagoon" },
  ]
};

// Small reusable radio indicator
const RadioCircle = ({ checked }) => (
  <span
    className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center ${
      checked ? "border-[#808080]" : "border-gray-400"
    }`}
  >
    {checked && <span className="w-2.5 h-2.5 rounded-full bg-[#88907B]"></span>}
  </span>
);

export default function DurationSelector ({ rentDuration }) {
  // Step 1: determine if rentDuration is half day
  const isHalfDay =
    rentDuration === RENT_DURATION.HALF_DAY_MORNING ||
    rentDuration === RENT_DURATION.HALF_DAY_EVENING;

  const isFullDay = rentDuration === RENT_DURATION.FULL_DAY;

  return (
    <div className=" my-5 space-y-3">
      {/* Step 1: Full day vs Half day */}
      <div>
        <h4 className="text-[#808080] text-[14px] text-center mb-2">
          choose rent time
        </h4>
        <div className="flex border border-[#C5C5C5] rounded-full overflow-hidden">
          {/* Full Day */}
          <label
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm cursor-not-allowed ${
              isFullDay
                ? "bg-[#fcfcfc] text-[#808080] font-medium shadow-inner"
                : "bg-[#f1f1f1] text-gray-400"
            }`}
          >
            <input
              type="radio"
              name="rent-type"
              value={RENT_DURATION.FULL_DAY}
              checked={isFullDay}
              readOnly
              className="hidden"
            />
            Full Day
            <RadioCircle checked={isFullDay} />
          </label>

          {/* Half Day */}
          <label
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm cursor-not-allowed ${
              isHalfDay
                ? "bg-[#fcfcfc] text-[#808080] font-medium shadow-inner"
                : "bg-[#f1f1f1] text-gray-400"
            }`}
          >
            <input
              type="radio"
              name="rent-type"
              value="half_day"
              checked={isHalfDay}
              readOnly
              className="hidden"
            />
            Half Day
            <RadioCircle checked={isHalfDay} />
          </label>
        </div>
      </div>

      {/* Step 2: Half Day Options */}
      {isHalfDay && (
        <div>
          <h4 className="text-[#808080] text-[14px] text-center mb-2">
            choose half day time
          </h4>
          <div className="flex border border-[#C5C5C5] rounded-full overflow-hidden">
            {/* Morning */}
            <label
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm cursor-not-allowed ${
                rentDuration === RENT_DURATION.HALF_DAY_MORNING
                  ? "bg-[#fcfcfc] text-[#808080] font-medium shadow-inner"
                  : "bg-[#f1f1f1] text-gray-400"
              }`}
            >
              <input
                type="radio"
                name="half-day-time"
                value={RENT_DURATION.HALF_DAY_MORNING}
                checked={rentDuration === RENT_DURATION.HALF_DAY_MORNING}
                readOnly
                className="hidden"
              />
              6:30 AM to <br/> 12:30 PM
              <RadioCircle
                checked={rentDuration === RENT_DURATION.HALF_DAY_MORNING}
              />
            </label>

            {/* Evening */}
            <label
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm cursor-not-allowed ${
                rentDuration === RENT_DURATION.HALF_DAY_EVENING
                  ? "bg-[#fcfcfc] text-[#808080] font-medium shadow-inner"
                  : "bg-[#f1f1f1] text-gray-400"
              }`}
            >
              <input
                type="radio"
                name="half-day-time"
                value={RENT_DURATION.HALF_DAY_EVENING}
                checked={rentDuration === RENT_DURATION.HALF_DAY_EVENING}
                readOnly
                className="hidden"
              />
              1:30 PM to <br/> 7:30 PM
              <RadioCircle
                checked={rentDuration === RENT_DURATION.HALF_DAY_EVENING}
              />
            </label>
          </div>
        </div>
      )}

      {/* Boat Engine */}
      <div>
        <p className="text-center text-[#808080] text-sm mb-2">Boat Engine</p>
        <div className="flex border border-[#C5C5C5] rounded-full overflow-hidden">
          {data.engines.map((engine) => {
            const isSelected = engine.name === data.engine;
            return (
              <label
                key={engine.name}
                className={`flex-1 flex flex-col  items-center justify-center gap-1 py-2 text-sm cursor-not-allowed ${
                  isSelected
                    ? "bg-[#fcfcfc] text-[#808080] font-medium shadow-inner"
                    : "bg-[#f1f1f1] text-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="engine"
                  value={engine.name}
                  checked={isSelected}
                  readOnly
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  {engine.label} <RadioCircle checked={isSelected} />
                </div>
                <div className="text-xs">{engine.price}</div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Boat Area */}
      <div>
        <p className="text-center text-[#808080] text-sm mb-2">
          Area for {data.engine.toLowerCase()} boat
        </p>
        <div className="flex border border-[#C5C5C5] rounded-full overflow-hidden">
          {data.areas.map((area) => {
            const isSelected = area.name === data.area;
            return (
              <label
                key={area.name}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm cursor-not-allowed ${
                  isSelected
                    ? "bg-[#fcfcfc] text-[#808080] font-medium shadow-inner"
                    : "bg-[#f1f1f1] text-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="area"
                  value={area.name}
                  checked={isSelected}
                  readOnly
                  className="hidden"
                />
                {area.label}
                <RadioCircle checked={isSelected} />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
