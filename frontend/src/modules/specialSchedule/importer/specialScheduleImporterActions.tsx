import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/specialSchedule/importer/specialScheduleImporterSelectors';
import SpecialScheduleService from 'src/modules/specialSchedule/specialScheduleService';
import fields from 'src/modules/specialSchedule/importer/specialScheduleImporterFields';
import { i18n } from 'src/i18n';

const specialScheduleImporterActions = importerActions(
  'SPECIALSCHEDULE_IMPORTER',
  selectors,
  SpecialScheduleService.import,
  fields,
  i18n('entities.specialSchedule.importer.fileName'),
);

export default specialScheduleImporterActions;