import { createSelector } from 'reselect';

const selectRaw = (state) => state.regularSchedule.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const regularScheduleDestroySelectors = {
  selectLoading,
};

export default regularScheduleDestroySelectors;
