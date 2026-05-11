import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterCategories = ({ events, onSelectCategory, clickedCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === "") {
      onSelectCategory("");
    }
  }, [selectedCategory, onSelectCategory]);

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    setSelectedCategory(
      clickedCategory !== null && category === null ? clickedCategory : category
    );
    setIsSelected((select) => true);

    onSelectCategory(
      clickedCategory !== null && category === null
        ? clickedCategory
        : category === "All"
        ? ""
        : category
    );
    navigate(`/events/${category}`);
  };

  return (
    <div className="filter-shell">
      <div className="filter-toolbar">
        <div>
          <label className="section-eyebrow">Category</label>
          <p>Refine the calendar by experience type.</p>
        </div>
        <select
          onChange={handleCategorySelect}
          value={
            clickedCategory !== null && isSelected === false
              ? clickedCategory
              : selectedCategory === ""
              ? "All"
              : selectedCategory
          }
          className="premium-input w-full px-4 sm:max-w-[280px]"
        >
          <option value="All">All</option>
          {Array.from(new Set(events.map((event) => event.category.name))).map(
            (category, index) => (
              <option className="capitalize" key={index} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default FilterCategories;
