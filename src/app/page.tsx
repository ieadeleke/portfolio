import CountUp from "@/components/animations/counter";
import SplitText from "@/components/animations/splittext";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen relative flex items-center justify-center">
      <div>
        <SplitText
          text="Hello there"
          className="text-5xl font-semibold text-center text-white"
          delay={100}
          duration={0.4}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        // onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
      {/* <h1 className="text-white text-4xl">Hello there my gee</h1> */}
      <div className="flex items-center gap-2 absolute bottom-5 right-5">
        <CountUp
          from={0}
          to={100}
          separator=","
          direction="up"
          duration={3}
          className="count-up-text text-5xl"
        /><span className="text-5xl">%</span>
      </div>
    </div>
  );
}
