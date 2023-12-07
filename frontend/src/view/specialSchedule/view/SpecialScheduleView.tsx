import React from 'react';
import { i18n } from 'src/i18n';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import MusicTrackViewItem from 'src/view/musicTrack/view/MusicTrackViewItem';

function SpecialScheduleView(props) {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <div>
      <TextViewItem
        label={i18n('entities.specialSchedule.fields.description')}
        value={record.description}
      />

      <TextViewItem
        label={i18n('entities.specialSchedule.fields.scheduleDate')}
        value={record.scheduleDate}
      />

      <MusicTrackViewItem
        label={i18n('entities.specialSchedule.fields.musicTrack')}
        value={record.musicTrack}
      />
    </div>
  );
}

export default SpecialScheduleView;
