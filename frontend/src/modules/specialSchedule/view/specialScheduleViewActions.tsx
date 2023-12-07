import SpecialScheduleService from 'src/modules/specialSchedule/specialScheduleService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'SPECIALSCHEDULE_VIEW';

const specialScheduleViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: specialScheduleViewActions.FIND_STARTED,
      });

      const record = await SpecialScheduleService.find(id);

      dispatch({
        type: specialScheduleViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: specialScheduleViewActions.FIND_ERROR,
      });

      getHistory().push('/special-schedule');
    }
  },
};

export default specialScheduleViewActions;
