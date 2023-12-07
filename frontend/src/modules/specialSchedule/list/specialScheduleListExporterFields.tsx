import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.specialSchedule.fields.id'),
  },
  {
    name: 'description',
    label: i18n('entities.specialSchedule.fields.description'),
  },
  {
    name: 'scheduleDate',
    label: i18n('entities.specialSchedule.fields.scheduleDate'),
  },
  {
    name: 'musicTrack',
    label: i18n('entities.specialSchedule.fields.musicTrack'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.specialSchedule.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.specialSchedule.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
