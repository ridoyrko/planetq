import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/musicTrack/importer/musicTrackImporterActions';
import fields from 'src/modules/musicTrack/importer/musicTrackImporterFields';
import selectors from 'src/modules/musicTrack/importer/musicTrackImporterSelectors';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';

function MusicTrackImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.musicTrack.importer.hint'),
  );

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.musicTrack.menu'), '/music-track'],
          [i18n('entities.musicTrack.importer.title')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 dark:text-white border-gray-200 border rounded-md">
        <h1 className="text-lg font-medium mb-6">
          {i18n('entities.musicTrack.importer.title')}
        </h1>

        <Importer />
      </div>
    </>
  );
}

export default MusicTrackImportPage;
