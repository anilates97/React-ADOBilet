import { useEffect, useMemo, useState } from "react";
import { HashLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdAdd, MdOutlineAssignmentTurnedIn } from "react-icons/md";

export function AdminToolbar({ eyebrow, title, copy, actionLabel, onAction, children }) {
  return (
    <div className="admin-toolbar">
      <div className="text-left">
        {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
        {title && <h3>{title}</h3>}
        {copy && <p>{copy}</p>}
      </div>
      <div className="admin-toolbar-actions">
        {children}
        {actionLabel && (
          <button className="admin-primary-button" onClick={onAction}>
            <MdAdd />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function AdminTable({
  columns,
  data,
  renderRow,
  renderCard,
  emptyMessage,
  getSearchText,
  pageSize = 10,
  searchPlaceholder = "Search records...",
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const records = useMemo(() => data || [], [data]);

  const filteredData = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return records;

    return records.filter((item) => {
      const source = getSearchText
        ? getSearchText(item)
        : Object.values(item || {}).join(" ");

      return String(source).toLowerCase().includes(normalizedQuery);
    });
  }, [getSearchText, query, records]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="admin-table-wrap">
      {records.length > 0 ? (
        <>
          <div className="admin-list-controls">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              type="search"
            />
            <span>
              {filteredData.length} of {records.length} records
            </span>
          </div>

          {filteredData.length > 0 ? (
            <>
              <table className="admin-data-table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{paginatedData.map(renderRow)}</tbody>
              </table>

              <div className="admin-mobile-list">
                {paginatedData.map((item) =>
                  renderCard ? renderCard(item) : <AdminMobileCard item={item} />
                )}
              </div>

              <AdminPagination
                page={safePage}
                totalPages={totalPages}
                onPrevious={() => setPage((current) => Math.max(1, current - 1))}
                onNext={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              />
            </>
          ) : (
            <AdminEmptyState message="No matching records found." />
          )}
        </>
      ) : (
        <AdminEmptyState message={emptyMessage} />
      )}
    </div>
  );
}

function AdminPagination({ page, totalPages, onPrevious, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <div className="admin-pagination">
      <button disabled={page === 1} onClick={onPrevious}>
        Previous
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={onNext}>
        Next
      </button>
    </div>
  );
}

function AdminMobileCard({ item }) {
  return (
    <div className="admin-mobile-card">
      {Object.entries(item || {}).map(([key, value]) => (
        <div key={key} className="admin-mobile-field">
          <span>{key}</span>
          <strong>{String(value ?? "-")}</strong>
        </div>
      ))}
    </div>
  );
}

export function AdminCard({ title, meta, fields, actions }) {
  return (
    <article className="admin-mobile-card">
      <header>
        <div>
          {meta && <span>{meta}</span>}
          <h4>{title || "-"}</h4>
        </div>
      </header>
      <div className="admin-mobile-fields">
        {fields
          .filter(Boolean)
          .map(([label, value]) => (
            <div key={label} className="admin-mobile-field">
              <span>{label}</span>
              <strong>{value || "-"}</strong>
            </div>
          ))}
      </div>
      {actions && <div className="admin-mobile-actions">{actions}</div>}
    </article>
  );
}

export function AdminLoading() {
  return (
    <div className="admin-empty-state">
      <HashLoader size={58} color="#d9a85f" />
      <p>Loading management data...</p>
    </div>
  );
}

export function AdminEmptyState({ message = "No records found." }) {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-orb">0</div>
      <p>{message}</p>
    </div>
  );
}

export function AdminSelect({ label, value, onChange, children }) {
  return (
    <label className="admin-select-field">
      <span>{label}</span>
      <select value={value} onChange={onChange}>
        {children}
      </select>
    </label>
  );
}

export function TextClamp({ children, max = 44 }) {
  const value = children || "-";
  const text = String(value);

  return <span title={text}>{text.length > max ? `${text.slice(0, max)}...` : text}</span>;
}

export function AdminActions({ onDelete, onUpdate, onAssign }) {
  return (
    <div className="admin-row-actions">
      {onAssign && (
        <button className="admin-action-button neutral" onClick={onAssign}>
          <MdOutlineAssignmentTurnedIn />
          <span>Assign</span>
        </button>
      )}
      {onDelete && (
        <button className="admin-action-button danger" onClick={onDelete}>
          <RiDeleteBin2Fill />
          <span>Delete</span>
        </button>
      )}
      {onUpdate && (
        <button className="admin-action-button success" onClick={onUpdate}>
          <FaEdit />
          <span>Update</span>
        </button>
      )}
    </div>
  );
}
