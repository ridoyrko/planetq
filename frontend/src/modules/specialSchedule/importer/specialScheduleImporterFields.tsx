import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import moment from 'moment';

export default [
  {
    name: 'description',
    label: i18n('entities.specialSchedule.fields.description'),
    schema: schemas.string(
      i18n('entities.specialSchedule.fields.description'),
      {
        "required": true
      },
    ),
  },
  {
    name: 'scheduleDate',
    label: i18n('entities.specialSchedule.fields.scheduleDate'),
    schema: schemas.date(
      i18n('entities.specialSchedule.fields.scheduleDate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'musicTrack',
    label: i18n('entities.specialSchedule.fields.musicTrack'),
    schema: schemas.relationToMany(
      i18n('entities.specialSchedule.fields.musicTrack'),
      {
        "required": true,
        "min": 1
      },
    ),
  },
];