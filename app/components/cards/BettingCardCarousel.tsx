"use client";

import * as React from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import BettingCard from "@/app/components/cards/BettingCard";
import type { BettingCardData } from "@/lib/stats/cardStats";



type BettingCardCarouselProps = {
  cards: BettingCardData[];
};

const BettingCardCarousel = ({
  cards,
}: BettingCardCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const updateSelectedIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    updateSelectedIndex();

    api.on("select", updateSelectedIndex);
    api.on("reInit", updateSelectedIndex);

    return () => {
      api.off("select", updateSelectedIndex);
      api.off("reInit", updateSelectedIndex);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full max-w-7xl"
    >
      <CarouselContent className="-ml-4 items-center py-10">
        {cards.map((card, index) => {
          const isSelected = index === selectedIndex;

          return (
            <CarouselItem
              key={card.id}
              className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div
                className={[
                  "transition-all duration-300 ease-in-out",
                  isSelected
                    ? "relative z-20 scale-100 opacity-100"
                    : "relative z-10 scale-[0.88] opacity-60 lg:scale-90",
                ].join(" ")}
              >
                <BettingCard card={card} />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {api && ( 
        <> 
            <CarouselPrevious className="left-2 md:-left-12" /> 
            <CarouselNext className="right-2 md:-right-12" /> 
        </> )}
    </Carousel>
  );
};

export default BettingCardCarousel;