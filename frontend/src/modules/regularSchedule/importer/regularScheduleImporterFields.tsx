import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import regularScheduleEnumerators from 'src/modules/regularSchedule/regularScheduleEnumerators';

export default [
  {
    name: 'day',
    label: i18n('entities.regularSchedule.fields.day'),
    schema: schemas.enumerator(
      i18n('entities.regularSchedule.fields.day'),
      {
        "required": true,
        "options": regularScheduleEnumerators.day
      },
    ),
  },
  {
    name: 'musicTrack',
    label: i18n('entities.regularSchedule.fields.musicTrack'),
    schema: schemas.relationToMany(
      i18n('entities.regularSchedule.fields.musicTrack'),
      {
        "min": 1,
        "required": true
      },
    ),
  },
];