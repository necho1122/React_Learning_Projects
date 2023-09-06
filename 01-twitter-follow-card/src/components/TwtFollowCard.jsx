import PropTypes from "prop-types";
import { useState } from "react";

export function TwtFollowCard({
  profilePhoto,
  profileName,
  username,
}) {
  const [followState, serFollowState] = useState(true);
  const handleClik = () => {
    serFollowState(!followState);
  };
  const btnClassName = followState ? "btn-follow-on" : "btn-follow-off";
  return (
    <article className="tw-container-card">
      <header className="tw-container-header">
        <img
          className="tw-profile-photo"
          src={profilePhoto}
          alt="avatar de ejemplo"
        />
        <div className="tw-user-data">
          <strong className="tw-profile-name">{profileName}</strong>
          <span className="tw-username">@{username}</span>
        </div>
      </header>

      <aside className="tw-aside-for-button">
        <button className={btnClassName} onClick={handleClik}>
        <span className="tw-followCard-text">{followState ? "Seguir" : "Siguiendo"}</span>
        <span className="tw-btn-unfollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}

TwtFollowCard.propTypes = {
  profilePhoto: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
