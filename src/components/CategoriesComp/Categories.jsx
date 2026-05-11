import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesItem from "./CategoriesItem";
import { getCategoryTest } from "../../redux/dataSlice";
import { useNavigate } from "react-router-dom";

function Categories() {
  const { categoriesTest } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoryTest());
  }, [dispatch]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };

  return (
    <section className="premium-section">
      <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <div className="text-left">
          <div className="section-eyebrow">Explore by mood</div>
          <h2 className="section-title mt-3">Events by category</h2>
        </div>
        <button
          className="premium-btn px-6"
          onClick={() => {
            navigate(`events/All`);
            handleScrollToTop();
          }}
        >
          All Events
        </button>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categoriesTest.map((e, i) => (
          <CategoriesItem
            handleScrollToTop={handleScrollToTop}
            category={e}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}

export default Categories;
