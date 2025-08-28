"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GlassCard from "../GlassCard";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  profileLink: string;
}

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        // Mock data for demonstration; replace with actual API call
        const fetchedMembers: TeamMember[] = [
          {
            id: 1,
            name: "John Doe",
            role: "Lead Guide",
            bio: "John has over 10 years of experience leading treks in the Himalayas, with a passion for sustainable travel.",
            image: "/images/slide1.webp",
            profileLink: "/team/john-doe",
          },
          {
            id: 2,
            name: "Sarah Smith",
            role: "Adventure Coordinator",
            bio: "Sarah ensures every trek is perfectly planned, from logistics to unforgettable experiences.",
            image: "/images/slide2.jpg",
            profileLink: "/team/sarah-smith",
          },
          {
            id: 3,
            name: "Kumar Lama",
            role: "Local Expert",
            bio: "Born in the Himalayas, Kumar brings deep cultural knowledge and expertise to every journey.",
            image: "/images/slide3.jpg",
            profileLink: "/team/kumar-lama",
          },
          {
            id: 4,
            name: "Emily Chen",
            role: "Photographer",
            bio: "Emily captures the beauty of the Mardi Himal Trek, sharing stories through stunning visuals.",
            image: "/images/slide1.webp",
            profileLink: "/team/emily-chen",
          },
          {
            id: 5,
            name: "Rajesh Gurung",
            role: "Safety Specialist",
            bio: "Rajesh ensures every adventurer is safe with his expertise in high-altitude safety protocols.",
            image: "/images/slide2.jpg",
            profileLink: "/team/rajesh-gurung",
          },
          {
            id: 6,
            name: "Lisa Patel",
            role: "Customer Support",
            bio: "Lisa is dedicated to making your trek experiencefijj lajfla aljflafj aalkjdfoiwe alfksjlae faifaejf aefewjfi ralkfjeslhf akeilkhrakh ahfaieoei  afehehoeithq qheqh wqhtk thqoih  seamless with her exceptional support.",
            image: "/images/slide3.jpg",
            profileLink: "/team/lisa-patel",
          },
        ];
        setTeamMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, []);

  return (
    <section className="py-20 px-8 md:px-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-80 h-80 bg-teal-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif tracking-tight drop-shadow-md">
            Our Team
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate individuals who make your Mardi Himal Trek unforgettable with their expertise and dedication.
          </p>
        </motion.div>

        {/* Team Cards Grid */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <GlassCard
                  title={member.name}
                  description={
                    <div>
                      <p className="line-clamp-4">{member.bio}</p>
                    </div>
                  }
                  topLeft={member.role}
                  image={member.image}
                  ctaLabel="View Profile"
                  ctaLink={member.profileLink}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}