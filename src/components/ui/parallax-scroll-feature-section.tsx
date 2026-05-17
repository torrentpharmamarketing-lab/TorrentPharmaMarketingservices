'use client'

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils";

export const ParallaxScrollSection = () => {
    // Array of section data tailored for Torrent Pharma Marketing
    const sections = [
        {
            id: 1,
            title: "District Targeting",
            description: "Target specific cities like Lahore, Karachi, or Peshawar with precision. Reach the exact distributors you need in your target territories.",
            imageUrl: '/DistritctTargeting.png',
            reverse: false
        },
        {
            id: 2,
            title: "Verified Leads",
            description: "No more generic inquiries. Our system filters for high-intent manufacturers and entrepreneurs ready to invest in your franchise.",
            imageUrl: '/verifiedleads.png',
            reverse: true
        },
        {
            id: 3,
            title: "Instant Closing",
            description: "Direct WhatsApp integration means you talk to leads immediately. Close deals faster using the power of direct mobile communication.",
            imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
            reverse: false
        }
    ]

    // Create refs for each section
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    
    // Detect mobile to disable expensive animations
    const isMobile = useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768;
        }
        return false;
    }, []);
    
    // Only use scroll animations on desktop
    const s1Progress = !isMobile ? useScroll({ target: sectionRefs[0], offset: ["start 90%", "center 40%"] }).scrollYProgress : null;
    const s2Progress = !isMobile ? useScroll({ target: sectionRefs[1], offset: ["start 90%", "center 40%"] }).scrollYProgress : null;
    const s3Progress = !isMobile ? useScroll({ target: sectionRefs[2], offset: ["start 90%", "center 40%"] }).scrollYProgress : null;

    const progresses = [s1Progress, s2Progress, s3Progress];

    // Create animations for each section - simplified on mobile
    const opacityContents = progresses.map(progress => 
        progress ? useTransform(progress, [0, 0.7], [0, 1]) : 1
    );
    
    const clipProgresses = progresses.map(progress => 
        progress ? useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]) : "inset(0 0% 0 0)"
    );
    
    const translateContents = progresses.map(progress => 
        progress ? useTransform(progress, [0, 1], [-50, 0]) : 0
    );

  return (
    <div className="bg-card overflow-hidden border-y border-white/5">
      <div className='min-h-[60vh] w-full flex flex-col items-center justify-center px-4'>
        <h2 className='text-2xl sm:text-4xl md:text-6xl font-display font-bold text-white text-center max-w-3xl'>
          Why Choose Our <span className="text-teal">Expansion System?</span>
        </h2>
        <p className='mt-8 md:mt-12 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest'>
          Explore Features <ArrowDown size={15} className="animate-bounce text-teal" />
        </p>
      </div>

       <div className="flex flex-col md:px-0 px-4 sm:px-6 max-w-7xl mx-auto pb-12 md:pb-24">
            {sections.map((section, index) => (
                <div 
                    key={section.id}
                    ref={sectionRefs[index]} 
                    className={cn(
                        "min-h-auto md:min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-32 py-12 md:py-0",
                        section.reverse ? 'md:flex-row-reverse' : ''
                    )}
                >
                    <motion.div 
                        style={{ 
                            y: translateContents[index], 
                            opacity: opacityContents[index] 
                        }}
                        className="flex-1 space-y-4 md:space-y-6 w-full md:w-auto"
                    >
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-bold text-white">{section.title}</div>
                        <motion.p 
                            className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-md leading-relaxed"
                        >
                            {section.description}
                        </motion.p>
                    </motion.div>
                    
                    <motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="flex-1 relative w-full aspect-square max-w-md overflow-hidden rounded-2xl md:rounded-[40px] shadow-lg md:shadow-2xl md:shadow-black/50 border border-white/10"
                    >
                        <img 
                            src={section.imageUrl} 
                            className="w-full h-full object-cover" 
                            alt={section.title}
                            loading="lazy"
                            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 400px"
                        />
                    </motion.div>
                </div>
            ))}
        </div>
    </div>
  );
};
