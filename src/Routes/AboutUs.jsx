import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBook, FaUsers, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContextProvider";

const AboutUs = () => {
  const { user } = useContext(AuthContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-[#FFF4F6] to-white min-h-screen py-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="container mx-auto max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section className="text-center py-16" variants={itemVariants}>
          <motion.h1
            className="slab text-4xl md:text-5xl lg:text-6xl font-bold text-[#890C25] mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            About College Connect
          </motion.h1>
          <motion.p
            className="quick text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Bridging the gap between students and colleges with seamless booking
            and admission services.
          </motion.p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="py-12 grid md:grid-cols-2 gap-12 items-center"
          variants={itemVariants}
        >
          <div>
            <motion.h2
              className="slab text-3xl font-bold text-[#890C25] mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="quick text-gray-600 mb-6 text-lg"
              whileHover={{ x: 5 }}
            >
              At College Connect, we're revolutionizing how students discover
              and interact with colleges. Our platform simplifies the admission
              process, making it transparent, efficient, and student-friendly.
            </motion.p>
            <motion.p
              className="quick text-gray-600 text-lg"
              whileHover={{ x: 5 }}
            >
              We believe every student deserves access to quality education
              without the hassle of complex admission procedures.
            </motion.p>
          </div>
          <motion.div
            className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-xl"
            whileHover={{ scale: 1.01 }}
          >
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="College students"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="py-12" variants={itemVariants}>
          <motion.h2
            className="slab text-3xl font-bold text-[#890C25] mb-12 text-center"
            whileInView={{ scale: 1.05 }}
            viewport={{ once: true }}
          >
            Why Choose College Connect?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#890C25] text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="slab text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="quick text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section className="py-12" variants={itemVariants}>
          <motion.h2
            className="slab text-3xl font-bold text-[#890C25] mb-12 text-center"
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-48 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="slab text-xl font-bold">{member.name}</h3>
                  <p className="quick text-[#890C25] mb-2">{member.role}</p>
                  <p className="quick text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="py-16 bg-[#890C25] rounded-xl text-white my-12"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold mb-2 slab">{stat.value}</div>
                <div className="quick text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section className="text-center py-16" variants={itemVariants}>
          <motion.h2
            className="slab text-3xl md:text-4xl font-bold text-[#890C25] mb-6"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your College Search?
          </motion.h2>
          <motion.p
            className="quick text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of students who found their perfect college through
            our platform.
          </motion.p>
          <Link to={user ? "/admission" : "/login"}>
            <motion.button
              className="cursor-pointer border-none quick bg-[#890C25] hover:bg-[#C51F3A] text-white font-medium py-3 px-8 rounded-lg text-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </Link>
        </motion.section>
      </motion.div>
    </div>
  );
};

// Data
const features = [
  {
    icon: <FaGraduationCap />,
    title: "Easy Admission",
    description:
      "Streamlined admission process that saves you time and reduces paperwork.",
  },
  {
    icon: <FaBook />,
    title: "Comprehensive Info",
    description:
      "Detailed college profiles with all the information you need to make decisions.",
  },
  {
    icon: <FaUsers />,
    title: "Student Reviews",
    description:
      "Authentic reviews from current students to help you choose the right college.",
  },
  {
    icon: <FaChartLine />,
    title: "Track Progress",
    description:
      "Monitor your application status and get real-time updates on your admission.",
  },
];

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Founder & CEO",
    bio: "Education specialist with 15+ years in university administration.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech enthusiast dedicated to improving educational technology.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Patel",
    role: "Head of Admissions",
    bio: "Former university admissions officer with insider knowledge.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const stats = [
  { value: "200+", label: "Colleges Listed" },
  { value: "50K+", label: "Students Served" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

export default AboutUs;
