import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.regularSchedule.fields.id'),
  },
  {
    name: 'day',
    label: i18n('entities.regularSchedule.fields.day'),
  },
  {
    name: 'musicTrack',
    label: i18n('entities.regularSchedule.fields.musicTrack'),
    render: exporterRenders.relationToMany(),
  },
  {
    name: 'createdAt',
    label: i18n('entities.regularSchedule.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.regularSchedule.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
