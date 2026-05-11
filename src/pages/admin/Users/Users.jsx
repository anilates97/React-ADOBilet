import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/dataSlice";
import {
  AdminCard,
  AdminLoading,
  AdminTable,
  AdminToolbar,
  TextClamp,
} from "../AdminShared";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="grid gap-5">
      <AdminToolbar
        eyebrow="Customer records"
        title="Users"
        copy="Review application profiles and role assignments."
      />

      {users ? (
        <AdminTable
          columns={["Username", "Email", "Role"]}
          data={users}
          emptyMessage="No users found."
          getSearchText={(user) =>
            `${user.username} ${user.email} ${user.authenticated_role}`
          }
          renderCard={(user) => (
            <AdminCard
              key={user.id}
              meta={user.authenticated_role || "authenticated"}
              title={user.username || user.email}
              fields={[
                ["Email", user.email],
                ["Role", user.authenticated_role || "authenticated"],
              ]}
            />
          )}
          renderRow={(user) => (
            <tr key={user.id}>
              <td className="font-bold text-[#f7efe2]">{user.username || "-"}</td>
              <td>
                <TextClamp max={52}>{user.email}</TextClamp>
              </td>
              <td>
                <span className="rounded-full border border-[#d9a85f]/30 bg-[#d9a85f]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#f2d59a]">
                  {user.authenticated_role || "authenticated"}
                </span>
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

export default Users;
