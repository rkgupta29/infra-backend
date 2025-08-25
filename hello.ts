## Infra backend 

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EventDetailsPopup from "./EventDetails";
import InfrapanditAward from "./infraPanditAward";

interface EventData {
  date: string;
  dayTime: string;
  meetingType: string;
  desc: string;
  ctaText: string;
  details?: any;
}

interface MonthData {
  month: string;
  events: EventData[];
}

interface DataType {
  [year: string]: MonthData[];
}

const Upcoming = () => {
  const [year, setYear] = useState<string>("2025");
  const [filterData, setFilteredData] = useState<MonthData[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupDate, setPopUpData] = useState();
  const data: DataType = ;

  const years = Object.keys(data);

  useEffect(() => {
    setFilteredData(data[year] || []);
  }, [year]);

  const handleEventPopup = (data: any) => {
    setIsOpen(true);
    setPopUpData(data);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
  return (
    <section className="blade-top-padding blade-bottom-padding-lg relative">
      <img
        className="absolute opacity-60 z-0 top-0 right-0 hidden lg:block"
        src="/assets/outreach-and-engagements/highlight/circle.png"
        alt="Decorative Circle"
      />
      <div className="w-container">
        {/* <div className="blade-top-margin-sm blade-bottom-margin-sm p-2 border border-gray-300 bg-white rounded relative">
          <InfrapanditAward
            ctaText="Register now"
            link="https://docs.google.com/forms/d/e/1FAIpQLSdjpffzJCT6qmQXNUmoUau7giN4qVTsm5j3ysGZ0r8QxiG05g/viewform?usp=sharing&ouid=118204303619309850521"
          />
        </div> */}

        <div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">Calendar</h5>
          </div>
          <div className=" pt-2 sm:pt-4 flex flex-col md:flex-row justify-between gap-4 ">
            <h1 className="text-black font-light ">
              A glance at our
              <span className="font-medium">
                {" "}
                past and <br /> upcoming engagements
              </span>
            </h1>
          </div>
        </div>

        {/* Year Filter Only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-[70%] mt-9">
          <div className="relative">
            <h5 className="text-[#0A0A0A] mb-2">Year</h5>
            <Select value={year} onValueChange={(value) => setYear(value)}>
              <SelectTrigger className="text-[#C82249]">
                <SelectValue placeholder="Select the year" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-lightgray rounded-sm">
                {years.map((year, idx) => (
                  <SelectItem key={idx} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="bg-[#F6F6F6] blade-top-margin-sm p4 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap6">
          {filterData.map((monthData: MonthData, idx: number) => (
            <div
              className="p-4 border-l border-t border-[#E0E0E0] first:border-l-0"
              key={idx}
            >
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">
                {monthData.month}
              </h4>{" "}
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">
                {year}
              </h4>
              {monthData.events.map((event: EventData, eventIdx: number) => (
                <div
                  key={eventIdx}
                  className="bg-white p-4 mb-4 rounded  shadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{event.date}</h3>
                    <div className="h-6 w-[1px] bg-[#6E7478]" />
                    <p className="text-[#5D6468] text-sm">{event.dayTime}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink rounded-full block"></span>
                    <p className="text-sm text-[#333]">{event.meetingType}</p>
                  </div>
                  <div>
                    <p
                      className="text-base text-black mt-2"
                      dangerouslySetInnerHTML={{ __html: event.desc }}
                    ></p>

                    <button
                      onClick={() => handleEventPopup(event)}
                      className="pt-3 text-pink flex items-center gap-2 cursor-pointer  group"
                    >
                      {event.ctaText}{" "}
                      <span className="flex justify-center items-center border border-lightgray rounded-sm p-1 group-hover:bg-pink group-hover:text-white group-hover:border-pink transition duration-300 ease-linear">
                        <ArrowRight
                          width={14}
                          height={14}
                          className="text-sm"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {isOpen && popupDate && (
        <EventDetailsPopup onClose={() => setIsOpen(false)} data={popupDate} />
      )}
    </section>
  );
};

export default Upcoming;