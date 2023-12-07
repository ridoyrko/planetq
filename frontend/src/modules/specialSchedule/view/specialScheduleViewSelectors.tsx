import { createSelector } from 'reselect';

const selectRaw = (state) => state.specialSchedule.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const specialScheduleViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default specialScheduleViewSelectors;
