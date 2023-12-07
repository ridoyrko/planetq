import { createSelector } from 'reselect';

const selectRaw = (state) => state.musicTrack.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const musicTrackDestroySelectors = {
  selectLoading,
};

export default musicTrackDestroySelectors;
