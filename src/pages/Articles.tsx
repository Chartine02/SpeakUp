import { useState } from "react";
import Title from "../components/Title";
import { slides } from "../data/blogs";
import { motion } from "framer-motion";

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Mental Health", "Self-Care", "Relationships", "Anxiety", "Depression"];

  // Filter articles based on category
  const filteredArticles = selectedCategory === "All" 
    ? slides 
    : slides.filter(article => article.category === selectedCategory);

  return (
    <div className="pt-24 pb-16 px-20">
      <div className="max-w-7xl mx-auto">
        <Title text="Articles" />
        <p className="text-center text-lg max-w-2xl mx-auto mb-10">
          Explore our collection of articles written by mental health professionals and experts to help you on your wellness journey.
        </p>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src={article.src} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary/20 text-primary rounded-full mb-3">
                  {article.category || "Mental Health"}
                </span>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.text}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{article.date || "May 15, 2023"}</span>
                  <button className="text-primary font-medium hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articles; 