import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryById, getCategoryTest } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import {
  AdminActions,
  AdminCard,
  AdminLoading,
  AdminTable,
  AdminToolbar,
  TextClamp,
} from "../AdminShared";

function Categories() {
  const dispatch = useDispatch();
  const { categoriesTest } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoryTest());
  }, [dispatch]);

  return (
    <div className="grid gap-5">
      <AdminToolbar
        eyebrow="Discovery taxonomy"
        title="Categories"
        copy="Organize event discovery with clean, visual category groups."
        actionLabel="Add category"
        onAction={() => navigate("/admin/addCategory")}
      />

      {categoriesTest ? (
        <AdminTable
          columns={["Name", "Category photo", "Actions"]}
          data={categoriesTest}
          emptyMessage="No categories found."
          getSearchText={(category) => `${category.name} ${category.image}`}
          renderCard={(category) => (
            <AdminCard
              key={category.id}
              meta="Category"
              title={category.name}
              fields={[["Category photo", category.image]]}
              actions={
                <AdminActions
                  onDelete={() => dispatch(deleteCategoryById(category.id))}
                  onUpdate={() =>
                    navigate(`/admin/Categories/${category.id}`, {
                      state: {
                        name: category.name,
                        photo: category.image,
                      },
                    })
                  }
                />
              }
            />
          )}
          renderRow={(category) => (
            <tr key={category.id}>
              <td className="font-bold text-[#f7efe2]">{category.name}</td>
              <td>
                <TextClamp max={68}>{category.image}</TextClamp>
              </td>
              <td>
                <AdminActions
                  onDelete={() => dispatch(deleteCategoryById(category.id))}
                  onUpdate={() =>
                    navigate(`/admin/Categories/${category.id}`, {
                      state: {
                        name: category.name,
                        photo: category.image,
                      },
                    })
                  }
                />
              </td>
            </tr>
          )}
        />
      ) : (
        <AdminLoading />
      )}
    </div>
  );
}

export default Categories;
