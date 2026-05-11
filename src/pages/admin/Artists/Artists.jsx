import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArtistById, getArtistTest } from "../../../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import {
  AdminActions,
  AdminCard,
  AdminLoading,
  AdminTable,
  AdminToolbar,
  TextClamp,
} from "../AdminShared";

function Artists() {
  const dispatch = useDispatch();
  const { artists } = useSelector((state) => state.data);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArtistTest());
  }, [dispatch]);

  return (
    <div className="grid gap-5">
      <AdminToolbar
        eyebrow="Talent catalogue"
        title="Artists"
        copy="Manage performer records used across event detail pages."
        actionLabel="Add artist"
        onAction={() => navigate("/admin/addArtist")}
      />

      {artists ? (
        <AdminTable
          columns={["Name", "Photo source", "Actions"]}
          data={artists}
          emptyMessage="No artists found."
          getSearchText={(artist) => `${artist.artistName} ${artist.artistPhoto}`}
          renderCard={(artist) => (
            <AdminCard
              key={artist.id}
              meta="Artist"
              title={artist.artistName}
              fields={[["Photo source", artist.artistPhoto]]}
              actions={
                <AdminActions
                  onDelete={() => dispatch(deleteArtistById(artist.id))}
                  onUpdate={() =>
                    navigate(`/admin/Artist/${artist.id}`, {
                      state: {
                        artistName: artist.artistName,
                        artistPhoto: artist.artistPhoto,
                      },
                    })
                  }
                />
              }
            />
          )}
          renderRow={(artist) => (
            <tr key={artist.id}>
              <td className="font-bold text-[#f7efe2]">{artist.artistName}</td>
              <td>
                <TextClamp>{artist.artistPhoto}</TextClamp>
              </td>
              <td>
                <AdminActions
                  onDelete={() => dispatch(deleteArtistById(artist.id))}
                  onUpdate={() =>
                    navigate(`/admin/Artist/${artist.id}`, {
                      state: {
                        artistName: artist.artistName,
                        artistPhoto: artist.artistPhoto,
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

export default Artists;
