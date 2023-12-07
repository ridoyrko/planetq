import RegularScheduleService from 'src/modules/regularSchedule/regularScheduleService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'REGULARSCHEDULE_VIEW';

const regularScheduleViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: regularScheduleViewActions.FIND_STARTED,
      });

      const record = await RegularScheduleService.find(id);

      dispatch({
        type: regularScheduleViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: regularScheduleViewActions.FIND_ERROR,
      });

      getHistory().push('/regular-schedule');
    }
  },
};

export default regularScheduleViewActions;
