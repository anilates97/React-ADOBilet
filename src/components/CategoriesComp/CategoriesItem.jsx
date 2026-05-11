import { useNavigate } from "react-router-dom";

function CategoriesItem({ category, handleScrollToTop }) {
  const navigate = useNavigate();
  const goToEvents = () => {
    navigate(
      `events/${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`
    );
  };

  return (
    <div
      onClick={() => {
        goToEvents();
        handleScrollToTop();
      }}
      className="premium-card group relative flex h-72 cursor-pointer items-end overflow-hidden p-5 text-left"
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/45 to-transparent transition duration-500 group-hover:via-[#07090d]/20"></div>
      <p className="relative text-4xl font-bold uppercase leading-none tracking-normal text-[#f7efe2] transition duration-500 group-hover:text-[#f2d59a]">
        {category.name}
      </p>
    </div>
  );
}

export default CategoriesItem;
