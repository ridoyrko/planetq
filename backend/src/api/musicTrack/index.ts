export default (app) => {
  app.post(
    `/tenant/:tenantId/music-track`,
    require('./musicTrackCreate').default,
  );
  app.put(
    `/tenant/:tenantId/music-track/:id`,
    require('./musicTrackUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/music-track/import`,
    require('./musicTrackImport').default,
  );
  app.delete(
    `/tenant/:tenantId/music-track`,
    require('./musicTrackDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/music-track/autocomplete`,
    require('./musicTrackAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/music-track`,
    require('./musicTrackList').default,
  );
  app.get(
    `/tenant/:tenantId/music-track/:id`,
    require('./musicTrackFind').default,
  );

  app.get(
    `/radioList`,
    require('./radioList').default,
  );

};
