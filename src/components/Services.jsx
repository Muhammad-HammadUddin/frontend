import { FaAppleAlt, FaGraduationCap, FaDollarSign } from 'react-icons/fa';
import ServiceCard from './ServiceCard.jsx';

const Services = () => {
  const services = [
    {
      title: "Food Assistance",
      description: "Provide nutritious meals to those in need, ensuring food security for all.",
      icon: <FaAppleAlt size={48} />,  // Food-related icon
    },
    {
      title: "Educational Support",
      description: "Offer scholarships, resources, and guidance to help students achieve their academic goals.",
      icon: <FaGraduationCap size={48} />,  // Graduation cap for education
    },
    {
      title: "Financial Aid",
      description: "Help individuals and families with financial support for essential needs and services.",
      icon: <FaDollarSign size={48} />,  // Dollar sign for financial assistance
    },
  ];

  return (
    <section className="py-12 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;