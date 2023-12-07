import Permissions from 'src/security/permissions';
import config from 'src/config';

const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    loader: () =>
      import('src/view/musicTrack/list/MusicTrackListPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/password-change',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/new',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/:id/edit',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  config.isPlanEnabled && {
    path: '/plan',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
  },

  {
    path: '/user',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/user/new',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
  },

  {
    path: '/user/importer',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
  },
  {
    path: '/user/:id/edit',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.userEdit,
    exact: true,
  },
  {
    path: '/user/:id',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/music-track',
    loader: () =>
      import('src/view/musicTrack/list/MusicTrackListPage'),
    permissionRequired: permissions.musicTrackRead,
    exact: true,
  },
  {
    path: '/music-track/new',
    loader: () =>
      import('src/view/musicTrack/form/MusicTrackFormPage'),
    permissionRequired: permissions.musicTrackCreate,
    exact: true,
  },
  {
    path: '/music-track/importer',
    loader: () =>
      import(
        'src/view/musicTrack/importer/MusicTrackImporterPage'
      ),
    permissionRequired: permissions.musicTrackImport,
    exact: true,
  },
  {
    path: '/music-track/:id/edit',
    loader: () =>
      import('src/view/musicTrack/form/MusicTrackFormPage'),
    permissionRequired: permissions.musicTrackEdit,
    exact: true,
  },
  {
    path: '/music-track/:id',
    loader: () =>
      import('src/view/musicTrack/view/MusicTrackViewPage'),
    permissionRequired: permissions.musicTrackRead,
    exact: true,
  },

  {
    path: '/regular-schedule',
    loader: () =>
      import('src/view/regularSchedule/list/RegularScheduleListPage'),
    permissionRequired: permissions.regularScheduleRead,
    exact: true,
  },
  {
    path: '/regular-schedule/new',
    loader: () =>
      import('src/view/regularSchedule/form/RegularScheduleFormPage'),
    permissionRequired: permissions.regularScheduleCreate,
    exact: true,
  },
  {
    path: '/regular-schedule/importer',
    loader: () =>
      import(
        'src/view/regularSchedule/importer/RegularScheduleImporterPage'
      ),
    permissionRequired: permissions.regularScheduleImport,
    exact: true,
  },
  {
    path: '/regular-schedule/:id/edit',
    loader: () =>
      import('src/view/regularSchedule/form/RegularScheduleFormPage'),
    permissionRequired: permissions.regularScheduleEdit,
    exact: true,
  },
  {
    path: '/regular-schedule/:id',
    loader: () =>
      import('src/view/regularSchedule/view/RegularScheduleViewPage'),
    permissionRequired: permissions.regularScheduleRead,
    exact: true,
  },

  {
    path: '/special-schedule',
    loader: () =>
      import('src/view/specialSchedule/list/SpecialScheduleListPage'),
    permissionRequired: permissions.specialScheduleRead,
    exact: true,
  },
  {
    path: '/special-schedule/new',
    loader: () =>
      import('src/view/specialSchedule/form/SpecialScheduleFormPage'),
    permissionRequired: permissions.specialScheduleCreate,
    exact: true,
  },
  {
    path: '/special-schedule/importer',
    loader: () =>
      import(
        'src/view/specialSchedule/importer/SpecialScheduleImporterPage'
      ),
    permissionRequired: permissions.specialScheduleImport,
    exact: true,
  },
  {
    path: '/special-schedule/:id/edit',
    loader: () =>
      import('src/view/specialSchedule/form/SpecialScheduleFormPage'),
    permissionRequired: permissions.specialScheduleEdit,
    exact: true,
  },
  {
    path: '/special-schedule/:id',
    loader: () =>
      import('src/view/specialSchedule/view/SpecialScheduleViewPage'),
    permissionRequired: permissions.specialScheduleRead,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};
