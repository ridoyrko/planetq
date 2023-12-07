import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/regularSchedule/importer/regularScheduleImporterSelectors';
import RegularScheduleService from 'src/modules/regularSchedule/regularScheduleService';
import fields from 'src/modules/regularSchedule/importer/regularScheduleImporterFields';
import { i18n } from 'src/i18n';

const regularScheduleImporterActions = importerActions(
  'REGULARSCHEDULE_IMPORTER',
  selectors,
  RegularScheduleService.import,
  fields,
  i18n('entities.regularSchedule.importer.fileName'),
);

export default regularScheduleImporterActions;